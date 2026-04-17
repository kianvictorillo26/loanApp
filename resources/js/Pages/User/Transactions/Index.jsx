import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function TransactionsIndex({ transactions }) {
    const pageProps = usePage().props;
    const user = pageProps.auth?.user ?? {};
    const isPremium = user.account_type?.toLowerCase() === 'premium';
    const [filterType, setFilterType] = useState('all');
    const [searchId, setSearchId] = useState('');

    const formatCurrency = (value) =>
        value !== null && value !== undefined ? Number(value).toLocaleString('en-US', { style: 'currency', currency: 'PHP' }) : '₱0.00';

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Filter transactions
    let filteredTransactions = transactions || [];
    
    if (filterType !== 'all') {
        filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
    }
    
    if (searchId) {
        filteredTransactions = filteredTransactions.filter(t => 
            t.reference_number?.toLowerCase().includes(searchId.toLowerCase())
        );
    }

    const transactionColors = {
        deposit: { bg: 'bg-green-100', text: 'text-green-800', icon: 'text-green-600' },
        withdrawal: { bg: 'bg-red-100', text: 'text-red-800', icon: 'text-red-600' },
        loan_disbursement: { bg: 'bg-blue-100', text: 'text-blue-800', icon: 'text-blue-600' },
        loan_payment: { bg: 'bg-purple-100', text: 'text-purple-800', icon: 'text-purple-600' },
        money_earned: { bg: 'bg-amber-100', text: 'text-amber-800', icon: 'text-amber-600' },
        interest: { bg: 'bg-orange-100', text: 'text-orange-800', icon: 'text-orange-600' },
        penalty: { bg: 'bg-red-100', text: 'text-red-800', icon: 'text-red-600' },
    };

    const statusColors = {
        pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
        completed: { bg: 'bg-green-100', text: 'text-green-800' },
        failed: { bg: 'bg-red-100', text: 'text-red-800' },
        rejected: { bg: 'bg-red-100', text: 'text-red-800' },
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-lg font-bold text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold leading-tight text-slate-900">
                        Transactions
                    </h2>
                </div>
            }
        >
            <Head title="Transactions" />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                {/* Filters and Search */}
                <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg shadow-slate-200/50">
                    <div className="grid gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Search by Transaction ID */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-900 mb-2">
                                Search by Transaction ID
                            </label>
                            <input
                                type="text"
                                value={searchId}
                                onChange={(e) => setSearchId(e.target.value)}
                                placeholder="e.g., TXN20260409000001"
                                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Filter by Type */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-900 mb-2">
                                Filter by Type
                            </label>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            >
                                <option value="all">All Transactions</option>
                                <option value="loan_disbursement">Loan Disbursements</option>
                                <option value="loan_payment">Loan Payments</option>
                                <option value="interest">Interest Charges</option>
                                <option value="penalty">Penalties</option>
                                {isPremium && (
                                    <>
                                        <option value="deposit">Deposits Only</option>
                                        <option value="withdrawal">Withdrawals Only</option>
                                        <option value="money_earned">Money Earned</option>
                                    </>
                                )}
                            </select>
                        </div>

                        {/* Results Count */}
                        <div className="flex items-end">
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    Results
                                </label>
                                <p className="text-2xl font-bold text-indigo-600">
                                    {filteredTransactions.length}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Clear Filters */}
                    {(filterType !== 'all' || searchId) && (
                        <button
                            onClick={() => {
                                setFilterType('all');
                                setSearchId('');
                            }}
                            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                        >
                            Clear all filters
                        </button>
                    )}
                </div>

                {/* Transactions Table */}
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50">
                    {filteredTransactions.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50">
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase sm:px-8">
                                            No.
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase sm:px-8">
                                            Transaction ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase sm:px-8">
                                            Type
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase sm:px-8">
                                            Amount
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase sm:px-8">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase sm:px-8">
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredTransactions.map((transaction, index) => {
                                        const typeColor = transactionColors[transaction.type] || transactionColors.deposit;
                                        const statusColor = statusColors[transaction.status] || statusColors.pending;
                                        return (
                                            <tr key={transaction.id} className="hover:bg-slate-50 transition">
                                                <td className="px-6 py-4 text-sm text-slate-600 sm:px-8">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4 sm:px-8">
                                                    <div>
                                                        <p className="text-sm font-semibold text-slate-900">
                                                            {transaction.reference_number || 'N/A'}
                                                        </p>
                                                        {transaction.notes && (
                                                            <p className="text-xs text-slate-500 mt-1">
                                                                {transaction.notes}
                                                            </p>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 sm:px-8">
                                                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${typeColor.bg} ${typeColor.text}`}>
                                                        {transaction.type.replace('_', ' ')}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 sm:px-8">
                                                    <p className="text-sm font-semibold text-slate-900">
                                                        {['deposit', 'loan_disbursement', 'interest', 'penalty', 'money_earned'].includes(transaction.type) ? '+' : '-'}
                                                        {formatCurrency(transaction.amount)}
                                                    </p>
                                                    {transaction.balance_after !== null && (
                                                        <p className="text-xs text-slate-500 mt-1">
                                                            Balance: {formatCurrency(transaction.balance_after)}
                                                        </p>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 sm:px-8">
                                                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusColor.bg} ${statusColor.text}`}>
                                                        {transaction.status?.charAt(0).toUpperCase() + transaction.status?.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600 sm:px-8">
                                                    {formatDate(transaction.transaction_date)}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="px-6 py-12 text-center sm:px-8">
                            <svg className="mx-auto h-16 w-16 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <p className="text-lg font-semibold text-slate-600">No transactions found</p>
                            <p className="mt-2 text-slate-500">Try adjusting your filters or search criteria</p>
                        </div>
                    )}
                </div>

                {isPremium && (
                    <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg shadow-slate-200/50">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4"> Transaction Types</h3>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                                    <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                                <span className="text-sm text-slate-700">Deposit - Money added to savings</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                                    <svg className="h-4 w-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                    </svg>
                                </div>
                                <span className="text-sm text-slate-700">Withdrawal - Money withdrawn from savings</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                                    <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span className="text-sm text-slate-700">Loan Disbursement - Loan amount received</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                                    <svg className="h-4 w-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span className="text-sm text-slate-700">Loan Payment - Monthly loan payment</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                                    <svg className="h-4 w-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span className="text-sm text-slate-700">Money Earned - Premium income added to savings</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
                                    <svg className="h-4 w-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span className="text-sm text-slate-700">Interest - Interest charged on loan</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
