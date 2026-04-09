<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Savings;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SavingsController extends Controller
{
    // Constants
    const MAX_SAVINGS = 100000;
    const MIN_DEPOSIT = 100;
    const MAX_DEPOSIT = 1000;
    const MIN_WITHDRAWAL = 500;
    const MAX_WITHDRAWAL = 5000;
    const MAX_WITHDRAWALS_PER_DAY = 5;

    public function index()
    {
        $user = Auth::user();
        
        $savings = Savings::firstOrCreate(
            ['user_id' => $user->id],
            [
                'account_number' => 'SAV' . str_pad($user->id, 8, '0', STR_PAD_LEFT),
                'balance' => 0,
                'status' => 'active'
            ]
        );

        // Get recent transactions
        $savingsHistory = Transaction::where('user_id', $user->id)
            ->where('savings_id', $savings->id)
            ->whereIn('type', ['deposit', 'withdrawal'])
            ->orderBy('transaction_date', 'desc')
            ->limit(10)
            ->get();

        // Count remaining withdrawals for today
        $withdrawalsToday = Transaction::where('user_id', $user->id)
            ->where('savings_id', $savings->id)
            ->where('type', 'withdrawal')
            ->whereDate('transaction_date', today())
            ->count();

        $remainingWithdrawals = self::MAX_WITHDRAWALS_PER_DAY - $withdrawalsToday;

        return Inertia::render('User/Savings/Index', [
            'savings' => $savings,
            'savingsHistory' => $savingsHistory,
            'minTransaction' => self::MIN_DEPOSIT,
            'maxTransaction' => self::MAX_DEPOSIT,
            'maxBalance' => self::MAX_SAVINGS,
            'minWithdrawal' => self::MIN_WITHDRAWAL,
            'maxWithdrawal' => self::MAX_WITHDRAWAL,
            'maxWithdrawalsPerDay' => self::MAX_WITHDRAWALS_PER_DAY,
            'remainingWithdrawalsToday' => $remainingWithdrawals,
        ]);
    }

    public function deposit()
    {
        $user = Auth::user();
        
        $savings = Savings::where('user_id', $user->id)->first();
        $currentBalance = $savings?->balance ?? 0;

        return Inertia::render('User/Savings/Deposit', [
            'currentBalance' => $currentBalance,
            'minTransaction' => self::MIN_DEPOSIT,
            'maxTransaction' => self::MAX_DEPOSIT,
            'maxBalance' => self::MAX_SAVINGS,
        ]);
    }

    public function storeDeposit()
    {
        $user = Auth::user();
        
        $validated = request()->validate([
            'amount' => 'required|numeric|min:' . self::MIN_DEPOSIT . '|max:' . self::MAX_DEPOSIT,
        ]);

        $savings = Savings::where('user_id', $user->id)->first();
        
        // Check if deposit would exceed maximum
        if (($savings->balance + $validated['amount']) > self::MAX_SAVINGS) {
            return back()->with('error', 'Deposit would exceed maximum savings limit');
        }

        // Update savings balance
        $savings->increment('balance', $validated['amount']);

        // Create transaction
        Transaction::create([
            'user_id' => $user->id,
            'savings_id' => $savings->id,
            'type' => 'deposit',
            'amount' => $validated['amount'],
            'balance_after' => $savings->balance,
            'status' => 'completed',
            'reference_number' => 'TXN' . date('Ymd') . str_pad(Transaction::where('user_id', $user->id)->count() + 1, 6, '0', STR_PAD_LEFT),
            'transaction_date' => now(),
        ]);

        return redirect()->route('user.savings.index')->with('success', 'Deposit completed successfully');
    }

    public function withdraw()
    {
        $user = Auth::user();
        
        $savings = Savings::where('user_id', $user->id)->first();
        $currentBalance = $savings?->balance ?? 0;

        // Count withdrawals today
        $withdrawalsToday = Transaction::where('user_id', $user->id)
            ->where('type', 'withdrawal')
            ->whereDate('transaction_date', today())
            ->count();

        $remainingWithdrawals = self::MAX_WITHDRAWALS_PER_DAY - $withdrawalsToday;

        return Inertia::render('User/Savings/Withdraw', [
            'savingsBalance' => $currentBalance,
            'currentBalance' => $currentBalance,
            'minWithdrawal' => self::MIN_WITHDRAWAL,
            'maxWithdrawal' => self::MAX_WITHDRAWAL,
            'maxWithdrawalsPerDay' => self::MAX_WITHDRAWALS_PER_DAY,
            'remainingWithdrawalsToday' => $remainingWithdrawals,
        ]);
    }

    public function storeWithdraw()
    {
        $user = Auth::user();
        
        $validated = request()->validate([
            'amount' => 'required|numeric|min:' . self::MIN_WITHDRAWAL . '|max:' . self::MAX_WITHDRAWAL,
        ]);

        $savings = Savings::where('user_id', $user->id)->first();
        
        // Check balance
        if ($validated['amount'] > $savings->balance) {
            return back()->with('error', 'Insufficient balance');
        }

        // Check withdrawal limit for today
        $withdrawalsToday = Transaction::where('user_id', $user->id)
            ->where('type', 'withdrawal')
            ->whereDate('transaction_date', today())
            ->count();

        if ($withdrawalsToday >= self::MAX_WITHDRAWALS_PER_DAY) {
            return back()->with('error', 'Maximum withdrawal requests reached for today');
        }

        // Create withdrawal request (pending approval)
        $transaction = Transaction::create([
            'user_id' => $user->id,
            'savings_id' => $savings->id,
            'type' => 'withdrawal',
            'amount' => $validated['amount'],
            'balance_after' => $savings->balance - $validated['amount'],
            'status' => 'pending',
            'reference_number' => 'TXN' . date('Ymd') . str_pad($savings->id, 6, '0', STR_PAD_LEFT),
            'transaction_date' => now(),
        ]);

        return redirect()->route('user.savings.index')->with('success', 'Withdrawal request submitted. Awaiting admin approval.');
    }
}
