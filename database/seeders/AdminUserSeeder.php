<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::updateOrCreate([
            'email' => env('ADMIN_EMAIL', 'admin@loanapp.local'),
        ], [
            'name' => 'LoanApp Admin',
            'username' => env('ADMIN_USERNAME', 'admin123'),
            'account_type' => 'Basic',
            'address' => 'Admin Office',
            'gender' => 'Other',
            'birthday' => now()->subYears(30)->toDateString(),
            'age' => 30,
            'contact_number' => '+639000000000',
            'bank_name' => 'Admin Bank',
            'bank_account_number' => '0000000000',
            'card_holder_name' => 'LoanApp Admin',
            'tin_number' => '000000000',
            'company_name' => 'LoanApp',
            'company_address' => 'LoanApp Admin Office',
            'company_phone' => '+639000000000',
            'position' => 'Administrator',
            'monthly_earnings' => 0,
            'proof_of_billing' => '',
            'valid_id' => '',
            'coe' => '',
            'status' => 'approved',
            'is_admin' => true,
            'password' => Hash::make(env('ADMIN_PASSWORD', 'Admin123!')),
            'email_verified_at' => now(),
        ]);
    }
}
