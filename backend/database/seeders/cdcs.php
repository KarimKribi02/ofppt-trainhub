<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class cdcs extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('cdcs')->insert([
            'email' => 'cdc@example.com',
            'password' => bcrypt('password123'), // Assurez-vous d'utiliser bcrypt pour les mots de passe
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
