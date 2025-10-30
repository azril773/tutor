<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pribadi extends Model
{
    protected $table = 'pribadi';
    protected $fillable = [
        "nama_lengkap",
        "email",
        "nowa",
        "jk",
        "tgl_lahir",
        "nip",
        "nik",
        "nidn",
        "alamat",
        "provinsi",
        "kabkot",
        "kodepos",
        "norek",
        "atas_nama",
        "nama_bank",
        "user_id"
    ];

    public function userlogin()
    {
        return $this->belongsTo(userlogin::class, 'id', 'user_id');
    }
    //
}
