<?php

namespace Database\Seeders;

use App\Models\Loan;
use App\Models\Savings;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SampleDataSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database with sample data.
     */
    public function run(): void
    {
        // Create some approved users with savings accounts
        $users = User::factory(5)->create([
            'status' => 'approved',
        ]);

        foreach ($users as $user) {
            // Create savings account
            $savings = Savings::create([
                'user_id' => $user->id,
                'account_number' => 'SAV' . str_pad($user->id, 8, '0', STR_PAD_LEFT),
                'balance' => rand(1000, 50000),
                'status' => 'active',
            ]);

            // Create some transactions
            Transaction::create([
                'user_id' => $user->id,
                'savings_id' => $savings->id,
                'type' => 'deposit',
                'amount' => $savings->balance,
                'balance_after' => $savings->balance,
                'status' => 'completed',
                'notes' => 'Initial deposit',
                'transaction_date' => now()->subDays(rand(1, 30)),
            ]);

            // Create some loans
            if (rand(0, 1)) { // 50% chance
                $loanAmount = rand(5000, 50000);
                $loan = Loan::create([
                    'user_id' => $user->id,
                    'amount' => $loanAmount,
                    'loan_type' => ['personal', 'business'][rand(0, 1)],
                    'interest_rate' => rand(10, 25),
                    'total_amount' => $loanAmount * (1 + (rand(10, 25) / 100)),
                    'term' => rand(6, 24),
                    'term_months' => rand(6, 24),
                    'monthly_payment' => ($loanAmount * (1 + (rand(10, 25) / 100))) / rand(6, 24),
                    'status' => ['pending', 'approved'][rand(0, 1)],
                    'purpose' => ['Home improvement', 'Business expansion', 'Education', 'Medical expenses'][rand(0, 3)],
                    'disbursement_date' => rand(0, 1) ? now()->subDays(rand(1, 30)) : null,
                    'due_date' => now()->addMonths(rand(6, 24)),
                    'amount_paid' => rand(0, $loanAmount),
                    'remaining_balance' => rand(0, $loanAmount),
                ]);

                if ($loan->status === 'approved') {
                    $loan->update(['approved_at' => now()->subDays(rand(1, 30))]);

                    // Create loan disbursement transaction
                    Transaction::create([
                        'user_id' => $user->id,
                        'loan_id' => $loan->id,
                        'type' => 'loan_disbursement',
                        'amount' => $loan->amount,
                        'status' => 'completed',
                        'notes' => 'Loan approved and disbursed',
                        'transaction_date' => $loan->disbursement_date,
                    ]);
                }
            }
        }

        // Create some pending registrations
        User::factory(3)->create([
            'status' => 'pending',
        ]);

        // Create some pending loans
        $pendingUsers = User::where('status', 'approved')->get();
        foreach ($pendingUsers->take(2) as $user) {
            Loan::create([
                'user_id' => $user->id,
                'amount' => rand(10000, 30000),
                'loan_type' => 'personal',
                'term' => rand(12, 24),
                'status' => 'pending',
                'purpose' => 'Emergency funds',
            ]);
        }
    }
}