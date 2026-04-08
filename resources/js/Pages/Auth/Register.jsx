import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        username: '',
        account_type: '',
        address: '',
        gender: '',
        birthday: '',
        age: '',
        email: '',
        contact_number: '',
        bank_name: '',
        bank_account_number: '',
        card_holder_name: '',
        tin_number: '',
        company_name: '',
        company_address: '',
        company_phone: '',
        position: '',
        monthly_earnings: '',
        proof_of_billing: null,
        valid_id: null,
        coe: null,
        password: '',
        password_confirmation: '',
    });

    const calculateAge = (birthday) => {
        if (!birthday) return '';
        const birthDate = new Date(birthday);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleBirthdayChange = (e) => {
        const birthday = e.target.value;
        setData('birthday', birthday);
        setData('age', calculateAge(birthday));
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />

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
                            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
                                <div className="mb-8">
                                    <div className="text-center mb-6">
                                        <h2 className="text-2xl font-bold text-slate-900">Register for LoanApp</h2>
                                        <p className="text-slate-600 mt-2">Please fill out all required information to apply for an account.</p>
                                    </div>
                                    
                                    {/* Helpful Guide Section */}
                                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                                        <p className="text-sm text-blue-900 font-semibold">📋 Quick Guide:</p>
                                        <ul className="text-sm text-blue-800 mt-2 space-y-1">
                                            <li>✓ Have your ID, bank card, and employment documents ready</li>
                                            <li>✓ Use your correct legal name as shown in your ID</li>
                                            <li>✓ Fill in all fields marked with <span className="text-red-600">*</span> (they are required)</li>
                                            <li>✓ Take your time - there's no time limit to complete the form</li>
                                            <li>✓ You can scroll down to see more sections</li>
                                        </ul>
                                    </div>
                                </div>

                                <form onSubmit={submit} encType="multipart/form-data" className="space-y-8">
                                    {/* Account Type */}
                                    <div className="bg-slate-50 p-6 rounded-lg">
                                        <h3 className="text-lg font-semibold text-slate-900 mb-4">Account Type</h3>
                                        <p className="text-sm text-slate-600 mb-4 bg-white p-3 rounded border-l-4 border-blue-400">
                                            Choose the account type that suits your needs. Both types allow you to apply for loans with LoanApp.
                                        </p>
                                        <div>
                                            <InputLabel htmlFor="account_type" value="Select Account Type" />
                                            <select
                                                id="account_type"
                                                name="account_type"
                                                value={data.account_type}
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                onChange={(e) => setData('account_type', e.target.value)}
                                                required
                                            >
                                                <option value="">Select Account Type</option>
                                                <option value="Basic">Basic (Unlimited slots)</option>
                                                <option value="Premium">Premium (Limited to 50 users)</option>
                                            </select>
                                            <InputError message={errors.account_type} className="mt-2" />
                                        </div>
                                    </div>

                                    {/* Personal Information */}
                                    <div className="bg-slate-50 p-6 rounded-lg">
                                        <h3 className="text-lg font-semibold text-slate-900 mb-4">Personal Information</h3>
                                        <p className="text-sm text-slate-600 mb-4 bg-white p-3 rounded border-l-4 border-green-400">
                                            Please provide your complete personal details as shown in your official documents (ID, birth certificate, etc.).
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <InputLabel htmlFor="name" value="Full Name" />
                                                <TextInput
                                                    id="name"
                                                    name="name"
                                                    value={data.name}
                                                    className="mt-1 block w-full"
                                                    autoComplete="name"
                                                    isFocused={true}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    required
                                                />
                                                <InputError message={errors.name} className="mt-2" />
                                            </div>

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
                                                    placeholder="e.g., john_doe77"
                                                    onChange={(e) => setData('username', e.target.value)}
                                                    required
                                                />
                                                <p className="text-xs text-gray-500 mt-1">💡 At least 6 characters. Use letters, numbers, and underscores only</p>
                                                <InputError message={errors.username} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="email" value="Email Address" />
                                                <TextInput
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    value={data.email}
                                                    className="mt-1 block w-full"
                                                    autoComplete="email"
                                                    placeholder="e.g., yourname@gmail.com"
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    required
                                                />
                                                <p className="text-xs text-gray-500 mt-1">💡 We'll use this to send you updates about your loan application</p>
                                                <InputError message={errors.email} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="contact_number" value="Contact Number" />
                                                <TextInput
                                                    id="contact_number"
                                                    type="text"
                                                    name="contact_number"
                                                    value={data.contact_number}
                                                    className="mt-1 block w-full"
                                                    placeholder="e.g., 09123456789 or +639123456789"
                                                    onChange={(e) => setData('contact_number', e.target.value)}
                                                    required
                                                />
                                                <InputError message={errors.contact_number} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="gender" value="Gender" />
                                                <select
                                                    id="gender"
                                                    name="gender"
                                                    value={data.gender}
                                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                    onChange={(e) => setData('gender', e.target.value)}
                                                >
                                                    <option value="">Select Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                <InputError message={errors.gender} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="birthday" value="Date of Birth" />
                                                <TextInput
                                                    id="birthday"
                                                    type="date"
                                                    name="birthday"
                                                    value={data.birthday}
                                                    className="mt-1 block w-full"
                                                    onChange={handleBirthdayChange}
                                                    required
                                                />
                                                <p className="text-xs text-gray-500 mt-1">💡 Click the calendar icon to select your date. Your age will calculate automatically</p>
                                                <InputError message={errors.birthday} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="age" value="Age" />
                                                <TextInput
                                                    id="age"
                                                    type="number"
                                                    name="age"
                                                    value={data.age}
                                                    className="mt-1 block w-full"
                                                    readOnly
                                                />
                                                <InputError message={errors.age} className="mt-2" />
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <InputLabel htmlFor="address" value="Home Address" />
                                            <textarea
                                                id="address"
                                                name="address"
                                                value={data.address}
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                rows="3"
                                                placeholder="e.g., 123 Main Street, Barangay Poblacion, City, Province 1234"
                                                onChange={(e) => setData('address', e.target.value)}
                                                required
                                            />
                                            <p className="text-xs text-gray-500 mt-1">💡 Include street number, barangay, city, and zip code. This must match your ID</p>
                                            <InputError message={errors.address} className="mt-2" />
                                        </div>
                                    </div>

                                    {/* Bank Details */}
                                    <div className="bg-slate-50 p-6 rounded-lg">
                                        <h3 className="text-lg font-semibold text-slate-900 mb-4">Bank Details</h3>
                                        <p className="text-sm text-slate-600 mb-4 bg-white p-3 rounded border-l-4 border-purple-400">
                                            Provide your bank account information. This is where we'll transfer the loan amount to you. Make sure all details match your bank card.
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <InputLabel htmlFor="bank_name" value="Bank Name" />
                                                <TextInput
                                                    id="bank_name"
                                                    name="bank_name"
                                                    value={data.bank_name}
                                                    className="mt-1 block w-full"
                                                    placeholder="e.g., BDO, BPI, Metrobank"
                                                    onChange={(e) => setData('bank_name', e.target.value)}
                                                    required
                                                />
                                                <p className="text-xs text-gray-500 mt-1">💡 Look at your bank card or passbook to find this</p>
                                                <InputError message={errors.bank_name} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="bank_account_number" value="Bank Account Number" />
                                                <TextInput
                                                    id="bank_account_number"
                                                    name="bank_account_number"
                                                    value={data.bank_account_number}
                                                    className="mt-1 block w-full"
                                                    placeholder="e.g., 00011223344556"
                                                    onChange={(e) => setData('bank_account_number', e.target.value)}
                                                    required
                                                />
                                                <p className="text-xs text-gray-500 mt-1">💡 Usually 10-16 digits found at the bottom of your bank card</p>
                                                <InputError message={errors.bank_account_number} className="mt-2" />
                                            </div>

                                            <div className="md:col-span-2">
                                                <InputLabel htmlFor="card_holder_name" value="Card Holder's Name" />
                                                <TextInput
                                                    id="card_holder_name"
                                                    name="card_holder_name"
                                                    value={data.card_holder_name}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) => setData('card_holder_name', e.target.value)}
                                                    required
                                                />
                                                <p className="text-sm text-amber-600 mt-1">⚠️ Please ensure the card holder's name is correct to avoid transaction interruptions.</p>
                                                <InputError message={errors.card_holder_name} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="tin_number" value="TIN Number (Tax ID)" />
                                                <TextInput
                                                    id="tin_number"
                                                    name="tin_number"
                                                    value={data.tin_number}
                                                    className="mt-1 block w-full"
                                                    placeholder="e.g., 123-456-789-000"
                                                    onChange={(e) => setData('tin_number', e.target.value)}
                                                    required
                                                />
                                                <p className="text-xs text-gray-500 mt-1">💡 Your Tax ID from BIR, or your SSS/GSIS number if you don't have one</p>
                                                <InputError message={errors.tin_number} className="mt-2" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Company Information */}
                                    <div className="bg-slate-50 p-6 rounded-lg">
                                        <h3 className="text-lg font-semibold text-slate-900 mb-4">Employment Information</h3>
                                        <p className="text-sm text-slate-600 mb-4 bg-white p-3 rounded border-l-4 border-orange-400">
                                            Tell us about your job and how much you earn monthly. This helps us determine your loan amount. Please provide accurate information.
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <InputLabel htmlFor="company_name" value="Company Name" />
                                                <TextInput
                                                    id="company_name"
                                                    name="company_name"
                                                    value={data.company_name}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) => setData('company_name', e.target.value)}
                                                    required
                                                />
                                                <InputError message={errors.company_name} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="position" value="Position" />
                                                <TextInput
                                                    id="position"
                                                    name="position"
                                                    value={data.position}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) => setData('position', e.target.value)}
                                                    required
                                                />
                                                <InputError message={errors.position} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="monthly_earnings" value="Monthly Earnings" />
                                                <TextInput
                                                    id="monthly_earnings"
                                                    type="number"
                                                    name="monthly_earnings"
                                                    value={data.monthly_earnings}
                                                    className="mt-1 block w-full"
                                                    step="0.01"
                                                    placeholder="e.g., 25000.00"
                                                    onChange={(e) => setData('monthly_earnings', e.target.value)}
                                                    required
                                                />
                                                <p className="text-xs text-gray-500 mt-1">💡 Your gross monthly salary from your payslip or employment contract</p>
                                                <InputError message={errors.monthly_earnings} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="company_phone" value="Company Phone Number" />
                                                <TextInput
                                                    id="company_phone"
                                                    name="company_phone"
                                                    value={data.company_phone}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) => setData('company_phone', e.target.value)}
                                                    required
                                                />
                                                <p className="text-sm text-amber-600 mt-1">📞 Please provide a number directed to your HR to confirm employment.</p>
                                                <InputError message={errors.company_phone} className="mt-2" />
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <InputLabel htmlFor="company_address" value="Company Address" />
                                            <textarea
                                                id="company_address"
                                                name="company_address"
                                                value={data.company_address}
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                rows="3"
                                                placeholder="e.g., 456 Business Park, Makati, Metro Manila"
                                                onChange={(e) => setData('company_address', e.target.value)}
                                                required
                                            />
                                            <p className="text-xs text-gray-500 mt-1">💡 The complete physical address of your workplace</p>
                                            <InputError message={errors.company_address} className="mt-2" />
                                        </div>
                                    </div>

                                    {/* Document Uploads */}
                                    <div className="bg-slate-50 p-6 rounded-lg">
                                        <h3 className="text-lg font-semibold text-slate-900 mb-4">Required Documents</h3>
                                        <p className="text-sm text-slate-600 mb-4 bg-white p-3 rounded border-l-4 border-red-400">
                                            Upload clear photos or scans of your documents. Make sure all text is readable and the entire document is visible. You can upload PDF, JPG, or PNG files.
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <InputLabel htmlFor="proof_of_billing" value="Proof of Billing" />
                                                <input
                                                    id="proof_of_billing"
                                                    type="file"
                                                    name="proof_of_billing"
                                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                    onChange={(e) => setData('proof_of_billing', e.target.files[0])}
                                                    required
                                                />
                                                <p className="text-xs text-gray-500 mt-1">💡 Electric, water, or internet bill from the last 3 months showing your name and address</p>
                                                <InputError message={errors.proof_of_billing} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="valid_id" value="Valid ID (Primary)" />
                                                <input
                                                    id="valid_id"
                                                    type="file"
                                                    name="valid_id"
                                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                    onChange={(e) => setData('valid_id', e.target.files[0])}
                                                    required
                                                />
                                                <p className="text-xs text-gray-500 mt-1">💡 Your Driver's License, Passport, SSS, GSIS, or PRC ID (both front and back)</p>
                                                <InputError message={errors.valid_id} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="coe" value="Certificate of Employment" />
                                                <input
                                                    id="coe"
                                                    type="file"
                                                    name="coe"
                                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                    onChange={(e) => setData('coe', e.target.files[0])}
                                                    required
                                                />
                                                <p className="text-xs text-gray-500 mt-1">💡 Official letter from your company on company letterhead showing you are employed and your salary</p>
                                                <InputError message={errors.coe} className="mt-2" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="bg-slate-50 p-6 rounded-lg">
                                        <h3 className="text-lg font-semibold text-slate-900 mb-4">Account Security</h3>
                                        <p className="text-sm text-slate-600 mb-4 bg-white p-3 rounded border-l-4 border-yellow-400">
                                            Create a strong password to protect your account. Your password is private and must meet specific requirements.
                                        </p>
                                        <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4">
                                            <p className="text-sm font-semibold text-yellow-900 mb-2">✓ Your password must have:</p>
                                            <ul className="text-sm text-yellow-800 space-y-1">
                                                <li>✓ At least 8 characters long</li>
                                                <li>✓ At least one UPPERCASE letter (A-Z)</li>
                                                <li>✓ At least one lowercase letter (a-z)</li>
                                                <li>✓ At least one number (0-9)</li>
                                                <li>✓ At least one special symbol: @ $ ! % * ? &</li>
                                            </ul>
                                            <p className="text-xs text-yellow-700 mt-2">Example: <strong>MyPass@123</strong></p>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <InputLabel htmlFor="password" value="Password" />
                                                <TextInput
                                                    id="password"
                                                    type="password"
                                                    name="password"
                                                    value={data.password}
                                                    className="mt-1 block w-full"
                                                    autoComplete="new-password"
                                                    minLength="8"
                                                    placeholder="Enter your secure password"
                                                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                                                    onChange={(e) => setData('password', e.target.value)}
                                                    required
                                                />
                                                <InputError message={errors.password} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="password_confirmation"
                                                    value="Confirm Password"
                                                />
                                                <TextInput
                                                    id="password_confirmation"
                                                    type="password"
                                                    name="password_confirmation"
                                                    value={data.password_confirmation}
                                                    className="mt-1 block w-full"
                                                    autoComplete="new-password"
                                                    placeholder="Re-enter your password"
                                                    onChange={(e) =>
                                                        setData('password_confirmation', e.target.value)
                                                    }
                                                    required
                                                />
                                                <p className="text-xs text-gray-500 mt-1">💡 Type the same password again to confirm it's correct</p>
                                                <InputError
                                                    message={errors.password_confirmation}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Final Reminder */}
                                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                                        <p className="text-sm text-green-900 font-semibold">✓ Almost Done!</p>
                                        <ul className="text-sm text-green-800 mt-2 space-y-1">
                                            <li>✓ Review all information before submitting</li>
                                            <li>✓ Make sure all documents are clear and readable</li>
                                            <li>✓ Click "Submit Application" when ready</li>
                                            <li>✓ We'll review your application and contact you within 24-48 hours</li>
                                        </ul>
                                    </div>

                                    <div className="flex items-center justify-between pt-6">
                                        <Link
                                            href={route('login')}
                                            className="text-sm text-slate-600 underline hover:text-slate-900"
                                        >
                                            Already have an account? Login here
                                        </Link>

                                        <PrimaryButton className="px-8 py-3" disabled={processing}>
                                            {processing ? 'Submitting...' : 'Submit Application'}
                                        </PrimaryButton>
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
