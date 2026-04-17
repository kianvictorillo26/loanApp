import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function WithdrawalsIndex({ pendingWithdrawals }) {
    const formatCurrency = (value) =>
        value !== null && value !== undefined
            ? Number(value).toLocaleString('en-US', { style: 'currency', currency: 'PHP' })
            : '₱0.00';

    const approveWithdrawal = (transactionId) => {
        router.post(route('admin.withdrawals.approve', transactionId), {
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

        router.post(
            route('admin.withdrawals.reject', transactionId),
            { reason: reason.trim() },
            {
                preserveScroll: true,
                onSuccess: () => router.reload(),
                onError: () => alert('Unable to reject withdrawal. Please try again.'),
            }
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-600 text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold leading-tight text-slate-900">Pending Withdrawals</h2>
                </div>
            }
        >
            <Head title="Pending Withdrawals" />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-10">
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50">
                    <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900">Pending Withdrawals</h3>
                                <p className="text-sm text-slate-500">Only withdrawal requests awaiting admin approval are shown here.</p>
                            </div>
                            <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
                                {pendingWithdrawals.length} pending
                            </span>
                        </div>
                    </div>

                    <div className="space-y-6 p-6 sm:p-8">
                        {pendingWithdrawals.length > 0 ? (
                            pendingWithdrawals.map((transaction) => (
                                <div key={transaction.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                                    <div className="grid gap-4 lg:grid-cols-3">
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">User</p>
                                            <p className="mt-2 text-base font-semibold text-slate-900">{transaction.user?.name || 'N/A'}</p>
                                            <p className="text-sm text-slate-500">{transaction.user?.email || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Amount</p>
                                            <p className="mt-2 text-base font-semibold text-red-600">{formatCurrency(transaction.amount)}</p>
                                            <p className="text-sm text-slate-500">Balance after: {formatCurrency(transaction.balance_after)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Requested</p>
                                            <p className="mt-2 text-base font-semibold text-slate-900">{new Date(transaction.transaction_date).toLocaleDateString()}</p>
                                            <p className="text-sm text-slate-500">{new Date(transaction.transaction_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                                        <button
                                            type="button"
                                            onClick={() => approveWithdrawal(transaction.id)}
                                            className="inline-flex items-center justify-center rounded-2xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => rejectWithdrawal(transaction.id)}
                                            className="inline-flex items-center justify-center rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
                                <p className="text-lg font-semibold text-slate-900">No pending withdrawals</p>
                                <p className="mt-2">All withdrawal requests have been processed.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
