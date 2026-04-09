import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function SavingsIndex({ savings, savingsHistory, minTransaction,  maxTransaction, maxBalance }) {
    const pageProps = usePage().props;
    const flash = pageProps.flash ?? {};
    
    const formatCurrency = (value) =>
        value !== null && value !== undefined ? Number(value).toLocaleString('en-US', { style: 'currency', currency: 'PHP' }) : '₱0.00';

    const savingsBalance = savings?.balance || 0;
    const percentageUsed = (savingsBalance / maxBalance) * 100;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-600 text-lg font-bold text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold leading-tight text-slate-900">
                        My Savings
                    </h2>
                </div>
            }
        >
            <Head title="My Savings" />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                {flash?.success && (
                    <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-800 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-sm font-bold">
                                ✓
                            </div>
                            {flash.success}
                        </div>
                    </div>
                )}

                {/* Savings Balance */}
                <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
                    <div className="grid gap-8 md:grid-cols-2">
                        <div>
                            <p className="text-sm font-semibold text-slate-500 mb-2">Current Savings Balance</p>
                            <p className="text-4xl font-bold text-purple-600 mb-4">
                                {formatCurrency(savingsBalance)}
                            </p>
                            <div className="space-y-2 text-sm text-slate-600">
                                <p>• Maximum: {formatCurrency(maxBalance)}</p>
                                <p>• Account: {savings?.account_number || 'N/A'}</p>
                                <p>• Status: <span className="font-semibold text-green-600">{savings?.status || 'Active'}</span></p>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-slate-500 mb-4">Savings Progress</p>
                            <div className="mb-4">
                                <div className="h-4 w-full rounded-full bg-slate-200 overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all"
                                        style={{ width: `${Math.min(percentageUsed, 100)}%` }}
                                    />
                                </div>
                                <p className="mt-2 text-xs text-slate-600">
                                    {parseFloat(percentageUsed).toFixed(1)}% of maximum used
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <Link
                                    href={route('user.savings.deposit')}
                                    className="flex-1 inline-flex items-center justify-center rounded-lg bg-purple-600 px-4 py-2 font-semibold text-white transition hover:bg-purple-700"
                                >
                                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Deposit
                                </Link>
                                <Link
                                    href={route('user.savings.withdraw')}
                                    className="flex-1 inline-flex items-center justify-center rounded-lg border border-purple-600 px-4 py-2 font-semibold text-purple-600 transition hover:bg-purple-50"
                                >
                                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                    </svg>
                                    Withdraw Request
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transaction Limits */}
                <div className="mb-10 rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">📋 Savings Guidelines</h3>
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                            <p className="text-xs font-semibold text-blue-600 mb-1">Per Transaction</p>
                            <p className="text-sm text-blue-800">Min: {formatCurrency(minTransaction)}</p>
                            <p className="text-sm text-blue-800">Max: {formatCurrency(maxTransaction)}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-blue-600 mb-1">Daily Withdrawal</p>
                            <p className="text-sm text-blue-800">Max: 5 withdrawals per day</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-blue-600 mb-1">Account Status</p>
                            <p className="text-sm text-blue-800">If balance = ₱0 for 3 months</p>
                            <p className="text-sm text-blue-800">Account downgrade to Basic</p>
                        </div>
                    </div>
                </div>

                {/* Savings History */}
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50">
                    <div className="border-b border-slate-200 px-6 py-4 sm:px-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-900">Transaction History</h3>
                            <Link
                                href={route('user.transactions.index')}
                                className="text-sm font-semibold text-purple-600 hover:text-purple-700"
                            >
                                View all
                            </Link>
                        </div>
                    </div>

                    {savingsHistory && savingsHistory.length > 0 ? (
                        <div className="divide-y divide-slate-100">
                            {savingsHistory.map((transaction) => (
                                <div key={transaction.id} className="flex items-center justify-between px-6 py-4 sm:px-8">
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                            transaction.type === 'deposit' 
                                                ? 'bg-green-100' 
                                                : 'bg-red-100'
                                        }`}>
                                            <svg className={`h-5 w-5 ${
                                                transaction.type === 'deposit'
                                                    ? 'text-green-600'
                                                    : 'text-red-600'
                                            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                {transaction.type === 'deposit' ? (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                ) : (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                )}
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900 capitalize">
                                                {transaction.type === 'deposit' ? 'Savings Deposit' : 'Savings Withdrawal'}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-xs text-slate-500">
                                                    {new Date(transaction.transaction_date).toLocaleDateString()}
                                                </p>
                                                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                                    transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                    transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {transaction.status?.charAt(0).toUpperCase() + transaction.status?.slice(1)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className={`text-sm font-semibold ${
                                        transaction.type === 'deposit'
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                    }`}>
                                        {transaction.type === 'deposit' ? '+' : '-'}
                                        {formatCurrency(transaction.amount)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="px-6 py-12 text-center sm:px-8">
                            <p className="text-slate-500">No savings transactions yet</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
