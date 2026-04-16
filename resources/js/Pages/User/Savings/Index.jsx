import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function SavingsIndex({ savings, savingsHistory, minTransaction,  maxTransaction, maxBalance }) {
    const pageProps = usePage().props;
    const flash = pageProps.flash ?? {};
    const [filterType, setFilterType] = useState('all');
    const [searchId, setSearchId] = useState('');

    const formatCurrency = (value) =>
        value !== null && value !== undefined ? Number(value).toLocaleString('en-US', { style: 'currency', currency: 'PHP' }) : '₱0.00';

    const savingsBalance = savings?.balance || 0;
    const percentageUsed = (savingsBalance / maxBalance) * 100;

    const filteredTransactions = useMemo(() => {
        const transactions = savingsHistory || [];
        return transactions.filter((transaction) => {
            const matchesType = filterType === 'all' || transaction.type === filterType;
            const matchesSearch = searchId
                ? transaction.reference_number?.toLowerCase().includes(searchId.toLowerCase())
                : true;
            return matchesType && matchesSearch;
        });
    }, [filterType, searchId, savingsHistory]);

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

                            <div className="flex flex-col gap-3 sm:flex-row">
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
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">Savings Guidelines</h3>
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
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900">Transaction History</h3>
                                <p className="text-sm text-slate-500">All savings deposits, withdrawal requests, and premium income entries.</p>
                            </div>
                            <Link
                                href={route('user.transactions.index')}
                                className="text-sm font-semibold text-purple-600 hover:text-purple-700"
                            >
                                View all transactions
                            </Link>
                        </div>
                    </div>

                    <div className="px-6 py-4 sm:px-8">
                        <div className="grid gap-4 md:grid-cols-3">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Filter by Category</label>
                                <select
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                                >
                                    <option value="all">All</option>
                                    <option value="deposit">Deposit</option>
                                    <option value="withdrawal">Withdrawal</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Search by Transaction ID</label>
                                <input
                                    type="text"
                                    value={searchId}
                                    onChange={(e) => setSearchId(e.target.value)}
                                    placeholder="Search transaction ID"
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">No.</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Transaction ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Category</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Amount</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {filteredTransactions.map((transaction, index) => {
                                    const isCredit = transaction.type === 'deposit' || transaction.type === 'money_earned';
                                    const typeLabel = transaction.type === 'deposit'
                                        ? 'Deposit'
                                        : transaction.type === 'money_earned'
                                            ? 'Premium Income'
                                            : 'Withdrawal';
                                    return (
                                        <tr key={transaction.id} className="hover:bg-slate-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{index + 1}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{transaction.reference_number}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{typeLabel}</td>
                                            <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${isCredit ? 'text-green-600' : 'text-red-600'}`}>
                                                {isCredit ? '+' : '-'}{formatCurrency(transaction.amount)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                    transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                    transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {transaction.status?.charAt(0).toUpperCase() + transaction.status?.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{new Date(transaction.transaction_date).toLocaleDateString()}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {filteredTransactions.length === 0 && (
                            <div className="px-6 py-12 text-center text-slate-500">No transactions match your filters.</div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
