<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class drefsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('drefs')->insert([
            'email' => 'dref@example.com',
            'password' => Hash::make('password123'),
            'role' => 'DREF',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
