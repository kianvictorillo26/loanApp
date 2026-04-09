import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function ShowLoan({ loan, loanTransactions }) {
    const formatCurrency = (value) =>
        value !== null && value !== undefined ? Number(value).toLocaleString('en-US', { style: 'currency', currency: 'PHP' }) : '₱0.00';

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric'
        });
    };

    const statusColor = {
        pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
        approved: { bg: 'bg-green-100', text: 'text-green-800' },
        rejected: { bg: 'bg-red-100', text: 'text-red-800' },
    }[loan.status?.toLowerCase()] || { bg: 'bg-slate-100', text: 'text-slate-800' };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold leading-tight text-slate-900">
                        Loan Details
                    </h2>
                </div>
            }
        >
            <Head title="Loan Details" />

            <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                {/* Loan Header */}
                <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <p className="text-sm font-semibold text-slate-500 mb-2">Loan Amount</p>
                            <p className="text-4xl font-bold text-blue-600">
                                {formatCurrency(loan.amount)}
                            </p>
                        </div>
                        <span className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${statusColor.bg} ${statusColor.text}`}>
                            {loan.status?.charAt(0).toUpperCase() + loan.status?.slice(1)}
                        </span>
                    </div>

                    {/* Loan Details Grid */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase">Term</p>
                            <p className="mt-2 text-lg font-bold text-slate-900">{loan.term_months} months</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase">Interest Rate</p>
                            <p className="mt-2 text-lg font-bold text-slate-900">{loan.interest_rate}%</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase">Total Amount</p>
                            <p className="mt-2 text-lg font-bold text-slate-900">{formatCurrency(loan.total_amount)}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase">Monthly Payment</p>
                            <p className="mt-2 text-lg font-bold text-slate-900">{formatCurrency(loan.monthly_payment)}</p>
                        </div>
                    </div>
                </div>

                {/* Approval Details (if approved) */}
                {loan.status === 'approved' && (
                    <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
                        <h3 className="text-lg font-semibold text-slate-900 mb-6">Disbursement & Payment Details</h3>
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Disbursement Date</p>
                                <p className="text-sm font-semibold text-slate-900">
                                    {formatDate(loan.disbursement_date)}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Due Date</p>
                                <p className="text-sm font-semibold text-slate-900">
                                    {formatDate(loan.due_date)}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Amount Paid</p>
                                <p className="text-sm font-semibold text-slate-900">
                                    {formatCurrency(loan.amount_paid)}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Remaining Balance</p>
                                <p className="text-sm font-semibold text-blue-600">
                                    {formatCurrency(loan.remaining_balance)}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Rejection Reason (if rejected) */}
                {loan.status === 'rejected' && loan.rejection_reason && (
                    <div className="mb-10 rounded-3xl border border-red-200 bg-red-50 p-8 shadow-lg shadow-red-100/50">
                        <h3 className="text-lg font-semibold text-red-900 mb-3">Rejection Reason</h3>
                        <p className="text-red-800">{loan.rejection_reason}</p>
                    </div>
                )}

                {/* Purpose */}
                {loan.purpose && (
                    <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
                        <h3 className="text-lg font-semibold text-slate-900 mb-3">Loan Purpose</h3>
                        <p className="text-slate-700">{loan.purpose}</p>
                    </div>
                )}

                {/* Loan Transactions */}
                {loanTransactions && loanTransactions.length > 0 && (
                    <div className="mb-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50">
                        <div className="border-b border-slate-200 px-6 py-4 sm:px-8">
                            <h3 className="text-lg font-semibold text-slate-900">Transaction History</h3>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {loanTransactions.map((transaction) => (
                                <div key={transaction.id} className="flex items-center justify-between px-6 py-4 sm:px-8">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900 capitalize">
                                            {transaction.type.replace('_', ' ')}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            {new Date(transaction.transaction_date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-slate-900">
                                            {formatCurrency(transaction.amount)}
                                        </p>
                                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold mt-1 ${
                                            transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                                            transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {transaction.status?.charAt(0).toUpperCase() + transaction.status?.slice(1)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Back Button */}
                <div className="mb-10">
                    <Link
                        href={route('user.loans.index')}
                        className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                        <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Loans
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
