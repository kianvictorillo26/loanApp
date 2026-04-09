import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function CreateLoan() {
    const { data, setData, post, processing, errors } = useForm({
        amount: '',
        term: '1',
        purpose: '',
    });

    const [calculatedValues, setCalculatedValues] = useState({
        interest: 0,
        netReceived: 0,
        monthlyPayment: 0,
    });

    const formattedCurrency = (value) =>
        value !== null && value !== undefined ? Number(value).toLocaleString('en-US', { style: 'currency', currency: 'PHP' }) : '₱0.00';

    const handleAmountChange = (value) => {
        setData('amount', value);
        if (value) {
            const amount = parseFloat(value);
            const interest = amount * 0.03;
            const netReceived = amount - interest;
            const monthlyPayment = amount / parseInt(data.term);
            
            setCalculatedValues({
                interest,
                netReceived,
                monthlyPayment,
            });
        }
    };

    const handleTermChange = (value) => {
        setData('term', value);
        if (data.amount) {
            const amount = parseFloat(data.amount);
            const interest = amount * 0.03;
            const netReceived = amount - interest;
            const monthlyPayment = amount / parseInt(value);
            
            setCalculatedValues({
                interest,
                netReceived,
                monthlyPayment,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('user.loans.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold leading-tight text-slate-900">
                        Apply for Loan
                    </h2>
                </div>
            }
        >
            <Head title="Apply for Loan" />

            <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Loan Amount */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-900 mb-2">
                                Loan Amount
                            </label>
                            <input
                                type="number"
                                value={data.amount}
                                onChange={(e) => handleAmountChange(e.target.value)}
                                min="5000"
                                max="10000"
                                step="1000"
                                placeholder="Enter amount between 5,000 - 10,000"
                                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            {errors.amount && (
                                <p className="mt-1 text-xs text-red-600">{errors.amount}</p>
                            )}
                            <p className="mt-2 text-xs text-slate-500">
                                • Minimum: ₱5,000 | Maximum: ₱10,000
                                <br />
                                • Amount must be in thousands (5000, 6000, 7000, etc.)
                            </p>
                        </div>

                        {/* Loan Term */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-900 mb-2">
                                Loan Term (Months)
                            </label>
                            <select
                                value={data.term}
                                onChange={(e) => handleTermChange(e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="1">1 Month</option>
                                <option value="3">3 Months</option>
                                <option value="6">6 Months</option>
                                <option value="12">12 Months</option>
                            </select>
                        </div>

                        {/* Purpose */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-900 mb-2">
                                Purpose of Loan (Optional)
                            </label>
                            <textarea
                                value={data.purpose}
                                onChange={(e) => setData('purpose', e.target.value)}
                                placeholder="Briefly describe the purpose of your loan..."
                                rows="4"
                                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            {errors.purpose && (
                                <p className="mt-1 text-xs text-red-600">{errors.purpose}</p>
                            )}
                        </div>

                        {/* Calculation Preview */}
                        {data.amount && (
                            <div className="rounded-2xl bg-slate-50 p-6 border border-slate-200">
                                <h3 className="text-sm font-semibold text-slate-900 mb-4">Loan Calculation Preview</h3>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <p className="text-xs font-semibold text-slate-500">Loan Amount</p>
                                        <p className="mt-1 text-lg font-bold text-slate-900">
                                            {formattedCurrency(data.amount)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-500">Interest (3%)</p>
                                        <p className="mt-1 text-lg font-bold text-red-600">
                                            -{formattedCurrency(calculatedValues.interest)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-500">You Will Receive</p>
                                        <p className="mt-1 text-lg font-bold text-green-600">
                                            {formattedCurrency(calculatedValues.netReceived)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-500">Monthly Payment</p>
                                        <p className="mt-1 text-lg font-bold text-slate-900">
                                            {formattedCurrency(calculatedValues.monthlyPayment)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Important Notes */}
                        <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
                            <h3 className="text-sm font-semibold text-yellow-900 mb-3">⚠️ Important Information</h3>
                            <ul className="space-y-2 text-xs text-yellow-800">
                                <li>• 3% interest will be deducted from your loan amount immediately</li>
                                <li>• You will receive the net amount (loan - interest)</li>
                                <li>• Loan approval is subject to admin verification</li>
                                <li>• On-time payments can increase your loan eligibility</li>
                                <li>• Late payments will incur an additional 2% penalty</li>
                            </ul>
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={processing || !data.amount}
                                className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Submitting...' : 'Submit Loan Application'}
                            </button>
                            <a
                                href={route('user.loans.index')}
                                className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                Cancel
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
