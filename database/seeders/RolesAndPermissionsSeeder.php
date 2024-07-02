<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {
        // أذونات المستخدم
        Permission::create(['name' => 'create admin']);
        Permission::create(['name' => 'delete admin']);
        Permission::create(['name' => 'view admin']);
        Permission::create(['name' => 'edit admin']);

        // أذونات الدورات
        Permission::create(['name' => 'create course']);
        Permission::create(['name' => 'delete course']);
        Permission::create(['name' => 'view course']);
        Permission::create(['name' => 'edit course']);

        // إنشاء الأدوار وتخصيص الأذونات
        $superAdminRole = Role::create(['name' => 'super admin']);
        $superAdminRole->givePermissionTo(Permission::all());

        $adminRole = Role::create(['name' => 'admin']);
        $adminRole->givePermissionTo([
            'view admin',
            'edit admin',
        ]);
    }
}
