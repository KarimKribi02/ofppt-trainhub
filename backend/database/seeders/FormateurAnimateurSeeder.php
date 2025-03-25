<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

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
                'password' => Hash::make('password123'),
                'filières' => 'Développement Digital',
                'role'=>'ANIMATEUR',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nom' => 'Benjelloun',
                'prenom' => 'Fatima',
                'email' => 'fatima.benjelloun@example.com',
                'password' => Hash::make('password123'),
                'filières' => 'Génie Civil',
                'role'=>'ANIMATEUR',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nom' => 'Bouhriz',
                'prenom' => 'Omar',
                'email' => 'omar.bouhriz@example.com',
                'password' => Hash::make('password123'),
                'filières' => 'Infrastructure Digitale',
                'role'=>'ANIMATEUR',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nom' => 'El Mansouri',
                'prenom' => 'Khadija',
                'email' => 'khadija.elmansouri@example.com',
                'password' => Hash::make('password123'),
                'filières' => 'Gestion des Entreprises',
                'role'=>'ANIMATEUR',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nom' => 'Fassi',
                'prenom' => 'Rachid',
                'email' => 'rachid.fassi@example.com',
                'password' => Hash::make('password123'),
                'filières' => 'Développement Digital',
                'role'=>'ANIMATEUR',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nom' => 'Zahidi',
                'prenom' => 'Samira',
                'email' => 'samira.zahidi@example.com',
                'password' => Hash::make('password123'),
                'filières' => 'Génie Civil',
                'role'=>'ANIMATEUR',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nom' => 'Tazi',
                'prenom' => 'Mohamed',
                'email' => 'mohamed.tazi@example.com',
                'password' => Hash::make('password123'),
                'filières' => 'Infrastructure Digitale',
                'role'=>'ANIMATEUR',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nom' => 'El Amrani',
                'prenom' => 'Nadia',
                'email' => 'nadia.elamrani@example.com',
                'password' => Hash::make('password123'),
                'filières' => 'Gestion des Entreprises',
                'role'=>'ANIMATEUR',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nom' => 'Bennis',
                'prenom' => 'Karim',
                'email' => 'karim.bennis@example.com',
                'password' => Hash::make('password123'),
                'filières' => 'Développement Digital',
                'role'=>'ANIMATEUR',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nom' => 'Hajji',
                'prenom' => 'Laila',
                'email' => 'laila.hajji@example.com',
                'password' => Hash::make('password123'),
                'filières' => 'Génie Civil',
                'role'=>'ANIMATEUR',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
