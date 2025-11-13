<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Institusi extends Model
{
    protected $table = 'institusi';
    protected $fillable = [
        "institusi",
        "status_pekerjaan",
        "masa_kerja",
        "pangkat",
        "bidang_pekerjaan",
        "user_id",
    ];
    //
}
