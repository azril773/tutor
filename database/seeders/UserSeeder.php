<?php

namespace Database\Seeders;

use App\Models\UserLogin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UserLogin::create([
            'email' => 'admin@gmail.com',
            'password' => bcrypt('123'),
            'role' => 'admin',
        ]);
        UserLogin::create([
            'email' => 'uptpjj@gmail.com',
            'password' => bcrypt('123'),
            'role' => 'admin',
        ]);
        UserLogin::create([
            'email' => 'staffuptpjj@gmail.com',
            'password' => bcrypt('123'),
            'role' => 'admin',
        ]);
    }
}
