<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pendidikan extends Model
{
    protected $table = "pendidikan";
    protected $fillable = [
        "perguruan_tinggi",
        "jenjang",
        "bidang_studi",
        "tahun_lulus",
        "gelar_depan",
        "gelar_belakang",
        "user_id",
    ];
    //
}
