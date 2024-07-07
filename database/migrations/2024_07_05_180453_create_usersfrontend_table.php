<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersFrontendTable extends Migration
{
    public function up()
    {
        Schema::create('usersfrontend', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('profile_photo')->nullable();
            $table->enum('gender', ['male', 'female']);
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('usersfrontend');
    }
}
