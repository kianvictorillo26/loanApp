import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function DepositSavings({ savingsBalance, currentBalance, minTransaction, maxTransaction, maxBalance }) {
    const { data, setData, post, processing, errors } = useForm({
        amount: '',
    });

    const [remainingCapacity, setRemainingCapacity] = useState(maxBalance - currentBalance);

    const formatCurrency = (value) =>
        value !== null && value !== undefined ? Number(value).toLocaleString('en-US', { style: 'currency', currency: 'PHP' }) : '₱0.00';

    const handleAmountChange = (value) => {
        setData('amount', value);
        if (value) {
            const remaining = maxBalance - currentBalance - parseFloat(value);
            setRemainingCapacity(Math.max(0, remaining));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('user.savings.store-deposit'));
    };

    const isValidAmount = data.amount && 
        parseFloat(data.amount) >= minTransaction && 
        parseFloat(data.amount) <= maxTransaction &&
        (currentBalance + parseFloat(data.amount)) <= maxBalance;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-600 text-lg font-bold text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold leading-tight text-slate-900">
                        Deposit to Savings
                    </h2>
                </div>
            }
        >
            <Head title="Deposit to Savings" />

            <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                {/* Current Balance */}
                <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg shadow-slate-200/50">
                    <div className="grid gap-6 sm:grid-cols-3">
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase">Current Balance</p>
                            <p className="mt-2 text-3xl font-bold text-purple-600">
                                {formatCurrency(currentBalance)}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase">Available Capacity</p>
                            <p className="mt-2 text-3xl font-bold text-emerald-600">
                                {formatCurrency(Math.max(0, maxBalance - currentBalance))}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase">Maximum Limit</p>
                            <p className="mt-2 text-3xl font-bold text-slate-900">
                                {formatCurrency(maxBalance)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Deposit Form */}
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Amount Input */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-900 mb-2">
                                Deposit Amount
                            </label>
                            <input
                                type="number"
                                value={data.amount}
                                onChange={(e) => handleAmountChange(e.target.value)}
                                min={minTransaction}
                                max={Math.min(maxTransaction, maxBalance - currentBalance)}
                                step="100"
                                placeholder={`Enter amount between ${formatCurrency(minTransaction)} - ${formatCurrency(maxTransaction)}`}
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                            />
                            {errors.amount && (
                                <p className="mt-2 text-xs text-red-600">{errors.amount}</p>
                            )}
                            <p className="mt-2 text-xs text-slate-500">
                                • Minimum per transaction: {formatCurrency(minTransaction)}
                                <br />
                                • Maximum per transaction: {formatCurrency(maxTransaction)}
                                <br />
                                • Max allowed for this deposit: {formatCurrency(Math.min(maxTransaction, maxBalance - currentBalance))}
                            </p>
                        </div>

                        {/* Calculation Preview */}
                        {data.amount && isValidAmount && (
                            <div className="rounded-2xl bg-purple-50 p-6 border border-purple-200">
                                <h3 className="text-sm font-semibold text-purple-900 mb-4">Deposit Summary</h3>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <p className="text-xs font-semibold text-purple-600">Current Balance</p>
                                        <p className="mt-1 text-lg font-bold text-slate-900">
                                            {formatCurrency(currentBalance)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-purple-600">Deposit Amount</p>
                                        <p className="mt-1 text-lg font-bold text-emerald-600">
                                            +{formatCurrency(data.amount)}
                                        </p>
                                    </div>
                                    <div className="sm:col-span-2 border-t border-purple-200 pt-4">
                                        <p className="text-xs font-semibold text-purple-600">New Balance</p>
                                        <p className="mt-1 text-xl font-bold text-purple-600">
                                            {formatCurrency(currentBalance + parseFloat(data.amount || 0))}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Info Box */}
                        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
                            <h3 className="text-sm font-semibold text-blue-900 mb-3">ℹ️ Savings Information</h3>
                            <ul className="space-y-2 text-xs text-blue-800">
                                <li>• Deposits are processed immediately</li>
                                <li>• Money earned (2% company income) is added automatically</li>
                                <li>• You can deposit multiple times daily</li>
                                <li>• All deposits are recorded in your transaction history</li>
                            </ul>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={processing || !isValidAmount}
                                className="flex-1 rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Processing...' : 'Confirm Deposit'}
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
            </div>
        </AuthenticatedLayout>
    );
}
