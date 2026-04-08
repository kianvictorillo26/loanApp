import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function ReportsIndex({ stats, recentTransactions }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6m4 6V9m4 6v-2M4 19h16" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold leading-tight text-slate-900">
                        Reports & Analytics
                    </h2>
                </div>
            }
        >
            <Head title="Reports & Analytics" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Key Metrics */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
                        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg shadow-slate-200/50">
                            <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-green-100/60 blur-2xl" />
                            <div className="relative">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-500">Total Earnings</p>
                                        <p className="mt-2 text-3xl font-bold text-slate-900">₱{stats.total_earnings?.toLocaleString() || '0'}</p>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg shadow-slate-200/50">
                            <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-blue-100/60 blur-2xl" />
                            <div className="relative">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-500">Monthly Earnings</p>
                                        <p className="mt-2 text-3xl font-bold text-slate-900">₱{stats.monthly_earnings?.toLocaleString() || '0'}</p>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 17l6-6 4 4 8-8" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg shadow-slate-200/50">
                            <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-emerald-100/60 blur-2xl" />
                            <div className="relative">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-500">Total Savings</p>
                                        <p className="mt-2 text-3xl font-bold text-slate-900">₱{stats.total_savings?.toLocaleString() || '0'}</p>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M12 3v18M6 21h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg shadow-slate-200/50">
                            <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-purple-100/60 blur-2xl" />
                            <div className="relative">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-500">Active Users</p>
                                        <p className="mt-2 text-3xl font-bold text-slate-900">{stats.active_users || 0}</p>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-4-4h-2M9 20H4v-2a4 4 0 014-4h1M16 11a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Stats */}
                    <div className="grid gap-6 sm:grid-cols-2 mb-10">
                        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg shadow-slate-200/50">
                            <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-sky-100/60 blur-2xl" />
                            <div className="relative">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-500">Total Loan Amount</p>
                                        <p className="mt-2 text-2xl font-bold text-slate-900">₱{stats.total_loans?.toLocaleString() || '0'}</p>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 11h16M5 15h4m-4 4h4" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg shadow-slate-200/50">
                            <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-orange-100/60 blur-2xl" />
                            <div className="relative">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-500">Average Loan Size</p>
                                        <p className="mt-2 text-2xl font-bold text-slate-900">
                                            ₱{stats.total_loans > 0 && stats.active_users > 0 ? (stats.total_loans / stats.active_users).toFixed(2) : '0.00'}
                                        </p>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 17h3V7H4v10zm5 0h3V11H9v6zm5 0h3V13h-3v4z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-xl shadow-slate-200/50 mb-10">
                        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-indigo-100/60 blur-3xl" />
                        <div className="relative">
                            <div className="px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-indigo-50/80 to-slate-50/80">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2-10H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V8a2 2 0 00-2-2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-900">Recent Transactions</h3>
                                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
                                        {recentTransactions.length}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-slate-200">
                                        <thead className="bg-slate-50">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                    Date
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                    User
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                    Type
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                    Amount
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                    Reference
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200 bg-white">
                                            {recentTransactions.map((transaction) => (
                                                <tr key={transaction.id} className="hover:bg-slate-50 transition">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                                        {new Date(transaction.transaction_date).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 font-semibold text-sm">
                                                                {transaction.user.name.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div className="ml-3">
                                                                <div className="text-sm font-semibold text-slate-900">{transaction.user.name}</div>
                                                                <div className="text-sm text-slate-500">{transaction.user.email}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                                                            transaction.type === 'deposit'
                                                                ? 'bg-green-100 text-green-800'
                                                                : transaction.type === 'withdrawal'
                                                                ? 'bg-red-100 text-red-800'
                                                                : transaction.type === 'loan_disbursement'
                                                                ? 'bg-blue-100 text-blue-800'
                                                                : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                            {transaction.type.replace('_', ' ')}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                                        <span className="font-bold">₱{transaction.amount.toLocaleString()}</span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                                                            transaction.status === 'completed'
                                                                ? 'bg-green-100 text-green-800'
                                                                : transaction.status === 'pending'
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {transaction.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">
                                                        {transaction.reference_number || 'N/A'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Export Options */}
                    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-xl shadow-slate-200/50">
                        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-indigo-100/60 blur-3xl" />
                        <div className="relative px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-indigo-50/80 to-slate-50/80">
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900">Export Reports</h3>
                            </div>
                        </div>
                        <div className="relative p-8">
                            <div className="flex flex-wrap gap-4">
                                <button className="inline-flex items-center rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:from-blue-600 hover:to-blue-700 hover:shadow-xl hover:shadow-blue-500/30">
                                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                                    </svg>
                                    Export Transactions (CSV)
                                </button>
                                <button className="inline-flex items-center rounded-2xl bg-gradient-to-r from-green-500 to-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/25 transition hover:from-green-600 hover:to-green-700 hover:shadow-xl hover:shadow-green-500/30">
                                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10M7 11h10M7 15h7M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
                                    </svg>
                                    Export User Report (PDF)
                                </button>
                                <button className="inline-flex items-center rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition hover:from-purple-600 hover:to-purple-700 hover:shadow-xl hover:shadow-purple-500/30">
                                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Generate Monthly Statement
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}