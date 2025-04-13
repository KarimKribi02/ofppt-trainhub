<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->call(FormateurAnimateurSeeder::class);
        $this->call(FormateurParticipantSeeder::class);
        $this->call(HebergementSeeder::class);
        $this->call(drefsSeeder::class);
        $this->call(cdcs::class);
        $this->call(ResponsableDrSeeder::class);
        

    }
}
