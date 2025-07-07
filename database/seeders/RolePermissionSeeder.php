<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            'create_users',
            'read_users',
            'update_users',
            'delete_users',
            'manage_permissions',
            'manage_roles',
            'view_admin_panel',
            'manage_companies',
            'create_short_urls',
            'read_short_urls',
            'update_short_urls',
            'delete_short_urls',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create roles and assign permissions
        $superAdminRole = Role::create(['name' => 'superAdmin']);
        $adminRole = Role::create(['name' => 'admin']);
        $userRole = Role::create(['name' => 'user']);

        // SuperAdmin gets all permissions
        $superAdminRole->givePermissionTo(Permission::all());

        // Admin gets most permissions except managing permissions and roles
        $adminRole->givePermissionTo([
            'create_users',
            'read_users',
            'update_users',
            'delete_users',
            'view_admin_panel',
            'manage_companies',
            'create_short_urls',
            'read_short_urls',
            'update_short_urls',
            'delete_short_urls',
        ]);

        // User gets basic permissions
        $userRole->givePermissionTo([
            'create_short_urls',
            'read_short_urls',
            'update_short_urls',
            'delete_short_urls',
        ]);
    }
}
