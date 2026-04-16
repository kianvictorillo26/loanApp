import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function ShowUser({ user, billing }) {
    const formatCurrency = (value) =>
        value !== null && value !== undefined ? Number(value).toLocaleString('en-US', { style: 'currency', currency: 'PHP' }) : '₱0.00';

    const formatDate = (dateString) => {
        return dateString ? new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A';
    };

    const getStorageUrl = (path) => {
        if (!path) return null;
        return path.startsWith('http') ? path : `/storage/${path}`;
    };

    const renderDocumentPreview = (label, path) => {
        const url = getStorageUrl(path);

        return (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold text-slate-500 uppercase mb-3">{label}</p>
                {!url ? (
                    <p className="text-sm text-slate-500">No file uploaded</p>
                ) : path.toLowerCase().endsWith('.pdf') ? (
                    <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                    >
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 text-xs font-bold">PDF</span>
                        View PDF Document
                    </a>
                ) : (
                    <a href={url} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                        <img src={url} alt={label} className="h-48 w-full object-contain bg-slate-100" />
                    </a>
                )}
            </div>
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-4-4h-2M9 20H4v-1a6 6 0 014-4h1M16 11a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold leading-tight text-slate-900">
                        User Details
                    </h2>
                </div>
            }
        >
            <Head title="User Details" />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-12">
                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold text-slate-500 uppercase">Account Status</p>
                                <p className="mt-2 text-xl font-bold text-slate-900">{user.status}</p>
                            </div>
                            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                user.status === 'approved' ? 'bg-green-100 text-green-800' :
                                user.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                            }`}>
                                {user.status?.charAt(0).toUpperCase() + user.status?.slice(1)}
                            </span>
                        </div>

                        <div className="mt-8 space-y-4 text-sm text-slate-600">
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase">Name</p>
                                <p className="mt-1 text-slate-900">{user.name}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase">Email</p>
                                <p className="mt-1 text-slate-900">{user.email}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase">Username</p>
                                <p className="mt-1 text-slate-900">{user.username}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase">Account Type</p>
                                <p className="mt-1 text-slate-900">{user.account_type}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase">Created</p>
                                <p className="mt-1 text-slate-900">{formatDate(user.created_at)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50 lg:col-span-2">
                        <div className="grid gap-6 sm:grid-cols-3">
                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                                <p className="text-xs font-semibold text-slate-500 uppercase">Loans</p>
                                <p className="mt-4 text-3xl font-bold text-slate-900">{user.loans.length}</p>
                            </div>
                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                                <p className="text-xs font-semibold text-slate-500 uppercase">Savings</p>
                                <p className="mt-4 text-3xl font-bold text-slate-900">{formatCurrency(user.savings?.balance ?? 0)}</p>
                            </div>
                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                                <p className="text-xs font-semibold text-slate-500 uppercase">Transactions</p>
                                <p className="mt-4 text-3xl font-bold text-slate-900">{user.transactions.length}</p>
                            </div>
                        </div>

                        {billing && (
                            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                <h3 className="text-lg font-semibold text-slate-900">Current Billing</h3>
                                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase">Billing Date</p>
                                        <p className="mt-1 text-slate-900">{formatDate(billing.billing_date)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase">Due Date</p>
                                        <p className="mt-1 text-slate-900">{formatDate(billing.due_date)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase">Total Due</p>
                                        <p className="mt-1 text-slate-900">{formatCurrency(billing.total_amount)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase">Status</p>
                                        <p className="mt-1 text-slate-900 capitalize">{billing.status}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-slate-900">Application Details</h3>
                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase">Gender</p>
                                    <p className="mt-1 text-slate-900">{user.gender || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase">Birthday</p>
                                    <p className="mt-1 text-slate-900">{formatDate(user.birthday)}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase">Age</p>
                                    <p className="mt-1 text-slate-900">{user.age || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase">Contact Number</p>
                                    <p className="mt-1 text-slate-900">{user.contact_number || 'N/A'}</p>
                                </div>
                                <div className="sm:col-span-2">
                                    <p className="text-xs font-semibold text-slate-500 uppercase">Home Address</p>
                                    <p className="mt-1 text-slate-900">{user.address || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase">Bank Name</p>
                                    <p className="mt-1 text-slate-900">{user.bank_name || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase">Bank Account Number</p>
                                    <p className="mt-1 text-slate-900">{user.bank_account_number || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase">Card Holder Name</p>
                                    <p className="mt-1 text-slate-900">{user.card_holder_name || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase">TIN Number</p>
                                    <p className="mt-1 text-slate-900">{user.tin_number || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase">Employer</p>
                                    <p className="mt-1 text-slate-900">{user.company_name || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase">Position</p>
                                    <p className="mt-1 text-slate-900">{user.position || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase">Company Phone</p>
                                    <p className="mt-1 text-slate-900">{user.company_phone || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase">Monthly Earnings</p>
                                    <p className="mt-1 text-slate-900">{formatCurrency(user.monthly_earnings)}</p>
                                </div>
                                <div className="sm:col-span-2">
                                    <p className="text-xs font-semibold text-slate-500 uppercase">Company Address</p>
                                    <p className="mt-1 text-slate-900">{user.company_address || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-slate-900">Uploaded Documents</h3>
                            <div className="mt-6 grid gap-4 lg:grid-cols-3">
                                {renderDocumentPreview('Proof of Billing', user.proof_of_billing)}
                                {renderDocumentPreview('Valid ID (Primary)', user.valid_id)}
                                {renderDocumentPreview('Certificate of Employment', user.coe)}
                            </div>
                        </div>

                        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                            <div className="border-b border-slate-200 px-6 py-4 bg-slate-50">
                                <h3 className="text-lg font-semibold text-slate-900">Loan History</h3>
                            </div>
                            <div className="p-6">
                                {user.loans.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-slate-200">
                                            <thead className="bg-slate-50">
                                                <tr>
                                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Amount</th>
                                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Term</th>
                                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Created</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-200 bg-white">
                                                {user.loans.map((loan) => (
                                                    <tr key={loan.id} className="hover:bg-slate-50">
                                                        <td className="px-4 py-4 text-sm text-slate-900">{formatCurrency(loan.amount)}</td>
                                                        <td className="px-4 py-4 text-sm text-slate-900">{loan.term_months || loan.term} months</td>
                                                        <td className="px-4 py-4 text-sm text-slate-900 capitalize">{loan.status}</td>
                                                        <td className="px-4 py-4 text-sm text-slate-500">{formatDate(loan.created_at)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <p className="text-sm text-slate-500">No loans found for this user.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                    <Link
                        href={route('admin.users.index')}
                        className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                        Back to Users
                    </Link>
                    <Link
                        href={route('admin.users.block-email', user.id)}
                        method="post"
                        as="button"
                        className="inline-flex items-center justify-center rounded-2xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                    >
                        Block Email
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
