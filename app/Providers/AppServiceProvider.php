<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        User::where('status', 'rejected')
            ->where('updated_at', '<', now()->subDays(30))
            ->chunkById(50, function ($users) {
                foreach ($users as $user) {
                    if ($user->proof_of_billing) {
                        Storage::disk('public')->delete($user->proof_of_billing);
                    }
                    if ($user->valid_id) {
                        Storage::disk('public')->delete($user->valid_id);
                    }
                    if ($user->coe) {
                        Storage::disk('public')->delete($user->coe);
                    }
                    $user->delete();
                }
            });
    }
}
