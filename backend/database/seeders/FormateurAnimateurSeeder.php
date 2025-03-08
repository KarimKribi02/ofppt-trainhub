<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FormateurAnimateurSeeder extends Seeder
{
    /**
     * Exécuter le seeder.
     */
    public function run()
    {
        DB::table('formateur_animateurs')->insert([
            [
                'nom' => 'El Bakkali',
                'prenom' => 'Yassine',
                'email' => 'yassine.elbakkali@example.com',
                'filières' => 'Développement Digital',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nom' => 'Benjelloun',
                'prenom' => 'Fatima',
                'email' => 'fatima.benjelloun@example.com',
                'filières' => 'Génie Civil',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nom' => 'Bouhriz',
                'prenom' => 'Omar',
                'email' => 'omar.bouhriz@example.com',
                'filières' => 'Infrastructure Digitale',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nom' => 'El Mansouri',
                'prenom' => 'Khadija',
                'email' => 'khadija.elmansouri@example.com',
                'filières' => 'Gestion des Entreprises',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nom' => 'Fassi',
                'prenom' => 'Rachid',
                'email' => 'rachid.fassi@example.com',
                'filières' => 'Développement Digital',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nom' => 'Zahidi',
                'prenom' => 'Samira',
                'email' => 'samira.zahidi@example.com',
                'filières' => 'Génie Civil',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nom' => 'Tazi',
                'prenom' => 'Mohamed',
                'email' => 'mohamed.tazi@example.com',
                'filières' => 'Infrastructure Digitale',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nom' => 'El Amrani',
                'prenom' => 'Nadia',
                'email' => 'nadia.elamrani@example.com',
                'filières' => 'Gestion des Entreprises',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nom' => 'Bennis',
                'prenom' => 'Karim',
                'email' => 'karim.bennis@example.com',
                'filières' => 'Développement Digital',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nom' => 'Hajji',
                'prenom' => 'Laila',
                'email' => 'laila.hajji@example.com',
                'filières' => 'Génie Civil',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
