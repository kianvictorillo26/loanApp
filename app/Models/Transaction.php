<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'savings_id',
        'loan_id',
        'type',
        'amount',
        'balance_after',
        'status',
        'notes',
        'reference_number',
        'transaction_date',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'balance_after' => 'decimal:2',
        'transaction_date' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function savings()
    {
        return $this->belongsTo(Savings::class);
    }

    public function loan()
    {
        return $this->belongsTo(Loan::class);
    }

    public function generateReferenceNumber()
    {
        return 'TXN' . date('Ymd') . str_pad($this->id, 6, '0', STR_PAD_LEFT);
    }
}