<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Loan;
use App\Models\Savings;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
        $users = User::with(['loans', 'savings', 'transactions'])
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    public function updateUser(Request $request, User $user): RedirectResponse
    {
        $request->validate([
            'account_type' => 'required|in:Basic,Premium',
            'status' => 'required|in:pending,approved,rejected',
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
            'interest_rate' => 'required|numeric|min:0|max:50',
            'term_months' => 'required|integer|min:1|max:360',
        ]);

        $totalAmount = $loan->calculateTotalAmount();
        $monthlyPayment = $loan->calculateMonthlyPayment();

        $loan->update([
            'status' => 'approved',
            'interest_rate' => $request->interest_rate,
            'term_months' => $request->term_months,
            'total_amount' => $totalAmount,
            'monthly_payment' => $monthlyPayment,
            'remaining_balance' => $totalAmount,
            'approved_at' => now(),
        ]);

        // Create transaction record for loan disbursement
        Transaction::create([
            'user_id' => $loan->user_id,
            'loan_id' => $loan->id,
            'type' => 'loan_disbursement',
            'amount' => $loan->amount,
            'status' => 'completed',
            'notes' => 'Loan approved and disbursed',
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

        return Inertia::render('Admin/Savings/Index', [
            'savings' => $savings,
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
            return back()->with('error', 'Insufficient balance.');
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
            'status' => 'cancelled',
            'notes' => $request->reason,
        ]);

        return back()->with('success', 'Withdrawal rejected successfully.');
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
