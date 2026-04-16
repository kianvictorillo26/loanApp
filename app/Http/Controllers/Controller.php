<?php

namespace App\Http\Controllers;

use App\Models\Savings;
use App\Models\Transaction;
use App\Models\User;

abstract class Controller
{
    protected function checkPremiumSavingsDowngrade(User $user): void
    {
        if ($user->account_type !== 'Premium') {
            return;
        }

        $thresholdDate = now()->subMonths(3);
        $savings = Savings::where('user_id', $user->id)->first();

        if (!$savings || $savings->balance != 0) {
            return;
        }

        $lastPositiveBalanceTransaction = Transaction::where('user_id', $user->id)
            ->where('savings_id', $savings->id)
            ->where('balance_after', '>', 0)
            ->orderBy('transaction_date', 'desc')
            ->first();

        if ($lastPositiveBalanceTransaction) {
            if ($lastPositiveBalanceTransaction->transaction_date->lessThanOrEqualTo($thresholdDate)) {
                $user->update(['account_type' => 'Basic']);
            }

            return;
        }

        if ($user->created_at->lessThanOrEqualTo($thresholdDate)) {
            $user->update(['account_type' => 'Basic']);
        }
    }
}
