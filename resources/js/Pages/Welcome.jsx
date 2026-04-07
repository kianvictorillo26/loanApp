import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    const isAuthenticated = Boolean(auth?.user);
    const primaryUrl = isAuthenticated ? route('dashboard') : route('register');

    return (
        <>
            <Head title="LoanApp" />

            <div className="min-h-screen bg-white text-slate-900">
                <div className="relative overflow-hidden">
                    <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-sky-100 to-white" />
                    <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-200/70 blur-3xl" />
                    <div className="absolute right-0 top-40 h-64 w-64 rounded-full bg-sky-300/60 blur-3xl" />

                    <div className="mx-auto max-w-7xl px-6 pb-16 pt-8 lg:px-8">
                        <header className="flex items-center justify-between gap-6">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-blue-600 text-lg font-bold text-white">
                                    L
                                </div>
                                <span className="text-lg font-semibold tracking-tight text-slate-900">
                                    LoanApp
                                </span>
                            </div>

                            <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
                                <a href="#home" className="hover:text-slate-900">Home</a>
                                <a href="#about" className="hover:text-slate-900">About</a>
                                <a href="#contact" className="hover:text-slate-900">Contact</a>
                            </nav>

                            <div className="flex items-center gap-3">
                                <Link
                                    href={route('login')}
                                    className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
                                >
                                    Login
                                </Link>
                                <Link
                                    href={primaryUrl}
                                    className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                                >
                                    Apply Now
                                </Link>
                            </div>
                        </header>

                        <main className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                            <section id="home" className="max-w-2xl">
                                <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-700 ring-1 ring-blue-100">
                                    Fast & secure
                                </span>
                                <h1 className="mt-8 text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
                                    Fast and Easy <span className="text-blue-600">Loan Application</span>
                                </h1>
                                <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                                    Apply for a loan in minutes with a simple and secure process. Get approved faster with transparent terms and minimal requirements.
                                </p>

                                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                    <Link
                                        href={primaryUrl}
                                        className="inline-flex items-center justify-center rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                                    >
                                        Apply Now
                                    </Link>
                                    <a
                                        href="#about"
                                        className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                                    >
                                        Learn More
                                    </a>
                                </div>

                                <div className="mt-16 grid gap-4 sm:grid-cols-3">
                                    <div className="rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                                        <p className="text-3xl font-semibold text-slate-900">50K+</p>
                                        <p className="mt-2 text-sm text-slate-500">Happy Customers</p>
                                    </div>
                                    <div className="rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                                        <p className="text-3xl font-semibold text-slate-900">₱2B+</p>
                                        <p className="mt-2 text-sm text-slate-500">Loans Approved</p>
                                    </div>
                                    <div className="rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                                        <p className="text-3xl font-semibold text-slate-900">4.9★</p>
                                        <p className="mt-2 text-sm text-slate-500">Average Rating</p>
                                    </div>
                                </div>
                            </section>

                            <section className="relative">
                                <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-sky-50 px-6 py-8 shadow-xl shadow-slate-200/50 sm:px-8 sm:py-10">
                                    <div className="absolute left-8 top-8 h-24 w-24 rounded-full bg-blue-200/60 blur-3xl" />
                                    <div className="absolute -right-8 bottom-12 h-32 w-32 rounded-full bg-sky-300/50 blur-3xl" />

                                    <div className="relative grid gap-5">
                                        <div className="rounded-[1.75rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_80px_rgba(30,64,175,0.06)]">
                                            <div className="flex items-center justify-between text-sm text-slate-500">
                                                <span className="font-semibold text-slate-900">Loan Summary</span>
                                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">Fast</span>
                                            </div>
                                            <div className="mt-6 space-y-4">
                                                <div className="rounded-3xl bg-sky-50 p-4">
                                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Amount</p>
                                                    <p className="mt-2 text-2xl font-semibold text-slate-950">₱15,000</p>
                                                </div>
                                                <div className="grid gap-4 sm:grid-cols-2">
                                                    <div className="rounded-3xl bg-slate-100 p-4">
                                                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Duration</p>
                                                        <p className="mt-2 text-lg font-semibold text-slate-950">36 months</p>
                                                    </div>
                                                    <div className="rounded-3xl bg-slate-100 p-4">
                                                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Rate</p>
                                                        <p className="mt-2 text-lg font-semibold text-slate-950">7.2%</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-[1.75rem] border border-white/70 bg-white/95 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.05)]">
                                            <div className="flex items-center justify-between text-sm text-slate-500">
                                                <span className="font-semibold text-slate-900">Application Status</span>
                                                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">Ready</span>
                                            </div>
                                            <div className="mt-5 flex items-center gap-4">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-blue-600 text-white">
                                                    ✓
                                                </div>
                                                <div>
                                                    <p className="text-base font-semibold text-slate-950">Pre-approved in minutes</p>
                                                    <p className="mt-1 text-sm text-slate-500">Easy approval with minimal documentation.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between rounded-[1.75rem] border border-white/70 bg-slate-900/95 p-5 text-white shadow-[0_24px_80px_rgba(15,23,42,0.15)]">
                                            <div>
                                                <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Trusted by</p>
                                                <p className="mt-2 text-xl font-semibold">Thousands of customers</p>
                                            </div>
                                            <div className="rounded-3xl bg-slate-800 px-4 py-2 text-sm text-slate-200">4.9★ rating</div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </main>

                        <section id="about" className="mt-24 rounded-[2rem] bg-slate-50 px-6 py-14 shadow-sm sm:px-12">
                            <div className="mx-auto max-w-4xl text-center">
                                <h2 className="text-4xl font-semibold tracking-tight text-slate-950">Why Choose LoanApp?</h2>
                                <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
                                    We've designed our platform to make borrowing simple, secure, and transparent.
                                </p>
                            </div>

                            <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                                <div className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-xl transition hover:-translate-y-1">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
                                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                                        </svg>
                                    </div>
                                    <h3 className="mt-6 text-xl font-semibold text-slate-900">Quick Approval</h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        Get approved in minutes with our streamlined application process.
                                    </p>
                                </div>

                                <div className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-xl transition hover:-translate-y-1">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg">
                                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        </svg>
                                    </div>
                                    <h3 className="mt-6 text-xl font-semibold text-slate-900">Secure Process</h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        Your data is protected with industry-leading encryption and security.
                                    </p>
                                </div>

                                <div className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-xl transition hover:-translate-y-1">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg">
                                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
                                            <path d="M14 2v6h6" />
                                            <line x1="9" y1="13" x2="15" y2="13" />
                                            <line x1="9" y1="17" x2="15" y2="17" />
                                        </svg>
                                    </div>
                                    <h3 className="mt-6 text-xl font-semibold text-slate-900">Minimal Requirements</h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        Apply with just basic information. No hassle, no hidden requirements.
                                    </p>
                                </div>

                                <div className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-xl transition hover:-translate-y-1">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg">
                                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 19h16" />
                                            <path d="M4 15h10" />
                                            <path d="M4 11h8" />
                                            <path d="M4 7h6" />
                                        </svg>
                                    </div>
                                    <h3 className="mt-6 text-xl font-semibold text-slate-900">Transparent Terms</h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        Clear, upfront terms with no hidden fees or surprise charges.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section id="how-it-works" className="mt-24 rounded-[2rem] bg-white px-6 py-14 shadow-sm sm:px-12">
                            <div className="mx-auto max-w-5xl text-center">
                                <h2 className="text-4xl font-semibold tracking-tight text-slate-950">How It Works</h2>
                                <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
                                    Three simple steps to get your loan approved and funded.
                                </p>

                                <div className="relative mt-16">
                                    <div className="absolute inset-x-0 top-1/2 h-px bg-slate-200" />
                                    <div className="grid gap-8 sm:grid-cols-3">
                                        <div className="relative flex flex-col items-center text-center">
                                            <div className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-sky-600 text-white shadow-[0_30px_80px_rgba(59,130,246,0.18)]">
                                                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-semibold text-slate-950 shadow-sm">1</span>
                                                <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                    <circle cx="12" cy="7" r="4" />
                                                    <path d="M14 7h4" />
                                                    <path d="M19 7v2" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-semibold text-slate-950">Register Account</h3>
                                            <p className="mt-3 max-w-[18rem] text-sm leading-6 text-slate-600">
                                                Create your account in seconds with just your email and basic information.
                                            </p>
                                        </div>

                                        <div className="relative flex flex-col items-center text-center">
                                            <div className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-sky-600 text-white shadow-[0_30px_80px_rgba(59,130,246,0.18)]">
                                                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-semibold text-slate-950 shadow-sm">2</span>
                                                <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                                    <line x1="9" y1="15" x2="15" y2="15" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-semibold text-slate-950">Submit Application</h3>
                                            <p className="mt-3 max-w-[18rem] text-sm leading-6 text-slate-600">
                                                Fill out a simple form with your financial details and loan requirements.
                                            </p>
                                        </div>

                                        <div className="relative flex flex-col items-center text-center">
                                            <div className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-sky-600 text-white shadow-[0_30px_80px_rgba(59,130,246,0.18)]">
                                                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-semibold text-slate-950 shadow-sm">3</span>
                                                <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="12" cy="12" r="8" />
                                                    <path d="M9.5 12.5l1.5 1.5 3-3" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-semibold text-slate-950">Get Approved</h3>
                                            <p className="mt-3 max-w-[18rem] text-sm leading-6 text-slate-600">
                                                Receive instant approval and get funds transferred to your account.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-14">
                                    <p className="text-sm font-medium text-slate-500">Ready to get started?</p>
                                    <Link
                                        href={primaryUrl}
                                        className="mt-6 inline-flex rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                                    >
                                        Apply Now
                                    </Link>
                                </div>
                            </div>
                        </section>

                        <section id="testimonials" className="mt-24 px-6 py-14 sm:px-12">
                            <div className="mx-auto max-w-5xl text-center">
                                <h2 className="text-4xl font-semibold tracking-tight text-slate-950">What Our Customers Say</h2>
                                <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
                                    Join thousands of satisfied customers who&apos;ve successfully obtained loans through LoanApp.
                                </p>

                                <div className="mt-12 rounded-[2rem] border border-blue-100 bg-blue-50/80 p-8 shadow-[0_30px_80px_rgba(59,130,246,0.08)]">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-yellow-500">
                                            {[...Array(5)].map((_, index) => (
                                                <svg key={index} className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                    <path d="M12 17.75L6.16 21l1.16-6.76L2 9.98l6.84-.99L12 3.5l3.16 5.49L22 9.98l-5.32 4.26L17.84 21 12 17.75z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <p className="text-sm font-medium text-slate-500">5.0 rating</p>
                                    </div>

                                    <blockquote className="mt-8 text-left text-base italic leading-8 text-slate-700 sm:text-lg">
                                        “LoanApp made it incredibly easy to get the funding I needed for my business. The process was fast and transparent. Highly recommended!”
                                    </blockquote>

                                    <div className="mt-8 flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white shadow-lg">
                                            JM
                                        </div>
                                        <div className="text-left">
                                            <p className="font-semibold text-slate-950">John Micole Mangila</p>
                                            <p className="text-sm text-slate-500">CEO sa KAKINGS</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex items-center justify-center gap-3">
                                    <span className="h-2 w-8 rounded-full bg-blue-600" />
                                    <span className="h-2 w-2 rounded-full bg-slate-300" />
                                    <span className="h-2 w-2 rounded-full bg-slate-300" />
                                </div>

                                <div className="mt-6 flex items-center justify-center gap-3 text-slate-600">
                                    <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100">
                                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="15 18 9 12 15 6" />
                                        </svg>
                                    </button>
                                    <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100">
                                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="9 18 15 12 9 6" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </section>

                        <footer className="mt-24 border-t border-slate-200 bg-slate-50 px-6 py-16 text-slate-700 sm:px-8 lg:px-10">
                            <div className="mx-auto grid max-w-7xl gap-10 xl:grid-cols-[1.5fr_1fr_1fr_1fr_1.3fr]">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-blue-600 text-lg font-bold text-white">
                                            L
                                        </div>
                                        <span className="text-xl font-semibold text-slate-950">LoanApp</span>
                                    </div>
                                    <p className="mt-6 max-w-sm text-sm leading-6 text-slate-600">
                                        Fast and easy loan applications with transparent terms and secure processing.
                                    </p>
                                    <div className="mt-8 flex items-center gap-3">
                                        <a href="#" aria-label="Facebook" className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm transition hover:bg-slate-100">
                                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                <path d="M22 12.075C22 6.513 17.523 2 12 2S2 6.513 2 12.075c0 4.991 3.657 9.126 8.438 9.95v-7.038H7.898v-2.912h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.912h-2.33v7.038C18.343 21.201 22 17.066 22 12.075z" />
                                            </svg>
                                        </a>
                                        <a href="#" aria-label="Twitter" className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm transition hover:bg-slate-100">
                                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                <path d="M23 4.56c-.81.36-1.68.61-2.6.72a4.48 4.48 0 0 0 1.97-2.48 8.96 8.96 0 0 1-2.84 1.08 4.48 4.48 0 0 0-7.63 4.08A12.72 12.72 0 0 1 1.64 3.16a4.48 4.48 0 0 0 1.39 5.97 4.44 4.44 0 0 1-2.03-.56v.06a4.48 4.48 0 0 0 3.59 4.39 4.48 4.48 0 0 1-2.02.08 4.48 4.48 0 0 0 4.18 3.1 8.99 8.99 0 0 1-5.57 1.92c-.36 0-.72-.02-1.08-.06A12.7 12.7 0 0 0 6.88 19c8.28 0 12.81-6.86 12.81-12.81 0-.2 0-.4-.01-.6A9.16 9.16 0 0 0 23 4.56z" />
                                            </svg>
                                        </a>
                                        <a href="#" aria-label="LinkedIn" className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm transition hover:bg-slate-100">
                                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                <path d="M4.98 3.5a2.29 2.29 0 1 0 0 4.58 2.29 2.29 0 0 0 0-4.58zM3.24 8.98h3.48V21H3.24V8.98zm7.65 0h3.34v1.7h.05c.47-.9 1.62-1.85 3.33-1.85 3.56 0 4.22 2.35 4.22 5.42V21h-3.48v-5.16c0-1.23-.02-2.82-1.72-2.82-1.72 0-1.98 1.34-1.98 2.73V21h-3.47V8.98z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-slate-900">Product</h3>
                                    <ul className="mt-6 space-y-3 text-sm text-slate-600">
                                        <li><a href="#" className="hover:text-slate-900">Features</a></li>
                                        <li><a href="#" className="hover:text-slate-900">Pricing</a></li>
                                        <li><a href="#" className="hover:text-slate-900">Security</a></li>
                                        <li><a href="#" className="hover:text-slate-900">FAQ</a></li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-slate-900">Company</h3>
                                    <ul className="mt-6 space-y-3 text-sm text-slate-600">
                                        <li><a href="#" className="hover:text-slate-900">About Us</a></li>
                                        <li><a href="#" className="hover:text-slate-900">Blog</a></li>
                                        <li><a href="#" className="hover:text-slate-900">Careers</a></li>
                                        <li><a href="#" className="hover:text-slate-900">Contact</a></li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-slate-900">Legal</h3>
                                    <ul className="mt-6 space-y-3 text-sm text-slate-600">
                                        <li><a href="#" className="hover:text-slate-900">Privacy Policy</a></li>
                                        <li><a href="#" className="hover:text-slate-900">Terms of Service</a></li>
                                        <li><a href="#" className="hover:text-slate-900">Cookie Policy</a></li>
                                        <li><a href="#" className="hover:text-slate-900">Compliance</a></li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-slate-900">Contact</h3>
                                    <ul className="mt-6 space-y-4 text-sm text-slate-600">
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">✉️</span>
                                            <span>support@loanapp.com</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">📞</span>
                                            <span>+63 991 229 5594</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">📍</span>
                                            <span>Poblacion Ward 2, Minglanilla, Cebu, Philippines</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex sm:items-center sm:justify-between">
                                <p>© 2026 LoanApp. All rights reserved.</p>
                                <div className="mt-4 flex flex-wrap gap-5 sm:mt-0">
                                    <a href="#" className="hover:text-slate-900">Privacy Policy</a>
                                    <a href="#" className="hover:text-slate-900">Terms of Service</a>
                                    <a href="#" className="hover:text-slate-900">Sitemap</a>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
