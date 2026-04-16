import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';

export default function SavingsIndex({ savings, transactions }) {
    const { data, setData, post, processing, errors } = useForm({
        amount: '',
        notes: '',
        reason: '',
    });

    const formatCurrency = (value) =>
        value !== null && value !== undefined
            ? Number(value).toLocaleString('en-US', { style: 'currency', currency: 'PHP' })
            : '₱0.00';

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
            onSuccess: () => router.reload(),
            onError: () => alert('Unable to approve withdrawal. Please try again.'),
        });
    };

    const rejectWithdrawal = (transactionId) => {
        const reason = prompt('Rejection reason:');
        if (!reason || !reason.trim()) {
            alert('Please enter a valid rejection reason.');
            return;
        }

        post(route('admin.withdrawals.reject', transactionId), {
            data: { reason: reason.trim() },
            preserveScroll: true,
            onSuccess: () => router.reload(),
            onError: () => alert('Unable to reject withdrawal. Please try again.'),
        });
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
                                                            <Link
                                                                href={route('admin.savings.show', account.id)}
                                                                className="inline-flex items-center rounded-2xl bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 transition"
                                                            >
                                                                Manage account
                                                            </Link>
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


                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50 mt-8">
                        <div className="border-b border-slate-200 px-6 py-4 sm:px-8">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900">All Savings Transactions</h3>
                                    <p className="text-sm text-slate-500">Complete savings activity for all users, sorted by latest transaction date.</p>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">#</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Transaction ID</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">User</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Account</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Type</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Amount</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Balance After</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {transactions.data.map((transaction, index) => {
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
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                                    {transaction.user?.name || 'N/A'}
                                                    <div className="text-xs text-slate-500">{transaction.user?.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-mono">{transaction.savings?.account_number || 'N/A'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{typeLabel}</td>
                                                <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${isCredit ? 'text-green-600' : 'text-red-600'}`}>
                                                    {isCredit ? '+' : '-'}{formatCurrency(transaction.amount)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{formatCurrency(transaction.balance_after)}</td>
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
                        </div>

                        {transactions.links && transactions.links.length > 3 && (
                            <div className="px-6 py-6 sm:px-8">
                                <div className="flex flex-wrap items-center justify-center gap-2">
                                    {transactions.links.map((link, index) => (
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
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}