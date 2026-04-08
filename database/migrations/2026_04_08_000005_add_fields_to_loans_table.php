<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('loans', function (Blueprint $table) {
            $table->string('loan_type')->default('personal'); // personal, business, emergency
            $table->decimal('interest_rate', 5, 2)->default(0);
            $table->decimal('total_amount', 15, 2)->nullable(); // amount + interest
            $table->integer('term_months')->nullable();
            $table->decimal('monthly_payment', 15, 2)->nullable();
            $table->date('disbursement_date')->nullable();
            $table->date('due_date')->nullable();
            $table->decimal('amount_paid', 15, 2)->default(0);
            $table->decimal('remaining_balance', 15, 2)->nullable();
            $table->text('purpose')->nullable();
            $table->text('admin_notes')->nullable();
            $table->string('rejection_reason')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamp('rejected_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('loans', function (Blueprint $table) {
            $table->dropColumn([
                'loan_type', 'interest_rate', 'total_amount', 'term_months',
                'monthly_payment', 'disbursement_date', 'due_date', 'amount_paid',
                'remaining_balance', 'purpose', 'admin_notes', 'rejection_reason',
                'approved_at', 'rejected_at'
            ]);
        });
    }
};