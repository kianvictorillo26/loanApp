<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use App\Models\Savings;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserDashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $this->checkPremiumSavingsDowngrade($user);

        // Redirect admin to admin dashboard
        if ($user->is_admin) {
            return redirect()->route('admin.dashboard');
        }
        
        // Get loan information
        $activeLoans = Loan::where('user_id', $user->id)
            ->whereIn('status', ['approved', 'pending'])
            ->get();
        
        $currentLoanAmount = $activeLoans->sum('amount');
        $loanBalance = $activeLoans->sum('remaining_balance');
        
        // Get savings information only for Premium users
        $savingsBalance = 0;
        if ($user->account_type === 'Premium') {
            $savings = Savings::firstOrCreate(
                ['user_id' => $user->id],
                ['account_number' => 'SAV' . str_pad($user->id, 8, '0', STR_PAD_LEFT), 'balance' => 0]
            );
            $savingsBalance = $savings->balance ?? 0;
        }
        
        // Get money earned
        $moneyEarned = Transaction::where('user_id', $user->id)
            ->where('type', 'money_earned')
            ->where('status', 'completed')
            ->sum('amount');
        
        // Get pending withdrawals
        $pendingWithdrawals = Transaction::where('user_id', $user->id)
            ->where('type', 'withdrawal')
            ->where('status', 'pending')
            ->count();
        
        // Get recent transactions (last 5)
        $recentTransactions = Transaction::where('user_id', $user->id)
            ->orderBy('transaction_date', 'desc')
            ->limit(5)
            ->get();
        
        $stats = [
            'current_loan_amount' => $currentLoanAmount,
            'loan_balance' => $loanBalance,
            'savings_balance' => $savingsBalance,
            'money_earned' => $moneyEarned,
            'pending_withdrawals' => $pendingWithdrawals,
        ];
        
        return Inertia::render('Dashboard', [
            'userStats' => $stats,
            'recentTransactions' => $recentTransactions,
        ]);
    }
}
