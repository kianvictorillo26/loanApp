<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserDashboardController;
use App\Http\Controllers\User\LoanController;
use App\Http\Controllers\User\SavingsController;
use App\Http\Controllers\User\BillingController;
use App\Http\Controllers\User\TransactionController;
use App\Http\Middleware\EnsureUserIsAdmin;
use App\Http\Middleware\EnsureUserIsNotAdmin;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [UserDashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', EnsureUserIsAdmin::class])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])
        ->name('dashboard');

    // User Management
    Route::get('/users', [AdminDashboardController::class, 'users'])
        ->name('users.index');
    Route::get('/users/{user}', [AdminDashboardController::class, 'showUser'])
        ->name('users.show');
    Route::put('/users/{user}', [AdminDashboardController::class, 'updateUser'])
        ->name('users.update');
    Route::post('/users/{user}/block-email', [AdminDashboardController::class, 'blockEmail'])
        ->name('users.block-email');

    // Registration Approval
    Route::post('/users/{user}/approve', [AdminDashboardController::class, 'approve'])
        ->name('users.approve');
    Route::post('/users/{user}/reject', [AdminDashboardController::class, 'reject'])
        ->name('users.reject');

    // Loan Management
    Route::get('/loans', [AdminDashboardController::class, 'loans'])
        ->name('loans.index');
    Route::post('/loans/{loan}/approve', [AdminDashboardController::class, 'approveLoan'])
        ->name('loans.approve');
    Route::post('/loans/{loan}/reject', [AdminDashboardController::class, 'rejectLoan'])
        ->name('loans.reject');

    // Savings Management
    Route::get('/savings', [AdminDashboardController::class, 'savings'])
        ->name('savings.index');
    Route::get('/savings/{savings}', [AdminDashboardController::class, 'showSavings'])
        ->name('savings.show');
    Route::get('/withdrawals', [AdminDashboardController::class, 'withdrawals'])
        ->name('withdrawals.index');
    Route::post('/withdrawals/{transaction}/approve', [AdminDashboardController::class, 'approveWithdrawal'])
        ->name('withdrawals.approve');
    Route::post('/withdrawals/{transaction}/reject', [AdminDashboardController::class, 'rejectWithdrawal'])
        ->name('withdrawals.reject');
    Route::post('/savings/{savings}/deposit', [AdminDashboardController::class, 'deposit'])
        ->name('savings.deposit');

    Route::post('/distribute-premium-income', [AdminDashboardController::class, 'distributePremiumIncome'])
        ->name('distribute-premium-income');

    // Reports
    Route::get('/reports', [AdminDashboardController::class, 'reports'])
        ->name('reports.index');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware(EnsureUserIsNotAdmin::class)->group(function () {
        // User Loans Routes
        Route::prefix('user/loans')->name('user.loans.')->group(function () {
            Route::get('/', [LoanController::class, 'index'])->name('index');
            Route::get('/create', [LoanController::class, 'create'])->name('create');
            Route::post('/', [LoanController::class, 'store'])->name('store');
            Route::get('/{loan}', [LoanController::class, 'show'])->name('show');
        });

        // User Savings Routes
        Route::prefix('user/savings')->name('user.savings.')->group(function () {
            Route::get('/', [SavingsController::class, 'index'])->name('index');
            Route::get('/deposit', [SavingsController::class, 'deposit'])->name('deposit');
            Route::post('/deposit', [SavingsController::class, 'storeDeposit'])->name('store-deposit');
            Route::get('/withdraw', [SavingsController::class, 'withdraw'])->name('withdraw');
            Route::post('/withdraw', [SavingsController::class, 'storeWithdraw'])->name('store-withdraw');
        });

        // User Billing Routes
        Route::prefix('user/billing')->name('user.billing.')->group(function () {
            Route::get('/', [BillingController::class, 'index'])->name('index');
            Route::get('/{id}', [BillingController::class, 'show'])->name('show');
        });

        // User Transactions Routes
        Route::prefix('user/transactions')->name('user.transactions.')->group(function () {
            Route::get('/', [TransactionController::class, 'index'])->name('index');
        });
    });
});

require __DIR__.'/auth.php';
