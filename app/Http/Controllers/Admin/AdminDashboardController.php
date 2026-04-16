<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlockedEmail;
use App\Models\Loan;
use App\Models\Savings;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        $pendingUsers = User::where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->get();

        $pendingLoans = Loan::with('user')
            ->where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->get();

        $pendingWithdrawals = Transaction::with(['user', 'savings'])
            ->where('type', 'withdrawal')
            ->where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'pendingUsers' => $pendingUsers,
            'pendingLoans' => $pendingLoans,
            'pendingWithdrawals' => $pendingWithdrawals,
            'counts' => [
                'pending_users' => User::where('status', 'pending')->count(),
                'approved_users' => User::where('status', 'approved')->count(),
                'rejected_users' => User::where('status', 'rejected')->count(),
                'pending_loans' => Loan::where('status', 'pending')->count(),
                'approved_loans' => Loan::where('status', 'approved')->count(),
                'pending_withdrawals' => Transaction::where('type', 'withdrawal')->where('status', 'pending')->count(),
            ],
        ]);
    }

    // User Management
    public function users(): Response
    {
        $users = User::with(['savings:id,user_id,balance'])
            ->withCount('loans')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    public function showUser(User $user): Response
    {
        $user->load(['loans', 'savings', 'transactions']);

        return Inertia::render('Admin/Users/Show', [
            'user' => $user,
            'billing' => $this->getUserCurrentBilling($user),
        ]);
    }

    public function blockEmail(Request $request, User $user): RedirectResponse
    {
        BlockedEmail::firstOrCreate([
            'email' => strtolower($user->email),
        ], [
            'reason' => $request->input('reason', 'Blocked by admin'),
            'blocked_by' => Auth::id(),
        ]);

        return back()->with('success', 'Email address has been blocked successfully.');
    }

    public function updateUser(Request $request, User $user): RedirectResponse
    {
        $request->validate([
            'account_type' => 'sometimes|required|in:Basic,Premium',
            'status' => 'sometimes|required|in:pending,approved,rejected',
        ]);

        $user->update($request->only(['account_type', 'status']));

        return back()->with('success', 'User updated successfully.');
    }

    // Registration Approval
    public function approve(User $user): RedirectResponse
    {
        $user->update(['status' => 'approved']);

        // Create savings account for approved user
        if (!$user->savings) {
            $savings = Savings::create([
                'user_id' => $user->id,
                'account_number' => 'SAV' . str_pad($user->id, 8, '0', STR_PAD_LEFT),
                'balance' => 0,
                'status' => 'active',
            ]);
        }

        return back()->with('success', 'Registration approved successfully.');
    }

    public function reject(Request $request, User $user): RedirectResponse
    {
        $request->validate([
            'reason' => 'required|string|max:500',
        ]);

        $user->update([
            'status' => 'rejected',
            'rejection_reason' => $request->reason,
        ]);

        // Delete uploaded files for rejected users
        if ($user->proof_of_billing) Storage::disk('public')->delete($user->proof_of_billing);
        if ($user->valid_id) Storage::disk('public')->delete($user->valid_id);
        if ($user->coe) Storage::disk('public')->delete($user->coe);

        return back()->with('success', 'Registration rejected and user data cleaned up.');
    }

    // Loan Management
    public function loans(): Response
    {
        $loans = Loan::with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return Inertia::render('Admin/Loans/Index', [
            'loans' => $loans,
        ]);
    }

    public function approveLoan(Request $request, Loan $loan): RedirectResponse
    {
        $request->validate([
            'interest_rate' => ['required','numeric','min:0','max:50'],
            'term_months' => ['required','integer','min:1','max:32', function ($attribute, $value, $fail) {
                if ($value !== 1 && $value % 3 !== 0) {
                    $fail('The loan term must be 1 month or increments of 3 months.');
                }
            }],
        ]);

        $loan->interest_rate = $request->interest_rate;
        $loan->term_months = $request->term_months;
        $loan->total_amount = $loan->calculateTotalAmount();
        $loan->monthly_payment = $loan->calculateMonthlyPayment();
        $loan->remaining_balance = $loan->total_amount;
        $loan->approved_at = now();
        $loan->disbursement_date = now();
        $loan->due_date = now()->copy()->addDays(28);
        $loan->status = 'approved';
        $loan->save();

        $applicationTransaction = Transaction::where('loan_id', $loan->id)
            ->where('type', 'loan_application')
            ->first();

        if ($applicationTransaction) {
            $applicationTransaction->update([
                'status' => 'approved',
                'notes' => 'Loan application approved by admin.',
            ]);
        }

        Transaction::create([
            'user_id' => $loan->user_id,
            'loan_id' => $loan->id,
            'type' => 'loan_disbursement',
            'amount' => $loan->amount,
            'status' => 'completed',
            'notes' => 'Loan approved and disbursed.',
            'transaction_date' => now(),
        ]);

        return back()->with('success', 'Loan approved and disbursed successfully.');
    }

    public function rejectLoan(Request $request, Loan $loan): RedirectResponse
    {
        $request->validate([
            'reason' => 'required|string|max:500',
        ]);

        $loan->update([
            'status' => 'rejected',
            'rejection_reason' => $request->reason,
            'rejected_at' => now(),
        ]);

        $applicationTransaction = Transaction::where('loan_id', $loan->id)
            ->where('type', 'loan_application')
            ->first();

        if ($applicationTransaction) {
            $applicationTransaction->update([
                'status' => 'rejected',
                'notes' => 'Loan application rejected: ' . $request->reason,
            ]);
        }

        return back()->with('success', 'Loan rejected successfully.');
    }

    // Savings Management
    public function savings(): Response
    {
        $savings = Savings::with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        $pendingWithdrawals = Transaction::with(['user', 'savings'])
            ->where('type', 'withdrawal')
            ->where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->get();

        $transactions = Transaction::with(['user', 'savings'])
            ->whereNotNull('savings_id')
            ->orderBy('transaction_date', 'desc')
            ->paginate(20);

        return Inertia::render('Admin/Savings/Index', [
            'savings' => $savings,
            'pendingWithdrawals' => $pendingWithdrawals,
            'transactions' => $transactions,
        ]);
    }

    public function withdrawals(): Response
    {
        $pendingWithdrawals = Transaction::with(['user', 'savings'])
            ->where('type', 'withdrawal')
            ->where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Withdrawals/Index', [
            'pendingWithdrawals' => $pendingWithdrawals,
        ]);
    }

    public function approveWithdrawal(Transaction $transaction): RedirectResponse
    {
        if ($transaction->type !== 'withdrawal' || $transaction->status !== 'pending') {
            return back()->with('error', 'Invalid transaction.');
        }

        $savings = $transaction->savings;
        if ($savings->balance < $transaction->amount) {
            $transaction->update([
                'status' => 'failed',
                'notes' => 'Failed due to insufficient savings balance.',
            ]);

            return back()->with('error', 'Insufficient balance. Transaction marked as failed.');
        }

        // Deduct from savings balance
        $savings->decrement('balance', $transaction->amount);

        // Update transaction
        $transaction->update([
            'status' => 'completed',
            'balance_after' => $savings->fresh()->balance,
        ]);

        return back()->with('success', 'Withdrawal approved successfully.');
    }

    public function rejectWithdrawal(Request $request, Transaction $transaction): RedirectResponse
    {
        $request->validate([
            'reason' => 'required|string|max:500',
        ]);

        $transaction->update([
            'status' => 'rejected',
            'notes' => $request->reason,
        ]);

        return back()->with('success', 'Withdrawal rejected successfully.');
    }

    private function getUserCurrentBilling(User $user)
    {
        $approvedLoans = $user->loans()
            ->where('status', 'approved')
            ->whereNotNull('disbursement_date')
            ->orderBy('disbursement_date', 'desc')
            ->get();

        $billingHistory = collect();

        foreach ($approvedLoans as $loan) {
            if (! $loan->disbursement_date || ! $loan->term_months) {
                continue;
            }

            $monthlyPrincipal = round($loan->amount / $loan->term_months, 2);
            $monthlyInterest = round(($loan->amount * ($loan->interest_rate / 100)) / $loan->term_months, 2);

            for ($i = 0; $i < $loan->term_months; $i++) {
                $billingDate = $loan->disbursement_date->copy()->addDays(28 * $i);
                $dueDate = $billingDate->copy()->addDays(28);
                $isOverdue = now()->greaterThan($dueDate);
                $penaltyAmount = $isOverdue ? round(($monthlyPrincipal + $monthlyInterest) * 0.02, 2) : 0;

                $billingHistory->push([
                    'id' => $loan->id . '_' . $i,
                    'loan_id' => $loan->id,
                    'billing_date' => $billingDate,
                    'due_date' => $dueDate,
                    'loan_amount' => $loan->amount,
                    'base_amount' => $monthlyPrincipal,
                    'interest_amount' => $monthlyInterest,
                    'penalty_amount' => $penaltyAmount,
                    'total_amount' => round($monthlyPrincipal + $monthlyInterest + $penaltyAmount, 2),
                    'status' => $isOverdue ? 'overdue' : 'pending',
                ]);
            }
        }

        return $billingHistory->sortByDesc('billing_date')->firstWhere('status', 'pending') ?? $billingHistory->sortByDesc('billing_date')->firstWhere('status', 'overdue');
    }

    public function distributePremiumIncome(): RedirectResponse
    {
        $currentYear = now()->year;

        $totalIncome = Transaction::where('type', 'loan_payment')
            ->where('status', 'completed')
            ->whereYear('transaction_date', $currentYear)
            ->sum('amount');

        if ($totalIncome <= 0) {
            return back()->with('error', 'No completed loan income found for the current year.');
        }

        $premiumUsers = User::where('account_type', 'Premium')
            ->where('status', 'approved')
            ->get();

        $premiumCount = $premiumUsers->count();

        if ($premiumCount === 0) {
            return back()->with('error', 'No approved Premium users available for distribution.');
        }

        if (Transaction::where('type', 'money_earned')->whereYear('transaction_date', $currentYear)->exists()) {
            return back()->with('error', 'Premium income has already been distributed for this year.');
        }

        $bonusCents = (int) round($totalIncome * 0.02 * 100);

        if ($bonusCents < $premiumCount) {
            return back()->with('error', 'Premium income pool is too small to distribute this year.');
        }

        $shareCents = intdiv($bonusCents, $premiumCount);
        $remainderCents = $bonusCents % $premiumCount;

        DB::transaction(function () use ($premiumUsers, $shareCents, $remainderCents) {
            foreach ($premiumUsers as $index => $user) {
                $userShareCents = $shareCents + ($index < $remainderCents ? 1 : 0);
                $shareAmount = $userShareCents / 100;

                $savings = Savings::firstOrCreate(
                    ['user_id' => $user->id],
                    [
                        'account_number' => 'SAV' . str_pad($user->id, 8, '0', STR_PAD_LEFT),
                        'balance' => 0,
                        'status' => 'active',
                    ]
                );

                $savings->increment('balance', $shareAmount);
                $savings->refresh();

                Transaction::create([
                    'user_id' => $user->id,
                    'savings_id' => $savings->id,
                    'type' => 'money_earned',
                    'amount' => $shareAmount,
                    'balance_after' => $savings->balance,
                    'status' => 'completed',
                    'notes' => 'Premium income share for ' . $savings->updated_at->format('Y'),
                    'reference_number' => 'BONUS' . now()->format('YmdHis') . str_pad($user->id, 4, '0', STR_PAD_LEFT),
                    'transaction_date' => now(),
                ]);
            }
        });

        return back()->with('success', 'Premium income distributed successfully to approved Premium users.');
    }

    public function deposit(Request $request, Savings $savings): RedirectResponse
    {
        $request->validate([
            'amount' => 'required|numeric|min:0.01',
            'notes' => 'nullable|string|max:500',
        ]);

        // Add to savings balance
        $savings->increment('balance', $request->amount);

        // Create transaction record
        Transaction::create([
            'user_id' => $savings->user_id,
            'savings_id' => $savings->id,
            'type' => 'deposit',
            'amount' => $request->amount,
            'balance_after' => $savings->fresh()->balance,
            'status' => 'completed',
            'notes' => $request->notes ?: 'Admin deposit',
            'transaction_date' => now(),
        ]);

        return back()->with('success', 'Deposit recorded successfully.');
    }

    // Reports
    public function reports(): Response
    {
        $totalEarnings = Transaction::where('type', 'loan_payment')
            ->where('status', 'completed')
            ->sum('amount');

        $monthlyEarnings = Transaction::where('type', 'loan_payment')
            ->where('status', 'completed')
            ->whereMonth('transaction_date', now()->month)
            ->whereYear('transaction_date', now()->year)
            ->sum('amount');

        $totalSavings = Savings::sum('balance');

        $recentTransactions = Transaction::with(['user', 'savings', 'loan'])
            ->orderBy('transaction_date', 'desc')
            ->limit(50)
            ->get();

        return Inertia::render('Admin/Reports/Index', [
            'stats' => [
                'total_earnings' => $totalEarnings,
                'monthly_earnings' => $monthlyEarnings,
                'total_savings' => $totalSavings,
                'active_users' => User::where('status', 'approved')->count(),
                'total_loans' => Loan::where('status', 'approved')->sum('total_amount'),
            ],
            'recentTransactions' => $recentTransactions,
        ]);
    }
}
