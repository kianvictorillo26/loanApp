import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function LoansIndex({ loans, maxLoanAmount, currentTotalLoan }) {
    const pageProps = usePage().props;
    const flash = pageProps.flash ?? {};
    
    const formatCurrency = (value) =>
        value !== null && value !== undefined ? Number(value).toLocaleString('en-US', { style: 'currency', currency: 'PHP' }) : '₱0.00';

    const statusColors = {
        pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
        approved: { bg: 'bg-green-100', text: 'text-green-800', label: 'Approved' },
        rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected' },
    };

    const remainingLoanCapacity = maxLoanAmount - currentTotalLoan;
    const canApplyForMore = remainingLoanCapacity > 0;

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
                        My Loans
                    </h2>
                </div>
            }
        >
            <Head title="My Loans" />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                {/* Loan Capacity Overview */}
                <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
                    <div className="grid gap-6 md:grid-cols-3">
                        <div>
                            <p className="text-sm font-semibold text-slate-500">Maximum Loan</p>
                            <p className="mt-2 text-3xl font-bold text-slate-900">
                                {formatCurrency(maxLoanAmount)}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-500">Current Loan</p>
                            <p className="mt-2 text-3xl font-bold text-slate-900">
                                {formatCurrency(currentTotalLoan)}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-500">Remaining Capacity</p>
                            <p className={`mt-2 text-3xl font-bold ${canApplyForMore ? 'text-green-600' : 'text-red-600'}`}>
                                {formatCurrency(remainingLoanCapacity)}
                            </p>
                        </div>
                    </div>
                    
                    {canApplyForMore && (
                        <div className="mt-6 border-t border-slate-200 pt-6">
                            <Link
                                href={route('user.loans.create')}
                                className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                            >
                                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Apply for Loan
                            </Link>
                        </div>
                    )}
                </div>

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

                {flash?.error && (
                    <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-sm font-bold">
                                ✕
                            </div>
                            {flash.error}
                        </div>
                    </div>
                )}

                {/* Loans List */}
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50">
                    <div className="border-b border-slate-200 px-6 py-4 sm:px-8">
                        <h3 className="text-lg font-semibold text-slate-900">Loan Applications</h3>
                    </div>
                    
                    {loans && loans.length > 0 ? (
                        <div className="divide-y divide-slate-100">
                            {loans.map((loan) => {
                                const statusColor = statusColors[loan.status?.toLowerCase()] || statusColors.pending;
                                return (
                                    <div key={loan.id} className="flex flex-col gap-4 border-b border-slate-100 px-6 py-6 sm:px-8 last:border-b-0 md:flex-row md:items-center md:justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <p className="text-lg font-semibold text-slate-900">
                                                    {formatCurrency(loan.amount)}
                                                </p>
                                                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusColor.bg} ${statusColor.text}`}>
                                                    {statusColor.label}
                                                </span>
                                            </div>
                                            <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-3">
                                                <div>
                                                    <p className="text-xs font-semibold text-slate-500">Term</p>
                                                    <p>{loan.term_months || loan.term} months</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold text-slate-500">Interest Rate</p>
                                                    <p>{loan.interest_rate}%</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold text-slate-500">Total Amount</p>
                                                    <p>{formatCurrency(loan.total_amount)}</p>
                                                </div>
                                            </div>
                                            
                                            {loan.status === 'approved' && (
                                                <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-3">
                                                    <div>
                                                        <p className="text-xs font-semibold text-slate-500">Disbursement Date</p>
                                                        <p>{new Date(loan.disbursement_date).toLocaleDateString()}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-semibold text-slate-500">Monthly Payment</p>
                                                        <p>{formatCurrency(loan.monthly_payment)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-semibold text-slate-500">Remaining Balance</p>
                                                        <p>{formatCurrency(loan.remaining_balance)}</p>
                                                    </div>
                                                </div>
                                            )}

                                            {loan.status === 'rejected' && loan.rejection_reason && (
                                                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3">
                                                    <p className="text-xs font-semibold text-red-700">Reason for Rejection</p>
                                                    <p className="mt-1 text-sm text-red-600">{loan.rejection_reason}</p>
                                                </div>
                                            )}
                                        </div>

                                        <Link
                                            href={route('user.loans.show', loan.id)}
                                            className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="px-6 py-12 text-center sm:px-8">
                            <svg className="mx-auto h-16 w-16 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-slate-600 mb-4">No loan applications yet</p>
                            <Link
                                href={route('user.loans.create')}
                                className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                            >
                                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Apply for Your First Loan
                            </Link>
                        </div>
                    )}
                </div>

                {/* Important Information Box */}
                <div className="mt-10 rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4"> Loan Information</h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                        <li>• Minimum loan amount: ₱5,000</li>
                        <li>• Maximum loan amount: ₱10,000 per application</li>
                        <li>• Total approved loan balance may not exceed ₱50,000</li>
                        <li>• Amount must be in thousands (₱5,000, ₱6,000, ₱7,000, etc.)</li>
                        <li>• Interest rate: 3% (charged upfront)</li>
                        <li>• Loan terms: 1, 3, 6, or 12 months</li>
                        <li>• Loans can be increased after on-time payments</li>
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
