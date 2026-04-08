<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\EnsureUserIsAdmin;
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

Route::get('/dashboard', function () {
    if (auth()->check() && auth()->user()->is_admin) {
        return redirect()->route('admin.dashboard');
    }

    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', EnsureUserIsAdmin::class])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])
        ->name('dashboard');

    // User Management
    Route::get('/users', [AdminDashboardController::class, 'users'])
        ->name('users.index');
    Route::put('/users/{user}', [AdminDashboardController::class, 'updateUser'])
        ->name('users.update');

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
    Route::post('/withdrawals/{transaction}/approve', [AdminDashboardController::class, 'approveWithdrawal'])
        ->name('withdrawals.approve');
    Route::post('/withdrawals/{transaction}/reject', [AdminDashboardController::class, 'rejectWithdrawal'])
        ->name('withdrawals.reject');
    Route::post('/savings/{savings}/deposit', [AdminDashboardController::class, 'deposit'])
        ->name('savings.deposit');

    // Reports
    Route::get('/reports', [AdminDashboardController::class, 'reports'])
        ->name('reports.index');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
