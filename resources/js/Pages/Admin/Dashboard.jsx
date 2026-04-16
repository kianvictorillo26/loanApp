import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function AdminDashboard({ pendingUsers, pendingLoans, pendingWithdrawals, counts }) {
    const pageProps = usePage().props;
    const flash = pageProps.flash ?? {};
    const auth = pageProps.auth ?? {};
    const user = auth.user ?? {};

    const formatCurrency = (value) =>
        value !== null && value !== undefined ? Number(value).toLocaleString() : 'N/A';

    const stats = {
        pending_users: counts?.pending_users ?? 0,
        pending_loans: counts?.pending_loans ?? 0,
        pending_withdrawals: counts?.pending_withdrawals ?? 0,
        approved_users: counts?.approved_users ?? 0,
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold leading-tight text-slate-900">
                        Admin Dashboard
                    </h2>
                </div>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="mb-10 overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 to-sky-700 px-8 py-10 text-white shadow-xl shadow-slate-900/10">
                    <div className="flex flex-col gap-8">
                        <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Admin console</p>
                            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                                Welcome back, {user.name}
                            </h1>
                            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-200">
                                Manage registrations, loan approvals, savings activity, and reports from one place.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {flash?.success && (
                        <div className="mb-8 rounded-2xl border border-green-200 bg-green-50 p-6 text-green-800 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                                    ✓
                                </div>
                                {flash.success}
                            </div>
                        </div>
                    )}

                    {/* Quick Stats */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
                        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg shadow-slate-200/50">
                            <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-blue-100/60 blur-2xl" />
                            <div className="relative">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-500">Pending Users</p>
                                        <p className="mt-2 text-3xl font-bold text-slate-900">{stats.pending_users}</p>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg shadow-slate-200/50">
                            <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-sky-100/60 blur-2xl" />
                            <div className="relative">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-500">Pending Loans</p>
                                        <p className="mt-2 text-3xl font-bold text-slate-900">{stats.pending_loans}</p>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg shadow-slate-200/50">
                            <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-emerald-100/60 blur-2xl" />
                            <div className="relative">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-500">Pending Withdrawals</p>
                                        <p className="mt-2 text-3xl font-bold text-slate-900">{stats.pending_withdrawals}</p>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg shadow-slate-200/50">
                            <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-purple-100/60 blur-2xl" />
                            <div className="relative">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-500">Approved Users</p>
                                        <p className="mt-2 text-3xl font-bold text-slate-900">{stats.approved_users}</p>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mb-10">
                        <h3 className="mb-6 text-lg font-semibold text-slate-900">Quick Actions</h3>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                            <Link
                                href={route('admin.users.index')}
                                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg shadow-slate-200/50 transition-all hover:shadow-xl hover:shadow-blue-200/50 hover:-translate-y-1"
                            >
                                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-blue-100/60 blur-2xl transition group-hover:bg-blue-200/60" />
                                <div className="relative text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-100 text-3xl transition group-hover:bg-blue-200">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                        </svg>
                                    </div>
                                    <p className="font-semibold text-slate-900">Manage Users</p>
                                    <p className="mt-1 text-sm text-slate-500">View & edit all users</p>
                                </div>
                            </Link>
                            <Link
                                href={route('admin.loans.index')}
                                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg shadow-slate-200/50 transition-all hover:shadow-xl hover:shadow-sky-200/50 hover:-translate-y-1"
                            >
                                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-sky-100/60 blur-2xl transition group-hover:bg-sky-200/60" />
                                <div className="relative text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-sky-100 text-3xl transition group-hover:bg-sky-200">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                    </div>
                                    <p className="font-semibold text-slate-900">Loan Management</p>
                                    <p className="mt-1 text-sm text-slate-500">Approve/reject loans</p>
                                </div>
                            </Link>
                            <Link
                                href={route('admin.savings.index')}
                                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg shadow-slate-200/50 transition-all hover:shadow-xl hover:shadow-emerald-200/50 hover:-translate-y-1"
                            >
                                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-emerald-100/60 blur-2xl transition group-hover:bg-emerald-200/60" />
                                <div className="relative text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 text-3xl transition group-hover:bg-emerald-200">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <p className="font-semibold text-slate-900">Savings Management</p>
                                    <p className="mt-1 text-sm text-slate-500">Handle withdrawals</p>
                                </div>
                            </Link>
                            <Link
                                href={route('admin.distribute-premium-income')}
                                method="post"
                                as="button"
                                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg shadow-slate-200/50 transition-all hover:shadow-xl hover:shadow-amber-200/50 hover:-translate-y-1"
                            >
                                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-amber-100/60 blur-2xl transition group-hover:bg-amber-200/60" />
                                <div className="relative text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-amber-100 text-3xl transition group-hover:bg-amber-200">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <p className="font-semibold text-slate-900">Distribute Premium Income</p>
                                    <p className="mt-1 text-sm text-slate-500">Add bonus to approved Premium users</p>
                                </div>
                            </Link>
                            <Link
                                href="#pending-registrations"
                                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg shadow-slate-200/50 transition-all hover:shadow-xl hover:shadow-purple-200/50 hover:-translate-y-1"
                            >
                                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-purple-100/60 blur-2xl transition group-hover:bg-purple-200/60" />
                                <div className="relative text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-purple-100 text-3xl transition group-hover:bg-purple-200">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <p className="font-semibold text-slate-900">Pending Registrations</p>
                                    <p className="mt-1 text-sm text-slate-500">Review new users</p>
                                </div>
                            </Link>
                            <Link
                                href={route('admin.reports.index')}
                                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg shadow-slate-200/50 transition-all hover:shadow-xl hover:shadow-indigo-200/50 hover:-translate-y-1"
                            >
                                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-indigo-100/60 blur-2xl transition group-hover:bg-indigo-200/60" />
                                <div className="relative text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-100 text-3xl transition group-hover:bg-indigo-200">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <p className="font-semibold text-slate-900">Reports</p>
                                    <p className="mt-1 text-sm text-slate-500">View analytics</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Pending Registrations */}
                    <div id="pending-registrations" className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-xl shadow-slate-200/50">
                        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-100/60 blur-3xl" />
                        <div className="relative px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-blue-50/80 to-slate-50/80">
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900">Pending Registrations</h3>
                                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                                    {pendingUsers.length}
                                </span>
                            </div>
                        </div>
                        <div className="relative p-8">
                            {pendingUsers.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-600">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-slate-600">All caught up! No pending registrations at the moment.</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {pendingUsers.map((user) => (
                                        <div key={user.id} className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50">
                                            <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-blue-100/60 blur-2xl" />
                                            <div className="relative">
                                                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                                                    <div className="flex-1">
                                                        <div className="mb-4">
                                                            <h4 className="text-lg font-semibold text-slate-900">{user.name}</h4>
                                                            <p className="text-sm text-slate-500">{user.email}</p>
                                                            <p className="text-sm text-slate-500">Username: {user.username}</p>
                                                        </div>
                                                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                                            <div className="rounded-2xl bg-slate-50 p-4">
                                                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Account Type</p>
                                                                <p className="mt-1 text-sm font-medium text-slate-900">{user.account_type}</p>
                                                            </div>
                                                            <div className="rounded-2xl bg-slate-50 p-4">
                                                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Phone</p>
                                                                <p className="mt-1 text-sm font-medium text-slate-900">{user.contact_number}</p>
                                                            </div>
                                                            <div className="rounded-2xl bg-slate-50 p-4">
                                                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">TIN</p>
                                                                <p className="mt-1 text-sm font-medium text-slate-900">{user.tin_number}</p>
                                                            </div>
                                                        </div>
                                                        {user.company_name && (
                                                            <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                                                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Company</p>
                                                                <p className="mt-1 text-sm font-medium text-slate-900">{user.company_name}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col gap-3 lg:min-w-[200px]">
                                                        <Link
                                                            href={route('admin.users.approve', user.id)}
                                                            method="post"
                                                            as="button"
                                                            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/25 transition hover:from-green-600 hover:to-green-700 hover:shadow-xl hover:shadow-green-500/30"
                                                        >
                                                            <span className="mr-2">✓</span>
                                                            Approve
                                                        </Link>
                                                        <Link
                                                            href={route('admin.users.reject', user.id)}
                                                            method="post"
                                                            as="button"
                                                            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/25 transition hover:from-red-600 hover:to-red-700 hover:shadow-xl hover:shadow-red-500/30"
                                                            onClick={(e) => {
                                                                const reason = prompt('Rejection reason:');
                                                                if (reason) {
                                                                    e.currentTarget.href += '?reason=' + encodeURIComponent(reason);
                                                                } else {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                        >
                                                            <span className="mr-2">✗</span>
                                                            Reject
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pending Loans */}
                    {pendingLoans.length > 0 && (
                        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-xl shadow-slate-200/50">
                            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-sky-100/60 blur-3xl" />
                            <div className="relative px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-sky-50/80 to-slate-50/80">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-900">Pending Loans</h3>
                                    <span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">
                                        {pendingLoans.length}
                                    </span>
                                </div>
                            </div>
                            <div className="relative p-8">
                                <div className="space-y-6">
                                    {pendingLoans.map((loan) => (
                                        <div key={loan.id} className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50">
                                            <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-sky-100/60 blur-2xl" />
                                            <div className="relative">
                                                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                                                    <div className="flex-1">
                                                        <div className="mb-4">
                                                            <h4 className="text-lg font-semibold text-slate-900">{loan.user.name}</h4>
                                                            <p className="text-sm text-slate-500">{loan.user.email}</p>
                                                        </div>
                                                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                                            <div className="rounded-2xl bg-slate-50 p-4">
                                                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Amount</p>
                                                                <p className="mt-1 text-lg font-bold text-slate-900">₱{formatCurrency(loan.amount)}</p>
                                                            </div>
                                                            <div className="rounded-2xl bg-slate-50 p-4">
                                                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Term</p>
                                                                <p className="mt-1 text-sm font-medium text-slate-900">{loan.term} months</p>
                                                            </div>
                                                            <div className="rounded-2xl bg-slate-50 p-4">
                                                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Purpose</p>
                                                                <p className="mt-1 text-sm font-medium text-slate-900">{loan.purpose || 'Not specified'}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-3 lg:min-w-[200px]">
                                                        <Link
                                                            href={route('admin.loans.approve', loan.id)}
                                                            method="post"
                                                            as="button"
                                                            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/25 transition hover:from-green-600 hover:to-green-700 hover:shadow-xl hover:shadow-green-500/30"
                                                        >
                                                            <span className="mr-2">✓</span>
                                                            Approve
                                                        </Link>
                                                        <Link
                                                            href={route('admin.loans.reject', loan.id)}
                                                            method="post"
                                                            as="button"
                                                            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/25 transition hover:from-red-600 hover:to-red-700 hover:shadow-xl hover:shadow-red-500/30"
                                                        >
                                                            <span className="mr-2">✗</span>
                                                            Reject
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Pending Withdrawals */}
                    {pendingWithdrawals.length > 0 && (
                        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-xl shadow-slate-200/50">
                            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-100/60 blur-3xl" />
                            <div className="relative px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-emerald-50/80 to-slate-50/80">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-900">Pending Withdrawals</h3>
                                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                                        {pendingWithdrawals.length}
                                    </span>
                                </div>
                            </div>
                            <div className="relative p-8">
                                <div className="space-y-6">
                                    {pendingWithdrawals.map((transaction) => (
                                        <div key={transaction.id} className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50">
                                            <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-emerald-100/60 blur-2xl" />
                                            <div className="relative">
                                                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                                                    <div className="flex-1">
                                                        <div className="mb-4">
                                                            <h4 className="text-lg font-semibold text-slate-900">{transaction.user.name}</h4>
                                                            <p className="text-sm text-slate-500">{transaction.user.email}</p>
                                                        </div>
                                                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                                            <div className="rounded-2xl bg-slate-50 p-4">
                                                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Amount</p>
                                                                <p className="mt-1 text-lg font-bold text-slate-900">₱{formatCurrency(transaction.amount)}</p>
                                                            </div>
                                                            <div className="rounded-2xl bg-slate-50 p-4">
                                                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Account</p>
                                                                <p className="mt-1 text-sm font-medium text-slate-900">{transaction.savings?.account_number}</p>
                                                            </div>
                                                            <div className="rounded-2xl bg-slate-50 p-4">
                                                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Current Balance</p>
                                                                <p className="mt-1 text-sm font-medium text-slate-900">₱{formatCurrency(transaction.savings?.balance)}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-3 lg:min-w-[200px]">
                                                        <Link
                                                            href={route('admin.withdrawals.approve', transaction.id)}
                                                            method="post"
                                                            as="button"
                                                            className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/25 transition hover:from-green-600 hover:to-green-700 hover:shadow-xl hover:shadow-green-500/30"
                                                        >
                                                            <span className="mr-2">✓</span>
                                                            Approve
                                                        </Link>
                                                        <Link
                                                            href={route('admin.withdrawals.reject', transaction.id)}
                                                            method="post"
                                                            as="button"
                                                            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/25 transition hover:from-red-600 hover:to-red-700 hover:shadow-xl hover:shadow-red-500/30"
                                                        >
                                                            <span className="mr-2">✗</span>
                                                            Reject
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
