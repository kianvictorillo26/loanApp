import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function SavingsShow({ savings, transactions }) {
    const formatCurrency = (value) =>
        value !== null && value !== undefined
            ? Number(value).toLocaleString('en-US', { style: 'currency', currency: 'PHP' })
            : '₱0.00';

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M12 3v18M6 21h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold leading-tight text-slate-900">Manage Savings Account</h2>
                        <p className="text-sm text-slate-500">Review account details and transaction history for this savings account.</p>
                    </div>
                </div>
            }
        >
            <Head title="Manage Savings Account" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50">
                        <div className="border-b border-slate-200 px-6 py-6 sm:px-8">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900">Account Summary</h3>
                                    <p className="text-sm text-slate-500">Account details for {savings.user.name}.</p>
                                </div>
                                <Link
                                    href={route('admin.savings.index')}
                                    className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    Back to Savings
                                </Link>
                            </div>
                        </div>

                        <div className="grid gap-6 p-6 sm:grid-cols-3 sm:p-8">
                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Account Holder</p>
                                <p className="mt-3 text-lg font-semibold text-slate-900">{savings.user.name}</p>
                                <p className="text-sm text-slate-500">{savings.user.email}</p>
                            </div>
                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Account Number</p>
                                <p className="mt-3 text-lg font-semibold text-slate-900 font-mono">{savings.account_number}</p>
                            </div>
                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Current Balance</p>
                                <p className="mt-3 text-lg font-semibold text-emerald-600">{formatCurrency(savings.balance)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50">
                        <div className="border-b border-slate-200 px-6 py-6 sm:px-8">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900">Transaction History</h3>
                                    <p className="text-sm text-slate-500">All savings transactions for this account, sorted newest first.</p>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">#</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Transaction ID</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Type</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Amount</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Balance After</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {transactions.data.length > 0 ? (
                                        transactions.data.map((transaction, index) => {
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
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-8 text-center text-sm text-slate-500">
                                                No transactions found for this account.
                                            </td>
                                        </tr>
                                    )}
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
