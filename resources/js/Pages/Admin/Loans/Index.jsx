import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';

export default function LoansIndex({ loans }) {
    const { data, setData, post, processing, errors } = useForm({
        interest_rate: '',
        term_months: '',
        reason: '',
    });
    const [rejectReasons, setRejectReasons] = useState({});

    const handleRejectReasonChange = (loanId, value) => {
        setRejectReasons((prev) => ({
            ...prev,
            [loanId]: value,
        }));
    };

    const approveLoan = (loanId) => {
        if (!data.interest_rate || !data.term_months) {
            alert('Please enter both interest rate and term months before approving a loan.');
            return;
        }

        post(route('admin.loans.approve', loanId), {
            data: {
                interest_rate: data.interest_rate,
                term_months: data.term_months,
            },
            preserveScroll: true,
            onSuccess: () => {
                setData('interest_rate', '');
                setData('term_months', '');
                router.reload();
            },
            onError: () => {
                alert('Unable to approve loan. Please check the values and try again.');
            },
        });
    };

    const rejectLoan = (loanId) => {
        const reason = (rejectReasons[loanId] ?? '').trim();

        if (!reason) {
            alert('Please enter a rejection reason before rejecting this loan.');
            return;
        }

        router.post(route('admin.loans.reject', loanId), { reason }, {
            preserveScroll: true,
            onSuccess: () => {
                setRejectReasons((prev) => ({
                    ...prev,
                    [loanId]: '',
                }));
                router.reload();
            },
            onError: (errors) => {
                const message = errors.reason ? errors.reason : 'Unable to reject loan. Please try again.';
                alert(message);
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-600 text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold leading-tight text-slate-900">
                        Loan Management
                    </h2>
                </div>
            }
        >
            <Head title="Loan Management" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Loan Approval Settings */}
                    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-xl shadow-slate-200/50 mb-8">
                        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-sky-100/60 blur-3xl" />
                        <div className="relative px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-sky-50/80 to-slate-50/80">
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0a1.724 1.724 0 002.573 1.05 1.724 1.724 0 012.573 1.05c.3.921 1.604.921 1.903 0a1.724 1.724 0 012.573 1.05 1.724 1.724 0 01-1.76 2.691c-.92.3-.92 1.604 0 1.903a1.724 1.724 0 011.05 2.573 1.724 1.724 0 01-1.05 2.573c-.921.3-.921 1.604 0 1.903a1.724 1.724 0 01-1.05 2.573c-.921.3-1.604-.3-1.903-1.222a1.724 1.724 0 00-2.573-1.05 1.724 1.724 0 00-2.573 1.05c-.3.921-1.604 1.522-2.525 1.222a1.724 1.724 0 01-2.573-1.05 1.724 1.724 0 011.05-2.573c.921-.3.921-1.604 0-1.903a1.724 1.724 0 01-1.05-2.573 1.724 1.724 0 011.05-2.573c.921-.3 1.604.3 1.903 1.222a1.724 1.724 0 002.573 1.05 1.724 1.724 0 002.573-1.05z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900">Loan Approval Settings</h3>
                            </div>
                        </div>
                        <div className="relative p-8">
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700">
                                        Interest Rate (%)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={data.interest_rate}
                                        onChange={(e) => setData('interest_rate', e.target.value)}
                                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-sky-500 focus:ring-sky-500 transition"
                                        placeholder="e.g., 12.5"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700">
                                        Term (Months)
                                    </label>
                                    <input
                                        type="number"
                                        value={data.term_months}
                                        onChange={(e) => setData('term_months', e.target.value)}
                                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-sky-500 focus:ring-sky-500 transition"
                                        placeholder="e.g., 12"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Loans Table */}
                    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-xl shadow-slate-200/50">
                        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-sky-100/60 blur-3xl" />
                        <div className="relative">
                            <div className="px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-sky-50/80 to-slate-50/80">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 17h3V7H4v10zm5 0h3V3H9v14zm5 0h3V11h-3v6z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-semibold text-slate-900">All Loans</h3>
                                        <span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">
                                            {loans.data.length}
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
                                                    Applicant
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                    Amount
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                    Term
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                    Purpose
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200 bg-white">
                                            {loans.data.map((loan) => (
                                                <tr key={loan.id} className="hover:bg-slate-50 transition">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-600 font-semibold">
                                                                {loan.user.name.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-semibold text-slate-900">{loan.user.name}</div>
                                                                <div className="text-sm text-slate-500">{loan.user.email}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                                        <span className="text-lg font-bold">₱{loan.amount.toLocaleString()}</span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                                        {loan.term} months
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                                                            loan.status === 'approved'
                                                                ? 'bg-green-100 text-green-800'
                                                                : loan.status === 'rejected'
                                                                ? 'bg-red-100 text-red-800'
                                                                : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                            {loan.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-slate-900 max-w-xs truncate">
                                                        {loan.purpose || 'Not specified'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        {loan.status === 'pending' && (
                                                            <div className="space-y-2">
                                                                <div className="flex items-center gap-3">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => approveLoan(loan.id)}
                                                                        className="inline-flex items-center rounded-2xl bg-green-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-green-700 transition disabled:opacity-50"
                                                                        disabled={processing}
                                                                    >
                                                                        ✓ Approve
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => rejectLoan(loan.id)}
                                                                        className="inline-flex items-center rounded-2xl bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-red-700 transition disabled:opacity-50"
                                                                        disabled={processing || !(rejectReasons[loan.id] ?? '').trim()}
                                                                    >
                                                                        ✗ Reject
                                                                    </button>
                                                                </div>
                                                                <input
                                                                    type="text"
                                                                    value={rejectReasons[loan.id] ?? ''}
                                                                    onChange={(e) => handleRejectReasonChange(loan.id, e.target.value)}
                                                                    placeholder="Rejection reason"
                                                                    className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 focus:border-red-500 focus:ring-red-500 transition"
                                                                />
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                {loans.links && loans.links.length > 3 && (
                                    <div className="mt-8 flex items-center justify-center gap-2">
                                        {loans.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url}
                                                className={`inline-flex items-center rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                                                    link.active
                                                        ? 'bg-sky-600 text-white shadow-lg shadow-sky-500/25'
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
                </div>
            </div>
        </AuthenticatedLayout>
    );
}