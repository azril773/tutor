<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('fakultas', function (Blueprint $table) {
            $table->id();
            $table->string("kode_fakultas");
            $table->string("nama");
            $table->timestamps();
        });

        Schema::create("prodi", function (Blueprint $table) {
            $table->id();
            $table->string("kode_prodi");
            $table->string("nama");
            
            // FIX: Changed to unsignedBigInteger
            $table->unsignedBigInteger("fakultas_id");
            $table->foreign("fakultas_id")->references("id")->on("fakultas")->onDelete('cascade');
            
            $table->timestamps();
        });

        Schema::create("matkul", function (Blueprint $table) {
            $table->id();
            $table->string("kode_matkul");
            $table->string("nama");
            $table->string("semester");
            $table->integer("kuota");
            
            // FIX: Changed to unsignedBigInteger
            $table->unsignedBigInteger("prodi_id");
            $table->foreign("prodi_id")->references("id")->on("prodi")->onDelete('cascade');
            
            $table->timestamps();
        });

        Schema::create("lamaran", function (Blueprint $table) {
            $table->id();
            $table->string("status");
            
            // FIX: Changed to unsignedBigInteger
            $table->unsignedBigInteger("user_id");
            // Assuming 'user_login' exists from your previous migration
            $table->foreign("user_id")->references('id')->on("user_login")->onDelete('cascade');
            
            // FIX: Changed to unsignedBigInteger
            $table->unsignedBigInteger("matkul_id");
            $table->foreign("matkul_id")->references("id")->on("matkul")->onDelete('cascade');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // FIX: Drop tables in reverse order (child first, then parent)
        Schema::dropIfExists('lamaran');
        Schema::dropIfExists('matkul');
        Schema::dropIfExists('prodi');
        Schema::dropIfExists('fakultas');
    }
};
