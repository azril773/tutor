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
            $table->bigInteger("fakultas_id");
            $table->foreign("fakultas_id")->references("id")->on("fakultas");
            $table->timestamps();
        });

        Schema::create("matkul", function (Blueprint $table) {
            $table->id();
            $table->string("kode_matkul");
            $table->string("nama");
            $table->string("semester");
            $table->integer("kuota");
            $table->bigInteger("prodi_id");
            $table->foreign("prodi_id")->references("id")->on("prodi");
            $table->timestamps();
        });

        Schema::create("lamaran", function (Blueprint $table) {
            $table->id();
            $table->string("status");
            $table->bigInteger("user_id");
            $table->foreign("user_id")->references('id')->on("user_login");
            $table->bigInteger("matkul_id");
            $table->foreign("matkul_id")->references("id")->on("matkul");
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('letter');
    }
};
