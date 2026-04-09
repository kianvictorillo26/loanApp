import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard({ userStats, recentTransactions, currentBill, accounts }) {
    const pageProps = usePage().props;
    const auth = pageProps.auth ?? {};
    const user = auth.user ?? {};
    const flash = pageProps.flash ?? {};

    const formatCurrency = (value) =>
        value !== null && value !== undefined ? Number(value).toLocaleString('en-US', { style: 'currency', currency: 'PHP' }) : '₱0.00';

    // Determine account type display
    const accountTypeDisplay = {
        basic: { label: 'Basic', color: 'bg-blue-100', textColor: 'text-blue-800' },
        premium: { label: 'Premium', color: 'bg-purple-100', textColor: 'text-purple-800' },
    };

    // Determine status display
    const statusDisplay = {
        active: { label: 'Active', color: 'bg-green-100', textColor: 'text-green-800' },
        disabled: { label: 'Disabled', color: 'bg-red-100', textColor: 'text-red-800' },
    };

    const accountType = accountTypeDisplay[user.account_type?.toLowerCase()] || accountTypeDisplay.basic;
    const status = statusDisplay[user.status?.toLowerCase()] || statusDisplay.active;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-lg font-bold text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2m0-11a4 4 0 114 4 4 4 0 01-4-4z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold leading-tight text-slate-900">
                        User Dashboard
                    </h2>
                </div>
            }
        >
            <Head title="User Dashboard" />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                {/* Welcome Section */}
                <div className="mb-10 overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-10 text-white shadow-xl shadow-teal-900/20">
                    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                        <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-emerald-100">Welcome back</p>
                            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                                {user.name}
                            </h1>
                            <p className="mt-3 max-w-xl text-sm leading-6 text-emerald-50">
                                Manage your loans, savings, and track your financial progress all in one place.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <span className={`inline-flex rounded-full px-4 py-1 text-xs font-semibold ${accountType.color} ${accountType.textColor}`}>
                                    {accountType.label}
                                </span>
                                <span className={`inline-flex rounded-full px-4 py-1 text-xs font-semibold ${status.color} ${status.textColor}`}>
                                    {status.label}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

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

                {/* Quick Stats */}
                <div className="mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Loan Amount */}
                    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg shadow-slate-200/50">
                        <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-blue-100/60 blur-2xl" />
                        <div className="relative">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-slate-500">Current Loan</p>
                                    <p className="mt-3 text-3xl font-bold text-slate-900">
                                        {formatCurrency(userStats?.current_loan_amount || 0)}
                                    </p>
                                    <p className="mt-2 text-xs text-slate-500">
                                        Balance: {formatCurrency(userStats?.loan_balance || 0)}
                                    </p>
                                </div>
                                <svg className="h-10 w-10 text-blue-500 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Savings Balance */}
                    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg shadow-slate-200/50">
                        <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-purple-100/60 blur-2xl" />
                        <div className="relative">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-slate-500">Savings Balance</p>
                                    <p className="mt-3 text-3xl font-bold text-slate-900">
                                        {formatCurrency(userStats?.savings_balance || 0)}
                                    </p>
                                    <p className="mt-2 text-xs text-slate-500">
                                        Limit: {formatCurrency(100000)}
                                    </p>
                                </div>
                                <svg className="h-10 w-10 text-purple-500 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-5h3c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2zm0 5h-3v-3h3v3zM6 18c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Money Earned */}
                    {user.account_type?.toLowerCase() === 'premium' && (
                        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg shadow-slate-200/50">
                            <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-green-100/60 blur-2xl" />
                            <div className="relative">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-500">Money Earned</p>
                                        <p className="mt-3 text-3xl font-bold text-slate-900">
                                            {formatCurrency(userStats?.money_earned || 0)}
                                        </p>
                                        <p className="mt-2 text-xs text-slate-500">
                                            In Savings
                                        </p>
                                    </div>
                                    <svg className="h-10 w-10 text-green-500 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Pending Withdrawals */}
                    {user.account_type?.toLowerCase() === 'premium' && (
                        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg shadow-slate-200/50">
                            <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-yellow-100/60 blur-2xl" />
                            <div className="relative">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-500">Pending Withdrawals</p>
                                        <p className="mt-3 text-3xl font-bold text-slate-900">
                                            {userStats?.pending_withdrawals || 0}
                                        </p>
                                        <p className="mt-2 text-xs text-slate-500">
                                            Awaiting approval
                                        </p>
                                    </div>
                                    <svg className="h-10 w-10 text-yellow-500 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Link
                        href={route('user.loans.index')}
                        className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-6 transition hover:shadow-lg hover:border-emerald-200"
                    >
                        <svg className="h-8 w-8 text-emerald-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-semibold text-slate-700">Loans</span>
                    </Link>

                    {user.account_type?.toLowerCase() === 'premium' && (
                        <Link
                            href={route('user.savings.index')}
                            className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-6 transition hover:shadow-lg hover:border-emerald-200"
                        >
                            <svg className="h-8 w-8 text-emerald-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm font-semibold text-slate-700">Savings</span>
                        </Link>
                    )}

                    <Link
                        href={route('user.billing.index')}
                        className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-6 transition hover:shadow-lg hover:border-emerald-200"
                    >
                        <svg className="h-8 w-8 text-emerald-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm font-semibold text-slate-700">Billing</span>
                    </Link>

                    <Link
                        href={route('user.transactions.index')}
                        className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-6 transition hover:shadow-lg hover:border-emerald-200"
                    >
                        <svg className="h-8 w-8 text-emerald-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                        <span className="text-sm font-semibold text-slate-700">Transactions</span>
                    </Link>
                </div>

                {/* Recent Transactions */}
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50">
                    <div className="border-b border-slate-200 px-6 py-4 sm:px-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-900">Recent Transactions</h3>
                            <Link
                                href={route('user.transactions.index')}
                                className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                            >
                                View all
                            </Link>
                        </div>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {recentTransactions && recentTransactions.length > 0 ? (
                            recentTransactions.map((transaction) => (
                                <div key={transaction.id} className="flex items-center justify-between px-6 py-4 sm:px-8">
                                    <div className="flex items-center gap-4">
                                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                            transaction.type === 'deposit' || transaction.type === 'loan_disbursement' 
                                                ? 'bg-green-100' 
                                                : 'bg-red-100'
                                        }`}>
                                            <svg className={`h-5 w-5 ${
                                                transaction.type === 'deposit' || transaction.type === 'loan_disbursement'
                                                    ? 'text-green-600'
                                                    : 'text-red-600'
                                            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                {transaction.type === 'deposit' || transaction.type === 'loan_disbursement' ? (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                ) : (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                )}
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900 capitalize">{transaction.type.replace('_', ' ')}</p>
                                            <p className="text-xs text-slate-500">{new Date(transaction.transaction_date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <p className={`text-sm font-semibold ${
                                        transaction.type === 'deposit' || transaction.type === 'loan_disbursement'
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                    }`}>
                                        {transaction.type === 'deposit' || transaction.type === 'loan_disbursement' ? '+' : '-'}
                                        {formatCurrency(transaction.amount)}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="px-6 py-8 text-center sm:px-8">
                                <p className="text-sm text-slate-500">No transactions yet</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
