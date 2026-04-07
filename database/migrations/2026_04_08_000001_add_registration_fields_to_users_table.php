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
        Schema::table('users', function (Blueprint $table) {
            $table->enum('account_type', ['Basic', 'Premium'])->after('username');
            $table->text('address')->after('account_type');
            $table->enum('gender', ['Male', 'Female', 'Other'])->nullable()->after('address');
            $table->date('birthday')->nullable()->after('gender');
            $table->integer('age')->nullable()->after('birthday');
            $table->string('contact_number')->after('age');
            $table->string('bank_name')->after('contact_number');
            $table->string('bank_account_number')->after('bank_name');
            $table->string('card_holder_name')->after('bank_account_number');
            $table->string('tin_number')->after('card_holder_name');
            $table->string('company_name')->after('tin_number');
            $table->text('company_address')->after('company_name');
            $table->string('company_phone')->after('company_address');
            $table->string('position')->after('company_phone');
            $table->decimal('monthly_earnings', 10, 2)->after('position');
            $table->string('proof_of_billing')->nullable()->after('monthly_earnings');
            $table->string('valid_id')->nullable()->after('proof_of_billing');
            $table->string('coe')->nullable()->after('valid_id');
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending')->after('coe');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'account_type', 'address', 'gender', 'birthday', 'age', 'contact_number',
                'bank_name', 'bank_account_number', 'card_holder_name', 'tin_number',
                'company_name', 'company_address', 'company_phone', 'position', 'monthly_earnings',
                'proof_of_billing', 'valid_id', 'coe', 'status'
            ]);
        });
    }
};