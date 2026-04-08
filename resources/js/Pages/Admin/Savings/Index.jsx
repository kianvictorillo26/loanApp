import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function SavingsIndex({ savings, pendingWithdrawals }) {
    const { data, setData, post, processing, errors } = useForm({
        amount: '',
        notes: '',
        reason: '',
    });

    const deposit = (savingsId) => {
        post(route('admin.savings.deposit', savingsId), {
            data: {
                amount: data.amount,
                notes: data.notes,
            },
            preserveScroll: true,
        });
    };

    const approveWithdrawal = (transactionId) => {
        post(route('admin.withdrawals.approve', transactionId), {
            preserveScroll: true,
        });
    };

    const rejectWithdrawal = (transactionId) => {
        const reason = prompt('Rejection reason:');
        if (reason) {
            post(route('admin.withdrawals.reject', transactionId), {
                data: { reason },
                preserveScroll: true,
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M12 3v18M6 21h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold leading-tight text-slate-900">
                        Savings Management
                    </h2>
                </div>
            }
        >
            <Head title="Savings Management" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Deposit Settings */}
                    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-xl shadow-slate-200/50 mb-8">
                        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-100/60 blur-3xl" />
                        <div className="relative px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-emerald-50/80 to-slate-50/80">
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900">Deposit Settings</h3>
                            </div>
                        </div>
                        <div className="relative p-8">
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700">
                                        Deposit Amount
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={data.amount}
                                        onChange={(e) => setData('amount', e.target.value)}
                                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-emerald-500 focus:ring-emerald-500 transition"
                                        placeholder="e.g., 1000.00"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700">
                                        Notes
                                    </label>
                                    <input
                                        type="text"
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-emerald-500 focus:ring-emerald-500 transition"
                                        placeholder="Optional notes"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Savings Accounts Table */}
                    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-xl shadow-slate-200/50 mb-8">
                        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-100/60 blur-3xl" />
                        <div className="relative">
                            <div className="px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-emerald-50/80 to-slate-50/80">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 17h3V7H4v10zm5 0h3V3H9v14zm5 0h3V11h-3v6z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-semibold text-slate-900">Savings Accounts</h3>
                                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                                            {savings.data.length}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-slate-200">
                                        <thead className="bg-slate-50">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                    Account Holder
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                    Account Number
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                    Balance
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200 bg-white">
                                            {savings.data.map((account) => (
                                                <tr key={account.id} className="hover:bg-slate-50 transition">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 font-semibold">
                                                                {account.user.name.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-semibold text-slate-900">{account.user.name}</div>
                                                                <div className="text-sm text-slate-500">{account.user.email}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-mono">
                                                        {account.account_number}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                                        <span className="text-lg font-bold text-emerald-600">₱{account.balance.toLocaleString()}</span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                                                            account.status === 'active'
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {account.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex items-center gap-3">
                                                            <button
                                                                onClick={() => deposit(account.id)}
                                                                className="inline-flex items-center rounded-2xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 transition disabled:opacity-50"
                                                                disabled={processing}
                                                            >
                                                                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17a2 2 0 104 0 2 2 0 00-4 0zm-3-8h10M12 5v4m0 0a4 4 0 00-4 4v1h8v-1a4 4 0 00-4-4z" />
                                                                </svg>
                                                                Deposit
                                                            </button>
                                                            <span className="inline-flex items-center rounded-2xl bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600">
                                                                Manage account
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                {savings.links && savings.links.length > 3 && (
                                    <div className="mt-8 flex items-center justify-center gap-2">
                                        {savings.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url}
                                                className={`inline-flex items-center rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                                                    link.active
                                                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
                                                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Pending Withdrawals */}
                    {pendingWithdrawals && pendingWithdrawals.length > 0 && (
                        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-xl shadow-slate-200/50">
                            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-orange-100/60 blur-3xl" />
                            <div className="relative px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-orange-50/80 to-slate-50/80">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-900">Pending Withdrawals</h3>
                                    <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
                                        {pendingWithdrawals.length}
                                    </span>
                                </div>
                            </div>
                            <div className="relative p-8">
                                <div className="space-y-6">
                                    {pendingWithdrawals.map((transaction) => (
                                        <div key={transaction.id} className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50">
                                            <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-orange-100/60 blur-2xl" />
                                            <div className="relative">
                                                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                                                    <div className="flex-1">
                                                        <div className="mb-4">
                                                            <h4 className="text-lg font-semibold text-slate-900">{transaction.user.name}</h4>
                                                            <p className="text-sm text-slate-500">{transaction.user.email}</p>
                                                        </div>
                                                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                                            <div className="rounded-2xl bg-slate-50 p-4">
                                                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Amount</p>
                                                                <p className="mt-1 text-lg font-bold text-slate-900">₱{transaction.amount.toLocaleString()}</p>
                                                            </div>
                                                            <div className="rounded-2xl bg-slate-50 p-4">
                                                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Account</p>
                                                                <p className="mt-1 text-sm font-medium text-slate-900">{transaction.savings?.account_number}</p>
                                                            </div>
                                                            <div className="rounded-2xl bg-slate-50 p-4">
                                                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Current Balance</p>
                                                                <p className="mt-1 text-sm font-medium text-slate-900">₱{transaction.savings?.balance.toLocaleString()}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-3 lg:min-w-[200px]">
                                                        <button
                                                            onClick={() => approveWithdrawal(transaction.id)}
                                                            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/25 transition hover:from-green-600 hover:to-green-700 hover:shadow-xl hover:shadow-green-500/30"
                                                        >
                                                            <span className="mr-2">✓</span>
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => rejectWithdrawal(transaction.id)}
                                                            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/25 transition hover:from-red-600 hover:to-red-700 hover:shadow-xl hover:shadow-red-500/30"
                                                        >
                                                            <span className="mr-2">✗</span>
                                                            Reject
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}