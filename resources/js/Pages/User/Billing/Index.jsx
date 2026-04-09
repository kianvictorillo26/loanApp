import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function BillingIndex({ currentBilling, billingHistory, loanInfo }) {
    const [expandedYear, setExpandedYear] = useState(null);

    const formatCurrency = (value) =>
        value !== null && value !== undefined ? Number(value).toLocaleString('en-US', { style: 'currency', currency: 'PHP' }) : '₱0.00';

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    // Group billing history by year
    const billingByYear = {};
    billingHistory?.forEach(bill => {
        const year = new Date(bill.billing_date).getFullYear();
        if (!billingByYear[year]) {
            billingByYear[year] = [];
        }
        billingByYear[year].push(bill);
    });

    // Sort by year descending
    const sortedYears = Object.keys(billingByYear).sort((a, b) => b - a);

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
                        Billing & Payments
                    </h2>
                </div>
            }
        >
            <Head title="Billing & Payments" />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                {/* Current Billing */}
                {currentBilling ? (
                    <div className="mb-10 rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50 overflow-hidden">
                        <div className="border-b border-slate-200 bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 sm:px-8">
                            <h3 className="text-lg font-semibold text-slate-900">Current Month Billing</h3>
                        </div>
                        <div className="p-6 sm:p-8">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase mb-4">Billing Details</p>
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span className="text-slate-600">Billing Date</span>
                                            <span className="font-semibold text-slate-900">{formatDate(currentBilling.billing_date)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-600">Due Date</span>
                                            <span className="font-semibold text-slate-900">{formatDate(currentBilling.due_date)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-600">Loan Amount</span>
                                            <span className="font-semibold text-slate-900">{formatCurrency(currentBilling.loan_amount)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-600">Amount Received</span>
                                            <span className="font-semibold text-green-600">{formatCurrency(currentBilling.amount_received)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase mb-4">Amount Breakdown</p>
                                    <div className="space-y-3 rounded-lg bg-slate-50 p-4">
                                        <div className="flex justify-between">
                                            <span className="text-slate-600">Base Amount</span>
                                            <span className="font-semibold">{formatCurrency(currentBilling.base_amount)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-600">Interest (3%)</span>
                                            <span className="font-semibold text-red-600">{formatCurrency(currentBilling.interest_amount)}</span>
                                        </div>
                                        {currentBilling.penalty_amount > 0 && (
                                            <div className="flex justify-between">
                                                <span className="text-slate-600">Late Payment Penalty (2%)</span>
                                                <span className="font-semibold text-red-600">{formatCurrency(currentBilling.penalty_amount)}</span>
                                            </div>
                                        )}
                                        <div className="border-t border-slate-200 pt-3 flex justify-between">
                                            <span className="font-semibold text-slate-900">Total Due</span>
                                            <span className="text-lg font-bold text-amber-600">{formatCurrency(currentBilling.total_amount)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Status and Actions */}
                            <div className="mt-6 flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Status</p>
                                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                        currentBilling.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        currentBilling.status === 'overdue' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {currentBilling.status?.charAt(0).toUpperCase() + currentBilling.status?.slice(1)}
                                    </span>
                                </div>
                                {currentBilling.status !== 'completed' && (
                                    <button className="inline-flex items-center justify-center rounded-lg bg-amber-600 px-6 py-2 font-semibold text-white transition hover:bg-amber-700">
                                        Pay Now
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg shadow-slate-200/50">
                        <svg className="mx-auto h-16 w-16 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-lg font-semibold text-slate-600">No bills to pay</p>
                        <p className="mt-2 text-slate-500">You don't have any active loans at the moment</p>
                    </div>
                )}

                {/* Billing History */}
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50">
                    <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 sm:px-8">
                        <h3 className="text-lg font-semibold text-slate-900">Billing History</h3>
                    </div>

                    {Object.keys(billingByYear).length > 0 ? (
                        <div className="divide-y divide-slate-100">
                            {sortedYears.map((year) => (
                                <div key={year}>
                                    {/* Year Header */}
                                    <button
                                        onClick={() => setExpandedYear(expandedYear === year ? null : year)}
                                        className="w-full flex items-center justify-between px-6 py-4 sm:px-8 hover:bg-slate-50 transition"
                                    >
                                        <span className="text-sm font-semibold text-slate-900">{year}</span>
                                        <svg
                                            className={`h-5 w-5 text-slate-500 transition ${expandedYear === year ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                    </button>

                                    {/* Months under year */}
                                    {expandedYear === year && (
                                        <div className="divide-y divide-slate-100 bg-slate-50">
                                            {billingByYear[year]
                                                .sort((a, b) => new Date(b.billing_date) - new Date(a.billing_date))
                                                .map((bill) => {
                                                    const month = new Date(bill.billing_date).toLocaleDateString('en-US', { month: 'long' });
                                                    return (
                                                        <div key={bill.id} className="flex items-center justify-between px-6 py-4 sm:px-8 sm:pl-16">
                                                            <div>
                                                                <p className="text-sm font-semibold text-slate-900">{month}</p>
                                                                <p className="text-xs text-slate-500 mt-1">
                                                                    Due: {formatDate(bill.due_date)}
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center gap-4">
                                                                <div className="text-right">
                                                                    <p className="text-sm font-semibold text-slate-900">
                                                                        {formatCurrency(bill.total_amount)}
                                                                    </p>
                                                                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold mt-1 ${
                                                                        bill.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                                        bill.status === 'overdue' ? 'bg-red-100 text-red-800' :
                                                                        'bg-yellow-100 text-yellow-800'
                                                                    }`}>
                                                                        {bill.status?.charAt(0).toUpperCase() + bill.status?.slice(1)}
                                                                    </span>
                                                                </div>
                                                                <Link
                                                                    href={route('user.billing.show', bill.id)}
                                                                    className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white"
                                                                >
                                                                    View
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="px-6 py-12 text-center sm:px-8">
                            <p className="text-slate-500">No billing history available</p>
                        </div>
                    )}
                </div>

                {/* Info Box */}
                <div className="mt-10 rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">📋 Billing Information</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <p className="text-xs font-semibold text-blue-600 mb-2">Payment Details</p>
                            <ul className="space-y-1 text-xs text-blue-800">
                                <li>• Billing statements generated monthly</li>
                                <li>• Due date: 28 days from billing date</li>
                                <li>• Interest: 3% (charged upfront)</li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-blue-600 mb-2">Late Payments</p>
                            <ul className="space-y-1 text-xs text-blue-800">
                                <li>• Late payment penalty: 2%</li>
                                <li>• Applied to the failed month only</li>
                                <li>• Multiple failures may disable account</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
