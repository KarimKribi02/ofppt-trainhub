<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FormateurParticipant>
 */
class FormateurParticipantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'nom' => $this->faker->randomElement([
                'El Mansouri', 'Ben Ali', 'Bennani', 'El Amrani', 'El Fassi', 
                'Touhami', 'Ouazzani', 'El Harrak', 'Bekkali', 'Tazi'
            ]),
            'prenom' => $this->faker->randomElement([
                'Youssef', 'Ahmed', 'Saïd', 'Idriss', 'Kamal', 
                'Hicham', 'Marouane', 'Fouad', 'Zouhair', 'Jamal'
            ]),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => Hash::make('password123'), 
            'role' => 'PARTICIPANT', // ✅ Ajout du rôle par défaut
            'filliere' => $this->faker->randomElement([
                'Développement Digital',
                'Génie Civil',
                'Infrastructure Digitale',
                'Gestion des Entreprises'
            ]),
            'etablissement' => $this->faker->randomElement([
                'OFPPT Casablanca',
                'OFPPT Rabat',
                'OFPPT Marrakech',
                'OFPPT Fès',
                'OFPPT Tanger',
                'OFPPT Agadir',
                'OFPPT Oujda',
                'OFPPT Meknès'
            ]),
        ];
    }
}
