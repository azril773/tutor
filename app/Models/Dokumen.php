<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dokumen extends Model
{
    protected $table = 'dokumen';
    protected $fillable = [
        "cv",
        "ijazah",
        "rps",
        "foto_ktp",
        "buku_tabungan",
        "surat_ketersediaan",
        "user_id",
    ];
    //
}
