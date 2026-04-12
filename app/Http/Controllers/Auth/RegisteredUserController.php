<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rules\Password;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        // Check max premium users
        if ($request->account_type === 'Premium') {
            $premiumCount = User::where('account_type', 'Premium')->count();
            if ($premiumCount >= 50) {
                return back()->withErrors(['account_type' => 'Maximum 50 Premium accounts allowed.']);
            }
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|min:6|max:255|unique:'.User::class,
            'account_type' => 'required|in:Basic,Premium',
            'address' => 'required|string',
            'gender' => 'nullable|in:Male,Female,Other',
            'birthday' => 'required|date|before:today',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'contact_number' => ['required', 'string', 'regex:/^09[0-9]{9}$/'],
            'bank_name' => 'required|string',
            'bank_account_number' => 'required|string',
            'card_holder_name' => 'required|string',
            'tin_number' => 'required|string',
            'company_name' => 'required|string',
            'company_address' => 'required|string',
            'company_phone' => 'required|string',
            'position' => 'required|string',
            'monthly_earnings' => 'required|numeric|min:0',
            'proof_of_billing' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'valid_id' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'coe' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'password' => ['required', 'confirmed', Password::min(8)->letters()->mixedCase()->numbers()->symbols()],
        ]);

        // Calculate age
        $birthday = \Carbon\Carbon::parse($request->birthday);
        $age = $birthday->age;

        // Handle file uploads
        $proofOfBillingPath = $request->file('proof_of_billing')->store('uploads/proof_of_billing', 'public');
        $validIdPath = $request->file('valid_id')->store('uploads/valid_id', 'public');
        $coePath = $request->file('coe')->store('uploads/coe', 'public');

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'account_type' => $request->account_type,
            'address' => $request->address,
            'gender' => $request->gender,
            'birthday' => $request->birthday,
            'age' => $age,
            'email' => $request->email,
            'contact_number' => $request->contact_number,
            'bank_name' => $request->bank_name,
            'bank_account_number' => $request->bank_account_number,
            'card_holder_name' => $request->card_holder_name,
            'tin_number' => $request->tin_number,
            'company_name' => $request->company_name,
            'company_address' => $request->company_address,
            'company_phone' => $request->company_phone,
            'position' => $request->position,
            'monthly_earnings' => $request->monthly_earnings,
            'proof_of_billing' => $proofOfBillingPath,
            'valid_id' => $validIdPath,
            'coe' => $coePath,
            'status' => 'pending',
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        // Do not login, since status is pending
        // Auth::login($user);

        return redirect(route('login', absolute: false))->with('status', 'Registration submitted. Please wait for admin approval.');
    }
}
