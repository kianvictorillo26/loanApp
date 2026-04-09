<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Loan;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoanController extends Controller
{
    // Constants
    const MIN_LOAN = 5000;
    const MAX_LOAN_PER_APP = 10000;
    const MAX_TOTAL_LOAN = 50000;
    const INTEREST_RATE = 3;
    const DEFAULT_LOAN_INCREMENT = 5000;

    public function index()
    {
        $user = Auth::user();
        
        $loans = Loan::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();
        
        $currentTotalLoan = $loans->where('status', 'approved')->sum('amount');
        $maxLoanAmount = self::MAX_TOTAL_LOAN;
        
        return Inertia::render('User/Loans/Index', [
            'loans' => $loans,
            'maxLoanAmount' => $maxLoanAmount,
            'currentTotalLoan' => $currentTotalLoan,
        ]);
    }

    public function create()
    {
        return Inertia::render('User/Loans/Create');
    }

    public function store()
    {
        $user = Auth::user();
        
        $validated = request()->validate([
            'amount' => 'required|numeric|min:' . self::MIN_LOAN . '|max:' . self::MAX_LOAN_PER_APP . '|multiple_of:1000',
            'term' => 'required|in:1,3,6,12',
            'purpose' => 'nullable|string|max:1000',
        ]);

        // Check if user has reached maximum loan amount
        $currentLoanAmount = Loan::where('user_id', $user->id)
            ->where('status', 'approved')
            ->sum('amount');
        
        if ($currentLoanAmount + $validated['amount'] > self::MAX_TOTAL_LOAN) {
            return back()->with('error', 'Loan exceeds maximum allowed amount');
        }

        // Check if user already has pending loan
        $pendingLoan = Loan::where('user_id', $user->id)
            ->where('status', 'pending')
            ->first();
        
        if ($pendingLoan) {
            return back()->with('error', 'Please wait for your pending loan to be approved');
        }

        // Calculate loan details
        $amount = $validated['amount'];
        $term = $validated['term'];
        $interest = $amount * (self::INTEREST_RATE / 100);
        $totalAmount = $amount + $interest;
        $monthlyPayment = $amount / $term;
        
        // Create loan
        $loan = Loan::create([
            'user_id' => $user->id,
            'amount' => $amount,
            'loan_type' => 'personal',
            'interest_rate' => self::INTEREST_RATE,
            'total_amount' => $totalAmount,
            'term' => $term,
            'term_months' => $term,
            'monthly_payment' => $monthlyPayment,
            'status' => 'pending',
            'remaining_balance' => $amount,
            'amount_paid' => 0,
            'purpose' => $validated['purpose'] ?? null,
        ]);

        // Create transaction record
        Transaction::create([
            'user_id' => $user->id,
            'loan_id' => $loan->id,
            'type' => 'loan_application',
            'amount' => $amount,
            'status' => 'pending',
            'reference_number' => 'TXN' . date('Ymd') . str_pad($loan->id, 6, '0', STR_PAD_LEFT),
            'transaction_date' => now(),
        ]);

        return redirect()->route('user.loans.index')->with('success', 'Loan application submitted successfully');
    }

    public function show(Loan $loan)
    {
        // Authorization
        if ($loan->user_id !== Auth::id()) {
            abort(403);
        }

        $loanTransactions = Transaction::where('loan_id', $loan->id)
            ->orderBy('transaction_date', 'desc')
            ->get();

        return Inertia::render('User/Loans/Show', [
            'loan' => $loan,
            'loanTransactions' => $loanTransactions,
        ]);
    }
}
