<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CustomAuth\login;
use App\Http\Controllers\CustomAuth\registrasi;
use App\Http\Controllers\DashboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');


Route::get("registrasi", function (Request $req) {
    return Inertia::render("auth/registrasi");
});


Route::post("registrasi", [registrasi::class, 'registrasi_user']);

Route::get("user_login", [login::class, "Login"]);

Route::post("user_login", [login::class, "LoginProses"]);


Route::middleware(['customAuth','adminAuth'])->group(function () {
    Route::post('approve', [DashboardController::class, 'approveLamaran'])->name('approveLamaran');
    Route::post('reject', [DashboardController::class, 'rejectLamaran'])->name('rejectLamaran');
    Route::get("master-data", [DashboardController::class, "masterData"])->name("masterDataPage");
    Route::get("master-fakultas", [DashboardController::class, "masterFakultas"])->name("masterFakultasPage");
    Route::get("master-prodi", [DashboardController::class, "masterProdi"])->name("masterProdiPage");
    Route::get("master-matkul", [DashboardController::class, "masterMatkul"])->name("masterMatkulPage");
    
    Route::get("fakultas", [DashboardController::class, "getFakultas"])->name("get_fakultas");
    Route::get("prodi", [DashboardController::class, "getProdi"])->name("get_prodi");
    Route::get("matkul", [DashboardController::class, "getMatkul"])->name("get_matkul");
    Route::post("fakultas", [DashboardController::class, "fakultas"])->name("add_fakultas");
    Route::post("prodi", [DashboardController::class, "prodi"])->name("add_prodi");
    Route::post("matkul", [DashboardController::class, "matkul"])->name("add_matkul");
    Route::post("import_matkul", [DashboardController::class, "import_matkul"])->name("import_add_matkul");
});


Route::middleware(['customAuth'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'view'])->name('dashboard');
    Route::get('biodata', [DashboardController::class, 'biodata'])->name('biodata');
    Route::post('biodata', [DashboardController::class, 'updateBiodata'])->name('updateBiodata');
    Route::post('proses-lamaran', [DashboardController::class, 'prosesLamaran'])->name('prosesLamaran');
    Route::get('dashboard/tutor/{id}', [DashboardController::class, 'detailTutor'])->name('detailTutor');
    Route::get('applications', [DashboardController::class, 'getApplications'])->name('getApplications');
    Route::get('tutors', [DashboardController::class, 'getTutors'])->name('getTutors');
    
    Route::get('/files/{path}', [DashboardController::class, 'download'])
     ->where('path', '.*')->name('files.download');
    
     Route::get('reset-password', [DashboardController::class, 'resetPassword'])->name('resetPassword');
     
     Route::post('reset-password-post', [DashboardController::class, 'resetPasswordPost'])->name('resetPasswordPost');
     
     // Admin
    //  Route::get('admin', [AdminController::class, 'view'])->name('adminView');

    

    Route::get("logout", function(Request $req) {
        Auth::guard('user_login')->logout();
        $req->session()->invalidate();
        $req->session()->regenerateToken();
        return redirect('/');
    });
});

require __DIR__ . '/settings.php';
