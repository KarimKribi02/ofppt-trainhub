<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ResponsableDrSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('responsable_drs')->insert([
            'email' => 'ResponsableDr@example.com',
            'password' => Hash::make('admin123'),
            'role' => 'RESPONSABLE_DR',
        ]);
    }
}
