import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function PendingWithdrawals({ pendingWithdrawals }) {
    const formatCurrency = (value) =>
        value !== null && value !== undefined ? Number(value).toLocaleString('en-US', { style: 'currency', currency: 'PHP' }) : '₱0.00';

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-yellow-500 text-lg font-bold text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold leading-tight text-slate-900">Pending Withdrawals</h2>
                        <p className="text-sm text-slate-500">View withdrawal requests waiting for admin approval.</p>
                    </div>
                </div>
            }
        >
            <Head title="Pending Withdrawals" />

            <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-slate-500">You have {pendingWithdrawals.length} pending withdrawal request{pendingWithdrawals.length === 1 ? '' : 's'}.</p>
                    </div>
                    <Link
                        href={route('user.savings.index')}
                        className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                        Back to Savings
                    </Link>
                </div>

                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50">
                    <div className="px-6 py-4 sm:px-8">
                        <h3 className="text-lg font-semibold text-slate-900">Pending Withdrawal Requests</h3>
                        <p className="text-sm text-slate-500">These requests are still awaiting admin approval.</p>
                    </div>

                    {pendingWithdrawals.length > 0 ? (
                        <div className="divide-y divide-slate-200">
                            {pendingWithdrawals.map((withdrawal, index) => (
                                <div key={withdrawal.id} className="px-6 py-5 sm:px-8">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">Request {index + 1}</p>
                                            <p className="text-xs text-slate-500">{withdrawal.reference_number}</p>
                                        </div>
                                        <div className="text-sm text-slate-700">
                                            {new Date(withdrawal.transaction_date).toLocaleDateString()} • {new Date(withdrawal.transaction_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Amount</p>
                                            <p className="mt-2 text-lg font-bold text-red-600">{formatCurrency(withdrawal.amount)}</p>
                                        </div>
                                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Status</p>
                                            <p className="mt-2 text-lg font-bold text-yellow-700">Pending</p>
                                        </div>
                                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Balance After</p>
                                            <p className="mt-2 text-lg font-bold text-slate-900">{formatCurrency(withdrawal.balance_after)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center text-slate-500">
                            <p className="text-base font-semibold">No pending withdrawal requests.</p>
                            <p className="mt-2">Submit a withdrawal request from the Withdraw Request page.</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
