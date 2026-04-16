<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Loan;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BillingController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        // Get current billing (most recent approved loan with disbursement info)
        $approvedLoans = Loan::where('user_id', $user->id)
            ->where('status', 'approved')
            ->whereNotNull('disbursement_date')
            ->orderBy('disbursement_date', 'desc')
            ->get();

        $currentBilling = null;
        $billingHistory = collect();

        foreach ($approvedLoans as $loan) {
            if (! $loan->disbursement_date || ! $loan->term_months) {
                continue;
            }

            $monthlyPrincipal = round($loan->amount / $loan->term_months, 2);
            $monthlyInterest = round(($loan->amount * ($loan->interest_rate / 100)) / $loan->term_months, 2);
            $amountReceived = round($loan->amount - ($loan->amount * ($loan->interest_rate / 100)), 2);

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
                    'amount_received' => $amountReceived,
                    'base_amount' => $monthlyPrincipal,
                    'interest_amount' => $monthlyInterest,
                    'penalty_amount' => $penaltyAmount,
                    'total_amount' => round($monthlyPrincipal + $monthlyInterest + $penaltyAmount, 2),
                    'status' => $isOverdue ? 'overdue' : 'pending',
                    'account_type' => $user->account_type,
                ]);
            }
        }

        $billingHistory = $billingHistory->sortByDesc('billing_date')->values()->all();
        $currentBilling = collect($billingHistory)->firstWhere('status', 'pending') ?? collect($billingHistory)->firstWhere('status', 'overdue');

        return Inertia::render('User/Billing/Index', [
            'currentBilling' => $currentBilling,
            'billingHistory' => $billingHistory,
            'loanInfo' => $approvedLoans->first(),
        ]);
    }

    public function show($id)
    {
        $user = Auth::user();

        $parts = explode('_', $id);
        if (count($parts) !== 2) {
            abort(404);
        }

        $loanId = $parts[0];
        $periodIndex = (int) $parts[1];

        $loan = Loan::where('user_id', $user->id)
            ->where('status', 'approved')
            ->whereNotNull('disbursement_date')
            ->findOrFail($loanId);

        if ($periodIndex < 0 || $periodIndex >= $loan->term_months) {
            abort(404);
        }

        $monthlyPrincipal = round($loan->amount / $loan->term_months, 2);
        $monthlyInterest = round(($loan->amount * ($loan->interest_rate / 100)) / $loan->term_months, 2);
        $amountReceived = round($loan->amount - ($loan->amount * ($loan->interest_rate / 100)), 2);

        $billingDate = $loan->disbursement_date->copy()->addDays(28 * $periodIndex);
        $dueDate = $billingDate->copy()->addDays(28);
        $isOverdue = now()->greaterThan($dueDate);
        $penaltyAmount = $isOverdue ? round(($monthlyPrincipal + $monthlyInterest) * 0.02, 2) : 0;

        $billing = [
            'id' => $loan->id . '_' . $periodIndex,
            'billing_date' => $billingDate,
            'due_date' => $dueDate,
            'loan_amount' => $loan->amount,
            'amount_received' => $amountReceived,
            'base_amount' => $monthlyPrincipal,
            'interest_amount' => $monthlyInterest,
            'penalty_amount' => $penaltyAmount,
            'total_amount' => round($monthlyPrincipal + $monthlyInterest + $penaltyAmount, 2),
            'status' => $isOverdue ? 'overdue' : 'pending',
            'account_type' => $user->account_type,
        ];

        return Inertia::render('User/Billing/Show', [
            'billing' => $billing,
        ]);
    }

    private function determineBillingStatus($loan)
    {
        $now = now();
        if ($loan->amount_paid >= $loan->amount) {
            return 'completed';
        } elseif ($now > $loan->due_date) {
            return 'overdue';
        }
        return 'pending';
    }
}
