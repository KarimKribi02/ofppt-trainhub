<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\formateur;
use App\Models\formateurAnimateur;


class FormateurAnimateurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $formateurs_animateurs = [
            ['nom' => 'Mohamed', 'prenom' => 'Amrani', 'email' => 'mohamed.amrani@example.com', 'filliere' => 'Développement Digital'],
            ['nom' => 'Fatima Zahra', 'prenom' => 'El Khatib', 'email' => 'fatima.elkhatib@example.com', 'filliere' => 'Développement Digital'],
            ['nom' => 'Youssef', 'prenom' => 'Bennani', 'email' => 'youssef.bennani@example.com', 'filliere' => 'Génie Civil'],
            ['nom' => 'Nourredine', 'prenom' => 'Ouazzani', 'email' => 'nourredine.ouazzani@example.com', 'filliere' => 'Génie Civil'],
            ['nom' => 'Hind', 'prenom' => 'Lahlou', 'email' => 'hind.lahlou@example.com', 'filliere' => 'Infrastructure Digitale'],
            ['nom' => 'Redouane', 'prenom' => 'Touzani', 'email' => 'redouane.touzani@example.com', 'filliere' => 'Infrastructure Digitale'],
            ['nom' => 'Amina', 'prenom' => 'El Idrissi', 'email' => 'amina.elidrissi@example.com', 'filliere' => 'Gestion des Entreprises'],
            ['nom' => 'Karim', 'prenom' => 'Chraibi', 'email' => 'karim.chraibi@example.com', 'filliere' => 'Gestion des Entreprises'],
            ['nom' => 'Samira', 'prenom' => 'Bouzid', 'email' => 'samira.bouzid@example.com', 'filliere' => 'Développement Digital'],
            ['nom' => 'Omar', 'prenom' => 'El Fassi', 'email' => 'omar.elfassi@example.com', 'filliere' => 'Génie Civil'],
        ];

        foreach ($formateurs_animateurs as $data) {
            // Vérifier si l'email existe déjà
            $existingFormateur = formateur::where('email', $data['email'])->first();
    
            // Si l'email n'existe pas, créer un nouveau formateur
            if (!$existingFormateur) {
                $formateur = formateur::create([
                    'nom' => $data['nom'],
                    'prenom' => $data['prenom'],
                    'email' => $data['email'],
                ]);
    
                // Lier à la table formateur_animateurs
                formateurAnimateur::create([
                    'formateur_id' => $formateur->id,
                    'filliere' => $data['filliere'],
                ]);
        }
    
    }
}
}
