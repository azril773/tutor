<?php

namespace App\Http\Controllers\CustomAuth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ResetPassword extends Controller
{
    public function resetPasswordPost(Request $req) {
        dd($req);
        // $validated = $req->validate([
        //     "password" => "required|string",
        //     "password2" => "required|string"
        // ]);

        $password = $req->password;
        $password2 = $req->password2;

        if ($password !== $password2) {
            return redirect()->intended("/reset-password")->withErrors([
                "password" => "Password tidak cocok"
            ]);
        };

        // $newPassword = 
    }
}
