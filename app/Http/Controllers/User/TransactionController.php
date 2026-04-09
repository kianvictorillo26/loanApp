<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        $transactions = Transaction::where('user_id', $user->id)
            ->orderBy('transaction_date', 'desc')
            ->get()
            ->map(function ($transaction) {
                return [
                    'id' => $transaction->id,
                    'reference_number' => $transaction->reference_number,
                    'type' => $transaction->type,
                    'amount' => $transaction->amount,
                    'balance_after' => $transaction->balance_after,
                    'status' => $transaction->status,
                    'notes' => $transaction->notes,
                    'transaction_date' => $transaction->transaction_date,
                ];
            });

        return Inertia::render('User/Transactions/Index', [
            'transactions' => $transactions,
        ]);
    }
}
