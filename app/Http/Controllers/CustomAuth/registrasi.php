<?php

namespace App\Http\Controllers\CustomAuth;

use App\Http\Controllers\Controller;
use App\Mail\SendUser;
use App\Models\Pribadi;
use App\Models\UserLogin;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
class registrasi extends Controller
{
    //

    public function registrasi_user(Request $req)
    {   

        $validate = $req->validate([
            "namaLengkap" => "required|string",
            "email" => "required|email",
            "jk" => "required|string",
            "nik" => "required|string"
        ]);

        $namaLengkap = $req->namaLengkap;
        $email = $req->email;
        $jk = $req->jk;
        $nik = $req->nik;


        DB::beginTransaction();
        try {
            $user = new UserLogin();
            $user->email = $email;
            $password = Str::random(6);
            $user->password = Hash::make($password);
            $user->save();

            $dataPribadi = new Pribadi();
            Log::debug("OKOKO".$namaLengkap);
            $dataPribadi->nama_lengkap = $namaLengkap;
            $dataPribadi->email = $email;
            $dataPribadi->jk = $jk;
            $dataPribadi->nik = $nik;
            $dataPribadi->user_id = $user->id;
            $dataPribadi->save();
            Log::debug("OKOKO");

            Mail::to($email)->send(new SendUser($user->username, $password));
            DB::commit();            
            return redirect()->intended("/login");
        } catch (Exception $err) {
            Session::flash("error","Gagal registrasi");
            DB::rollBack();            
        }

    }
}
