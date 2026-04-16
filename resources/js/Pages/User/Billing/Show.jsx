import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function ShowBilling({ billing }) {
    const formatCurrency = (value) =>
        value !== null && value !== undefined ? Number(value).toLocaleString('en-US', { style: 'currency', currency: 'PHP' }) : '₱0.00';

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        });
    };

    const statusColor = {
        completed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Completed' },
        overdue: { bg: 'bg-red-100', text: 'text-red-800', label: 'Overdue' },
        pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
    }[billing.status?.toLowerCase()] || { bg: 'bg-slate-100', text: 'text-slate-800', label: 'Unknown' };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-600 text-lg font-bold text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold leading-tight text-slate-900">
                        Billing Statement
                    </h2>
                </div>
            }
        >
            <Head title="Billing Statement" />

            <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <p className="text-sm font-semibold text-slate-500 mb-2">Total Amount Due</p>
                            <p className="text-4xl font-bold text-amber-600">
                                {formatCurrency(billing.total_amount)}
                            </p>
                        </div>
                        <span className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${statusColor.bg} ${statusColor.text}`}>
                            {statusColor.label}
                        </span>
                    </div>

                    {/* Dates */}
                    <div className="grid gap-6 sm:grid-cols-2 pt-6 border-t border-slate-200">
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase">Billing Date</p>
                            <p className="mt-2 text-sm font-semibold text-slate-900">
                                {formatDate(billing.billing_date)}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase">Due Date</p>
                            <p className="mt-2 text-sm font-semibold text-slate-900">
                                {formatDate(billing.due_date)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Borrower Details */}
                <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
                    <h3 className="text-lg font-semibold text-slate-900 mb-6">Borrower Details</h3>
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Account Type</p>
                            <p className="text-sm font-semibold text-slate-900 capitalize">{billing.account_type}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Original Loan Amount</p>
                            <p className="text-sm font-semibold text-slate-900">{formatCurrency(billing.loan_amount)}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Amount Received</p>
                            <p className="text-sm font-semibold text-green-600">{formatCurrency(billing.amount_received)}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Interest Deducted</p>
                            <p className="text-sm font-semibold text-red-600">{formatCurrency(billing.loan_amount - billing.amount_received)}</p>
                        </div>
                    </div>
                </div>

                {/* Amount Breakdown */}
                <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
                    <h3 className="text-lg font-semibold text-slate-900 mb-6">Amount Breakdown</h3>
                    
                    <div className="space-y-3 rounded-lg bg-slate-50 p-6">
                        {/* Base Amount */}
                        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                            <span className="text-slate-700">Base Amount (Monthly Payment)</span>
                            <span className="font-semibold text-slate-900">{formatCurrency(billing.base_amount)}</span>
                        </div>

                        {/* Interest */}
                        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                            <span className="text-slate-700">Interest (3%)</span>
                            <span className="font-semibold text-red-600">{formatCurrency(billing.interest_amount)}</span>
                        </div>

                        {/* Penalty if any */}
                        {billing.penalty_amount > 0 && (
                            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                                <span className="text-slate-700">Late Payment Penalty (2%)</span>
                                <span className="font-semibold text-red-600">{formatCurrency(billing.penalty_amount)}</span>
                            </div>
                        )}

                        {/* Total */}
                        <div className="flex items-center justify-between pt-3">
                            <span className="font-bold text-slate-900 text-lg">TOTAL AMOUNT DUE</span>
                            <span className="font-bold text-amber-600 text-lg">{formatCurrency(billing.total_amount)}</span>
                        </div>
                    </div>
                </div>

                {/* Payment Instructions */}
                <div className="mb-10 rounded-3xl border border-blue-200 bg-blue-50 p-8">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">Payment Information</h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                        <li>• <strong>Payment Method:</strong> Online banking or cash deposit</li>
                        <li>• <strong>Due Date:</strong> Day of month specified above</li>
                        <li>• <strong>Late Payment:</strong> Additional 2% penalty will be charged</li>
                        <li>• <strong>Contact Admin:</strong> For payment arrangements or concerns</li>
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 sm:flex-row">
                    {billing.status !== 'completed' && (
                        <button className="flex-1 inline-flex items-center justify-center rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition hover:bg-amber-700">
                            Pay This Bill
                        </button>
                    )}
                    <Link
                        href={route('user.billing.index')}
                        className="flex-1 inline-flex items-center justify-center rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                        <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Billing
                    </Link>
                </div>

                {/* Footer Note */}
                <div className="mt-10 rounded-lg border border-slate-200 bg-slate-50 p-6 text-center">
                    <p className="text-xs text-slate-600">
                        This is an automatically generated billing statement. For inquiries, please contact the admin.
                    </p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
