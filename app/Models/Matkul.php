<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Matkul extends Model
{
    protected $table = "matkul";


    public function prodi() {
        return $this->belongsTo(Prodi::class, 'prodi_id','id');
    }
}
