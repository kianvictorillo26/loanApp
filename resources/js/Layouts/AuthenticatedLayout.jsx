import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const pageProps = usePage().props;
    const user = pageProps.auth?.user ?? {};

    const [sidebarExpanded, setSidebarExpanded] = useState(false);

    const mainLinks = [
        {
            name: 'Dashboard',
            href: user.is_admin ? route('admin.dashboard') : route('dashboard'),
            active: user.is_admin
                ? route().current('admin.dashboard')
                : route().current('dashboard'),
            icon: (
                <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M3 12l2-2 4 4 8-8 4 4v8H3z" />
                </svg>
            ),
        },
    ];

    if (user.is_admin) {
        mainLinks.push(
            {
                name: 'Users',
                href: route('admin.users.index'),
                active: route().current('admin.users.*'),
                icon: (
                    <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 00-3-3.87" />
                        <path d="M16 3.13a4 4 0 010 7.75" />
                    </svg>
                ),
            },
            {
                name: 'Loans',
                href: route('admin.loans.index'),
                active: route().current('admin.loans.*'),
                icon: (
                    <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M4 19h16" />
                        <path d="M6 15l6-6 6 6" />
                        <path d="M12 3v12" />
                    </svg>
                ),
            },
            {
                name: 'Savings',
                href: route('admin.savings.index'),
                active: route().current('admin.savings.*'),
                icon: (
                    <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M4 6h16" />
                        <path d="M4 12h16" />
                        <path d="M4 18h16" />
                    </svg>
                ),
            },
            {
                name: 'Withdrawals',
                href: route('admin.withdrawals.index'),
                active: route().current('admin.withdrawals.*'),
                icon: (
                    <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 3v12" />
                        <path d="M8 11l4 4 4-4" />
                        <path d="M4 21h16" />
                    </svg>
                ),
            },
            {
                name: 'Reports',
                href: route('admin.reports.index'),
                active: route().current('admin.reports.*'),
                icon: (
                    <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M4 4h16v16H4z" />
                        <path d="M8 12h8" />
                        <path d="M8 16h5" />
                    </svg>
                ),
            },
        );
    } else {
        // User links
        mainLinks.push(
            {
                name: 'Loans',
                href: route('user.loans.index'),
                active: route().current('user.loans.*'),
                icon: (
                    <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                ),
            },
            {
                name: 'Billing',
                href: route('user.billing.index'),
                active: route().current('user.billing.*'),
                icon: (
                    <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                ),
            },
            ...(user.account_type?.toLowerCase() === 'premium' ? [
                {
                    name: 'Savings',
                    href: route('user.savings.index'),
                    active: route().current('user.savings.index'),
                    icon: (
                        <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M4 7h16M4 12h16M4 17h16" />
                        </svg>
                    ),
                },
            ] : []),
            {
                name: 'Transactions',
                href: route('user.transactions.index'),
                active: route().current('user.transactions.*'),
                icon: (
                    <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                ),
            },
        );
    }

    return (
        <div className="min-h-screen bg-slate-100">
            <div className="lg:flex lg:min-h-screen">
                <aside 
                    className={`hidden lg:flex lg:flex-col lg:bg-slate-900 lg:py-8 lg:gap-6 sticky top-0 left-0 h-screen transition-all duration-300 ${sidebarExpanded ? 'lg:w-56 lg:px-4' : 'lg:w-20 lg:px-3'}`}
                    onMouseEnter={() => setSidebarExpanded(true)}
                    onMouseLeave={() => setSidebarExpanded(false)}
                >
                    <div className="flex items-center justify-center">
                        <Link href="/" className="inline-flex items-center justify-center">
                            <ApplicationLogo className="h-12 w-12 rounded-3xl bg-white p-2 object-contain shadow-lg shadow-slate-900/10" />
                        </Link>
                    </div>

                    <nav className="space-y-2 flex-1">
                        {mainLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`flex items-center gap-3 h-12 rounded-2xl px-3 transition-all ${
                                    link.active
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                                }`}
                            >
                                <div className="flex-shrink-0">
                                    {link.icon}
                                </div>
                                <span className={`text-sm font-medium whitespace-nowrap overflow-hidden transition-opacity duration-300 ${sidebarExpanded ? 'opacity-100' : 'opacity-0'}`}>
                                    {link.name}
                                </span>
                            </Link>
                        ))}
                    </nav>

                    <div className="border-t border-slate-700 pt-4 space-y-2">
                        <Link
                            href={route('profile.edit')}
                            className="flex items-center gap-3 h-12 rounded-2xl px-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all"
                        >
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="8" r="4" />
                                    <path d="M6 20.293v-1.293a6 6 0 0112 0v1.293" />
                                </svg>
                            </div>
                            <span className={`text-sm font-medium whitespace-nowrap overflow-hidden transition-opacity duration-300 ${sidebarExpanded ? 'opacity-100' : 'opacity-0'}`}>
                                Profile
                            </span>
                        </Link>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="w-full flex items-center gap-3 h-12 rounded-2xl px-3 text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-all"
                        >
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                            </div>
                            <span className={`text-sm font-medium whitespace-nowrap overflow-hidden transition-opacity duration-300 ${sidebarExpanded ? 'opacity-100' : 'opacity-0'}`}>
                                Log Out
                            </span>
                        </Link>
                    </div>
                </aside>

                <div className="flex-1">
                    <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div>
                                    <p className="text-sm font-semibold text-slate-700">Welcome back</p>
                                </div>
                            </div>

                        </div>
                    </header>

                    {header && (
                        <div className="bg-slate-50 px-4 py-4 sm:px-6 lg:px-8">
                            <div className="mx-auto max-w-7xl">{header}</div>
                        </div>
                    )}

                    <main className="px-4 py-8 sm:px-6 lg:px-8">{children}</main>
                </div>
            </div>
        </div>
    );
}
