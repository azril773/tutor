<?php

use App\Http\Controllers\CustomAuth\login;
use App\Http\Controllers\CustomAuth\registrasi;
use App\Http\Controllers\CustomAuth\ResetPassword;
use App\Http\Controllers\DashboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');


Route::get("registrasi", function (Request $req) {
    $token = $req->session()->token();
    return Inertia::render("auth/registrasi", ["token" => $token]);
});


Route::post("registrasi", [registrasi::class, 'registrasi_user']);

Route::get("user_login", [login::class, "Login"]);

Route::post("user_login", [login::class, "LoginProses"]);


Route::middleware(['customAuth'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'view'])->name('dashboard');
    Route::get('biodata', [DashboardController::class, 'biodata'])->name('biodata');
    Route::post('biodata', [DashboardController::class, 'updateBiodata'])->name('updateBiodata');
    Route::post('proses-lamaran', [DashboardController::class, 'prosesLamaran'])->name('prosesLamaran');
    Route::post('approve', [DashboardController::class, 'approveLamaran'])->name('approveLamaran');
    Route::get('dashboard/tutor/{id}', [DashboardController::class, 'detailTutor'])->name('detailTutor');
    
    Route::get('/files/{path}', [DashboardController::class, 'download'])
     ->where('path', '.*')->name('files.download');
    
    Route::get('reset-password', [DashboardController::class, 'resetPassword'])->name('resetPassword');

    Route::post('reset-password-post', [DashboardController::class, 'resetPasswordPost'])->name('resetPasswordPost');


    Route::get("logout", function(Request $req) {
        Auth::guard('user_login')->logout();
        $req->session()->invalidate();
        $req->session()->regenerateToken();
        return redirect('/');
    });
});

require __DIR__ . '/settings.php';
