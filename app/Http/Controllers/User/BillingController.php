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
        $activeLoan = Loan::where('user_id', $user->id)
            ->where('status', 'approved')
            ->whereNotNull('disbursement_date')
            ->whereNotNull('due_date')
            ->orderBy('disbursement_date', 'desc')
            ->first();

        $currentBilling = null;
        $billingHistory = [];

        if ($activeLoan) {
            // Generate billing information
            $currentBilling = [
                'id' => $activeLoan->id,
                'billing_date' => $activeLoan->disbursement_date,
                'due_date' => $activeLoan->due_date,
                'loan_amount' => $activeLoan->amount,
                'amount_received' => $activeLoan->amount - ($activeLoan->amount * 0.03),
                'base_amount' => $activeLoan->monthly_payment,
                'interest_amount' => $activeLoan->amount * (0.03 / 12),
                'penalty_amount' => 0, // Would be determined by payment history
                'total_amount' => $activeLoan->monthly_payment,
                'status' => $this->determineBillingStatus($activeLoan),
            ];

            // Get all billing history from approved loans
            $approvedLoans = Loan::where('user_id', $user->id)
                ->where('status', 'approved')
                ->orderBy('disbursement_date', 'desc')
                ->get();

            foreach ($approvedLoans as $loan) {
                if (! $loan->disbursement_date || ! $loan->due_date) {
                    continue;
                }

                for ($i = 0; $i < $loan->term_months; $i++) {
                    $billingHistory[] = [
                        'id' => $loan->id . '_' . $i,
                        'billing_date' => $loan->disbursement_date->copy()->addMonths($i),
                        'due_date' => $loan->due_date->copy()->addMonths($i),
                        'loan_amount' => $loan->amount,
                        'amount_received' => $loan->amount - ($loan->amount * 0.03),
                        'base_amount' => $loan->monthly_payment,
                        'interest_amount' => $loan->amount * (0.03 / 12),
                        'penalty_amount' => 0,
                        'total_amount' => $loan->monthly_payment,
                        'status' => 'pending',
                    ];
                }
            }
        }

        return Inertia::render('User/Billing/Index', [
            'currentBilling' => $currentBilling,
            'billingHistory' => $billingHistory,
            'loanInfo' => $activeLoan,
        ]);
    }

    public function show($id)
    {
        $user = Auth::user();
        
        $loan = Loan::where('user_id', $user->id)->findOrFail($id);

        // Build billing statement
        $billing = [
            'id' => $loan->id,
            'billing_date' => $loan->disbursement_date,
            'due_date' => $loan->due_date,
            'loan_amount' => $loan->amount,
            'amount_received' => $loan->amount - ($loan->amount * 0.03),
            'base_amount' => $loan->monthly_payment,
            'interest_amount' => $loan->amount * (0.03 / 12),
            'penalty_amount' => 0,
            'total_amount' => $loan->monthly_payment,
            'status' => $this->determineBillingStatus($loan),
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
