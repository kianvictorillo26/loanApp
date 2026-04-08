<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'username',
        'account_type',
        'address',
        'gender',
        'birthday',
        'age',
        'email',
        'contact_number',
        'bank_name',
        'bank_account_number',
        'card_holder_name',
        'tin_number',
        'company_name',
        'company_address',
        'company_phone',
        'position',
        'monthly_earnings',
        'proof_of_billing',
        'valid_id',
        'coe',
        'status',
        'is_admin',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'is_admin' => 'boolean',
            'password' => 'hashed',
        ];
    }

    public function loans()
    {
        return $this->hasMany(Loan::class);
    }

    public function savings()
    {
        return $this->hasOne(Savings::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}