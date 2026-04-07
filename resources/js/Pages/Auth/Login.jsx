import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Login" />

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
                                    href={route('register')}
                                    className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                                >
                                    Apply Now
                                </Link>
                            </div>
                        </header>

                        <main className="mt-16 flex justify-center">
                            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                                <div className="mb-8 text-center">
                                    <h2 className="text-2xl font-bold text-slate-900">Welcome Palautang</h2>
                                    <p className="text-slate-600 mt-2">Sign in to your LoanApp account</p>
                                </div>

                                {status && (
                                    <div className="mb-6 rounded-md bg-green-50 p-4 text-sm font-medium text-green-700">
                                        {status}
                                    </div>
                                )}

                                <form onSubmit={submit} className="space-y-6">
                                    <div>
                                        <InputLabel htmlFor="username" value="Username" />
                                        <TextInput
                                            id="username"
                                            type="text"
                                            name="username"
                                            value={data.username}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            minLength="6"
                                            isFocused={true}
                                            onChange={(e) => setData('username', e.target.value)}
                                        />
                                        <InputError message={errors.username} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="password" value="Password" />
                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            autoComplete="current-password"
                                            minLength="8"
                                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        <InputError message={errors.password} className="mt-2" />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center">
                                            <Checkbox
                                                name="remember"
                                                checked={data.remember}
                                                onChange={(e) =>
                                                    setData('remember', e.target.checked)
                                                }
                                            />
                                            <span className="ms-2 text-sm text-slate-600">
                                                Remember me
                                            </span>
                                        </label>

                                        {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="text-sm text-blue-600 underline hover:text-blue-800"
                                            >
                                                Forgot password?
                                            </Link>
                                        )}
                                    </div>

                                    <div className="pt-4">
                                        <PrimaryButton
                                            className="w-full justify-center bg-blue-600 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:ring-blue-500"
                                            disabled={processing}
                                        >
                                            {processing ? 'Signing in...' : 'Sign In'}
                                        </PrimaryButton>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-sm text-slate-600">
                                            Don't have an account?{' '}
                                            <Link
                                                href={route('register')}
                                                className="font-semibold text-blue-600 underline hover:text-blue-800"
                                            >
                                                Apply now
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}
