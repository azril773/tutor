<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lamaran extends Model
{
    protected $fillable = ["status"];
    protected $table = "lamaran";


    public function matkul() {
        return $this->belongsTo(Matkul::class, 'matkul_id','id');
    }
    public function user_login() {
        return $this->belongsTo(UserLogin::class, 'user_id','id');
    }
}
