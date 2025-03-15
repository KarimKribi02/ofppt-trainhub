<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;


class HebergementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Désactiver temporairement les contraintes pour éviter les conflits
        Schema::disableForeignKeyConstraints();
        DB::table('hebergements')->truncate();
        Schema::enableForeignKeyConstraints();

        $hebergements = [
            ['nom_hebergement' => 'Hôtel Sofitel', 'lieu' => 'Casablanca', 'localisation' => 'Bd Hassan II'],
            ['nom_hebergement' => 'Hôtel Farah', 'lieu' => 'Casablanca', 'localisation' => 'Corniche Ain Diab'],
            ['nom_hebergement' => 'Hôtel Tour Hassan', 'lieu' => 'Rabat', 'localisation' => 'Centre-Ville'],
            ['nom_hebergement' => 'Hôtel Farah Rabat', 'lieu' => 'Rabat', 'localisation' => 'Av. Mohamed V'],
            ['nom_hebergement' => 'Hôtel La Mamounia', 'lieu' => 'Marrakech', 'localisation' => 'Avenue Bab Jdid'],
            ['nom_hebergement' => 'Hôtel Kenzi Menara', 'lieu' => 'Marrakech', 'localisation' => 'Av. Mohamed VI'],
            ['nom_hebergement' => 'Hôtel Sahrai', 'lieu' => 'Fès', 'localisation' => 'Route d’Immouzer'],
            ['nom_hebergement' => 'Palais Medina & Spa', 'lieu' => 'Fès', 'localisation' => 'Boulevard Allal El Fassi'],
            ['nom_hebergement' => 'Hôtel Hilton', 'lieu' => 'Tanger', 'localisation' => 'Boulevard Mohamed VI'],
            ['nom_hebergement' => 'Hôtel Royal Tulip', 'lieu' => 'Tanger', 'localisation' => 'Ghandouri Beach'],
            ['nom_hebergement' => 'Sofitel Agadir', 'lieu' => 'Agadir', 'localisation' => 'Baie des Palmiers'],
            ['nom_hebergement' => 'Hôtel Atlantic Palace', 'lieu' => 'Agadir', 'localisation' => 'Secteur Touristique'],
            ['nom_hebergement' => 'Hôtel Transatlantique', 'lieu' => 'Meknès', 'localisation' => 'Rue Oqba Ibn Nafia'],
            ['nom_hebergement' => 'Hôtel Swani', 'lieu' => 'Meknès', 'localisation' => 'Avenue des FAR'],
            ['nom_hebergement' => 'Hôtel Atlas Orient', 'lieu' => 'Oujda', 'localisation' => 'Place de la Gare'],
            ['nom_hebergement' => 'Hôtel Relax Oujda', 'lieu' => 'Oujda', 'localisation' => 'Route de Saïdia'],
            ['nom_hebergement' => 'Hôtel Vitality Terminus', 'lieu' => 'Kénitra', 'localisation' => 'Gare ONCF'],
            ['nom_hebergement' => 'Hôtel Mamora', 'lieu' => 'Kénitra', 'localisation' => 'Avenue Mohamed Diouri'],
            ['nom_hebergement' => 'Hôtel Panorama', 'lieu' => 'Tétouan', 'localisation' => 'Route de Ceuta'],
            ['nom_hebergement' => 'Hôtel Blanco Riad', 'lieu' => 'Tétouan', 'localisation' => 'Rue Dar Baroud'],
            ['nom_hebergement' => 'Hôtel Riad du Pecheur', 'lieu' => 'Safi', 'localisation' => 'Boulevard de la Corniche'],
            ['nom_hebergement' => 'Hôtel Farah Safi', 'lieu' => 'Safi', 'localisation' => 'Avenue de la Liberté'],
            ['nom_hebergement' => 'Mazagan Beach Resort', 'lieu' => 'El Jadida', 'localisation' => 'Plage El Haouzia'],
            ['nom_hebergement' => 'Hôtel Ibis El Jadida', 'lieu' => 'El Jadida', 'localisation' => 'Place Nour El Kamar'],
        ];

        DB::table('hebergements')->insert($hebergements);
    }
}
