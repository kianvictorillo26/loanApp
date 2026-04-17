<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsPremium
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! Auth::check() || Auth::user()->account_type !== 'Premium') {
            abort(403, 'Access denied.');
        }

        return $next($request);
    }
}
