<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth; // Importation correcte de la façade Auth
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Auth\EloquentUserProvider;
use App\Models\Cdc;
use App\Models\Dref;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        // Enregistrement du provider pour CDC
        Auth::provider('cdc', function ($app, array $config) {
            return new EloquentUserProvider($app['hash'], Cdc::class);
        });

        // Enregistrement du provider pour DREF
        Auth::provider('dref', function ($app, array $config) {
            return new EloquentUserProvider($app['hash'], Dref::class);
        });
    }
}