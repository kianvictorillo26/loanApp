<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Loan extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'amount',
        'loan_type',
        'interest_rate',
        'total_amount',
        'term',
        'term_months',
        'monthly_payment',
        'status',
        'disbursement_date',
        'due_date',
        'amount_paid',
        'remaining_balance',
        'purpose',
        'admin_notes',
        'rejection_reason',
        'approved_at',
        'rejected_at',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'interest_rate' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'monthly_payment' => 'decimal:2',
        'amount_paid' => 'decimal:2',
        'remaining_balance' => 'decimal:2',
        'disbursement_date' => 'date',
        'due_date' => 'date',
        'approved_at' => 'datetime',
        'rejected_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function calculateTotalAmount()
    {
        if ($this->interest_rate > 0 && $this->term_months) {
            $principal = $this->amount;
            $rate = $this->interest_rate / 100 / 12; // Monthly interest rate
            $time = $this->term_months;

            // Simple interest calculation
            $totalAmount = $principal * (1 + ($rate * $time));
            return round($totalAmount, 2);
        }

        return $this->amount;
    }

    public function calculateMonthlyPayment()
    {
        if ($this->total_amount && $this->term_months) {
            return round($this->total_amount / $this->term_months, 2);
        }

        return 0;
    }
}
