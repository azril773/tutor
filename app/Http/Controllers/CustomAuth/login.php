<?php

namespace App\Http\Controllers\CustomAuth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class login extends Controller
{
    //

    public function Login(Request $req) {
        return Inertia::render("auth/login");
    }

    public function LoginProses(Request $req)
    {
        $credentials = $req->validate([
            "email" => ["required", "email"],
            "password" => ["required", "string"]
        ]);
        if (Auth::guard("user_login")->attempt($credentials)) {
            Log::debug($credentials);
            $req->session()->regenerate();
            return redirect()->intended(route('dashboard', absolute: false));
        }
    }
}
