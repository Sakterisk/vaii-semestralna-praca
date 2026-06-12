<?php

namespace Database\Seeders;

use App\Models\PortfolioSetting;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::query()->firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );

        PortfolioSetting::query()->firstOrCreate(
            ['full_name' => 'Your Name'],
            [
                'headline' => 'Software Developer',
                'about' => 'Tell your story here.',
                'page_title' => 'Portfolio',
                'page_description' => 'Personal portfolio website',
            ]
        );
    }
}
