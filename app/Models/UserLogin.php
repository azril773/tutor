<?php

namespace App\Models;
use Illuminate\Foundation\Auth\User as Authenticatable;

class UserLogin extends Authenticatable
{
    protected $table = 'user_login';
    //


    public function pribadi() {
        return $this->hasOne(Pribadi::class, 'user_id','id');
    }

    public function institusi() {
        return $this->hasOne(Institusi::class, "user_id", "id");
    }
    public function pendidikan() {
        return $this->hasMany(Pendidikan::class, "user_id", "id");
    }
    public function dokumen() {
        return $this->hasOne(Dokumen::class, "user_id", "id");
    }
}
