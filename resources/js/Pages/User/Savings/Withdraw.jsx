import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function WithdrawRequest({ savingsBalance, currentBalance, minWithdrawal, maxWithdrawal, maxWithdrawalsPerDay, remainingWithdrawalsToday }) {
    const { data, setData, post, processing, errors } = useForm({
        amount: '',
    });

    const formatCurrency = (value) =>
        value !== null && value !== undefined ? Number(value).toLocaleString('en-US', { style: 'currency', currency: 'PHP' }) : '₱0.00';

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('user.savings.store-withdraw'));
    };

    const isValidAmount = data.amount && 
        parseFloat(data.amount) >= minWithdrawal && 
        parseFloat(data.amount) <= maxWithdrawal &&
        parseFloat(data.amount) <= currentBalance;

    const canWithdraw = remainingWithdrawalsToday > 0 && currentBalance > 0;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-600 text-lg font-bold text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold leading-tight text-slate-900">
                        Request Withdrawal
                    </h2>
                </div>
            }
        >
            <Head title="Request Withdrawal" />

            <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                {/* Current Balance and Limits */}
                <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg shadow-slate-200/50">
                    <div className="grid gap-6 sm:grid-cols-2 mb-6">
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase">Current Balance</p>
                            <p className="mt-2 text-3xl font-bold text-purple-600">
                                {formatCurrency(currentBalance)}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase">Remaining Withdrawals</p>
                            <p className="mt-2 text-3xl font-bold text-slate-900">
                                {remainingWithdrawalsToday}/{maxWithdrawalsPerDay}
                            </p>
                        </div>
                    </div>

                    {!canWithdraw && (
                        <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                            <p className="text-sm font-semibold text-red-700">
                                {remainingWithdrawalsToday === 0 
                                    ? '❌ You have reached the maximum withdrawals for today' 
                                    : '❌ Insufficient balance for withdrawal'}
                            </p>
                        </div>
                    )}
                </div>

                {canWithdraw ? (
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Amount Input */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    Withdrawal Amount
                                </label>
                                <input
                                    type="number"
                                    value={data.amount}
                                    onChange={(e) => setData('amount', e.target.value)}
                                    min={minWithdrawal}
                                    max={Math.min(maxWithdrawal, currentBalance)}
                                    step="100"
                                    placeholder={`Enter amount between ${formatCurrency(minWithdrawal)} - ${formatCurrency(maxWithdrawal)}`}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                                />
                                {errors.amount && (
                                    <p className="mt-2 text-xs text-red-600">{errors.amount}</p>
                                )}
                                <p className="mt-2 text-xs text-slate-500">
                                    • Minimum per transaction: {formatCurrency(minWithdrawal)}
                                    <br />
                                    • Maximum per transaction: {formatCurrency(maxWithdrawal)}
                                    <br />
                                    • Max allowed from balance: {formatCurrency(Math.min(maxWithdrawal, currentBalance))}
                                </p>
                            </div>

                            {/* Request Summary */}
                            {data.amount && isValidAmount && (
                                <div className="rounded-2xl bg-purple-50 p-6 border border-purple-200">
                                    <h3 className="text-sm font-semibold text-purple-900 mb-4">Withdrawal Request Summary</h3>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <p className="text-xs font-semibold text-purple-600">Current Balance</p>
                                            <p className="mt-1 text-lg font-bold text-slate-900">
                                                {formatCurrency(currentBalance)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-purple-600">Withdrawal Amount</p>
                                            <p className="mt-1 text-lg font-bold text-red-600">
                                                -{formatCurrency(data.amount)}
                                            </p>
                                        </div>
                                        <div className="sm:col-span-2 border-t border-purple-200 pt-4">
                                            <p className="text-xs font-semibold text-purple-600">Balance After (if approved)</p>
                                            <p className="mt-1 text-xl font-bold text-purple-600">
                                                {formatCurrency(currentBalance - parseFloat(data.amount || 0))}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Info Box */}
                            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
                                <h3 className="text-sm font-semibold text-blue-900 mb-3">ℹ️ Withdrawal Process</h3>
                                <ul className="space-y-2 text-xs text-blue-800">
                                    <li>• Withdrawal requests must be approved by admin</li>
                                    <li>• Maximum 5 withdrawal requests per day</li>
                                    <li>• Minimum withdrawal: {formatCurrency(minWithdrawal)}</li>
                                    <li>• Maximum withdrawal: {formatCurrency(maxWithdrawal)} per request</li>
                                    <li>• Request status: Pending → Approved/Rejected → Completed/Failed</li>
                                </ul>
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    disabled={processing || !isValidAmount}
                                    className="flex-1 rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Submitting...' : 'Submit Withdrawal Request'}
                                </button>
                                <a
                                    href={route('user.savings.index')}
                                    className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    Cancel
                                </a>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg shadow-slate-200/50">
                        <svg className="mx-auto h-16 w-16 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.172l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <p className="text-slate-600 text-lg font-semibold mb-2">No Withdrawals Available</p>
                        <p className="text-slate-500 mb-6">
                            {remainingWithdrawalsToday === 0 
                                ? 'You have reached the maximum withdrawals for today. Try again tomorrow.' 
                                : 'Your savings balance is insufficient for withdrawal.'}
                        </p>
                        <a
                            href={route('user.savings.index')}
                            className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            Back to Savings
                        </a>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
