<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

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

    public static function generateReferenceNumber(string $prefix = 'TXN'): string
    {
        return strtoupper($prefix . '-' . Str::random(6) . '-' . now()->format('YmdHis'));
    }

    protected static function booted()
    {
        static::creating(function ($transaction) {
            if (empty($transaction->reference_number)) {
                $transaction->reference_number = self::generateReferenceNumber();
            }
        });
    }
}