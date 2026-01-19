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
        Schema::create("user_login", function (Blueprint $table) {
            $table->id(); // Creates Unsigned BigInteger
            $table->string("email", 255)->unique();
            $table->string("password", 255);
            $table->string("role", 255)->default("tutor");
            $table->timestamps();
        });

        Schema::create('pribadi', function (Blueprint $table) {
            $table->id();
            $table->string("nama_lengkap", 200)->nullable(true);
            $table->string("email", 100)->nullable(true);
            $table->string("nowa", 50)->nullable(true);
            $table->string("jk", 10)->nullable(true);
            $table->date("tgl_lahir")->nullable(true); // Removed '200' (dates don't have length)
            $table->string("nip", 100)->nullable(true);
            $table->string("nik", 100)->nullable(true);
            $table->string("nuptk", 100)->nullable(true);
            $table->string("npwp", 100)->nullable(true);
            $table->string("nidn", 100)->nullable(true);
            $table->string("alamat", 255)->nullable(true);
            $table->string("provinsi", 200)->nullable(true);
            $table->string("kabkot", 200)->nullable(true);
            $table->string("kodepos", 100)->nullable(true);
            $table->string("norek", 100)->nullable(true);
            $table->string("atas_nama", 100)->nullable(true);
            $table->string("nama_bank", 100)->nullable(true);
            
            // FIX: Changed to unsignedBigInteger to match user_login.id
            $table->unsignedBigInteger("user_id"); 
            $table->foreign("user_id")->references("id")->on("user_login")->onDelete('cascade');
            
            $table->timestamps();
        });

        Schema::create('institusi', function (Blueprint $table) {
            $table->id();
            $table->string("institusi", 200);
            $table->string("status_pekerjaan", 100);
            $table->string("masa_kerja", 50);
            $table->string("golongan", 100);
            $table->string("bidang_pekerjaan", 200);

            // FIX: Changed to unsignedBigInteger
            $table->unsignedBigInteger("user_id");
            $table->foreign("user_id")->references("id")->on("user_login")->onDelete('cascade');
            
            $table->timestamps();
        });

        Schema::create('pendidikan', function (Blueprint $table) {
            $table->id();
            $table->string("perguruan_tinggi", 200);
            $table->string("jenjang", 50);
            $table->string("bidang_studi", 150);
            $table->string("tahun_lulus", 100);
            $table->string("gelar_depan", 100);
            $table->string("gelar_belakang", 100);

            // FIX: Changed to unsignedBigInteger
            $table->unsignedBigInteger("user_id");
            $table->foreign("user_id")->references("id")->on("user_login")->onDelete('cascade');
            
            $table->timestamps();
        });

        Schema::create('dokumen', function (Blueprint $table) {
            $table->id();
            $table->string("cv", 150);
            $table->string("ijazah", 150);
            $table->string("rps", 150);
            $table->string("foto_ktp", 150);
            $table->string("buku_tabungan", 150);
            $table->string("surat_ketersediaan", 150);

            // FIX: Changed to unsignedBigInteger
            $table->unsignedBigInteger("user_id");
            $table->foreign("user_id")->references("id")->on("user_login")->onDelete('cascade');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // FIX: Drop tables in reverse order to avoid foreign key errors
        Schema::dropIfExists('dokumen');
        Schema::dropIfExists('pendidikan');
        Schema::dropIfExists('institusi');
        Schema::dropIfExists('pribadi');
        Schema::dropIfExists('user_login');
    }
};
