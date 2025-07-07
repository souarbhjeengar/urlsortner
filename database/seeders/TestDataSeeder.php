<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Company;
use App\Models\ShortUrl;
use Illuminate\Support\Facades\Hash;

class TestDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create test companies
        $company1 = Company::create([
            'name' => 'Tech Corp',
            'description' => 'A technology company'
        ]);

        $company2 = Company::create([
            'name' => 'Marketing Inc',
            'description' => 'A marketing agency'
        ]);

        // Create test admin user for company 1
        $admin1 = User::create([
            'name' => 'Admin User',
            'email' => 'admin@techcorp.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'is_active' => true,
            'company_id' => $company1->id,
        ]);
        $admin1->assignRole('admin');

        // Create test member user for company 1
        $member1 = User::create([
            'name' => 'Member User',
            'email' => 'member@techcorp.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'is_active' => true,
            'company_id' => $company1->id,
        ]);
        $member1->assignRole('user');

        // Create test admin user for company 2
        $admin2 = User::create([
            'name' => 'Admin Two',
            'email' => 'admin@marketing.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'is_active' => true,
            'company_id' => $company2->id,
        ]);
        $admin2->assignRole('admin');

        // Create test member user for company 2
        $member2 = User::create([
            'name' => 'Member Two',
            'email' => 'member@marketing.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'is_active' => true,
            'company_id' => $company2->id,
        ]);
        $member2->assignRole('user');

        // Create some test short URLs
        ShortUrl::create([
            'user_id' => $member1->id,
            'original_url' => 'https://www.google.com',
            'title' => 'Google Search',
            'short_code' => 'google1',
            'clicks' => 5,
        ]);

        ShortUrl::create([
            'user_id' => $member1->id,
            'original_url' => 'https://www.github.com',
            'title' => 'GitHub',
            'short_code' => 'github1',
            'clicks' => 3,
        ]);

        ShortUrl::create([
            'user_id' => $member2->id,
            'original_url' => 'https://www.facebook.com',
            'title' => 'Facebook',
            'short_code' => 'fb1',
            'clicks' => 8,
        ]);

        $this->command->info('Test data created successfully!');
        $this->command->info('Companies: Tech Corp, Marketing Inc');
        $this->command->info('Users created with password: password');
        $this->command->info('- admin@techcorp.com (Admin)');
        $this->command->info('- member@techcorp.com (Member)');
        $this->command->info('- admin@marketing.com (Admin)');
        $this->command->info('- member@marketing.com (Member)');
    }
}
