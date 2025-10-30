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
}
