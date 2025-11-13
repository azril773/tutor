<?php

namespace App\Http\Controllers;

use App\Mail\SendUser;
use App\Models\Dokumen;
use App\Models\Fakultas;
use App\Models\Institusi;
use App\Models\Lamaran;
use App\Models\Matkul;
use App\Models\Pendidikan;
use App\Models\Pribadi;
use App\Models\Prodi;
use App\Models\UserLogin;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

use function Termwind\render;

class DashboardController extends Controller
{
    //
    public function view(Request $req)
    {
        $fakultas = Fakultas::all();
        $prodi = Prodi::with("fakultas")->get();
        $maktul = Matkul::with("prodi")->get();
        $tutors = UserLogin::with(["pribadi", 'institusi', 'pendidikan', 'dokumen'])->get();
        $user = Auth::guard("user_login")->user();
        $role = $user->role;
        if ($role === "admin") {
            $lamaran = Lamaran::with(["matkul.prodi.fakultas", "user_login.pribadi"])->get();
        } else {
            $lamaran = Lamaran::with(["matkul.prodi.fakultas", "user_login.pribadi"])->where("user_id", $user->id)->get();
        }
        return Inertia::render("custom/lamaran", [
            "fakultas" => $fakultas,
            "prodi" => $prodi,
            "matkul" => $maktul,
            "lamaran" => $lamaran,
            "role" => $role,
            "tutors" => $tutors
        ]);
    }
    //
    public function biodata(Request $req)
    {
        $user = Auth::guard("user_login")->user();
        $role = $user->role;
        $pribadi = Pribadi::where("user_id", $user->id)->first();
        $institusi = Institusi::where("user_id", $user->id)->first();
        $pendidikan = Pendidikan::where("user_id", $user->id)->get();
        return Inertia::render("custom/biodata", [
            "idUser" => $user->id,
            "role" => $role,
            "dataPribadi" => $pribadi,
            "dataInstitusi" => $institusi,
            "dataPendidikan" => $pendidikan,
        ]);
    }

    public function prosesLamaran(Request $req)
    {
        $validated = $req->validate([
            "fakultas" => "required|string",
            "prodi" => "required|string",
            "matkul" => "required|string",
        ]);

        $matkul = $req->matkul;
        $getMatkul = Matkul::where("kode_matkul", $matkul)->get();

        if ($getMatkul->isEmpty()) {
            return redirect()->back()->withErrors([
                "matkulError" => "Matkul not found."
            ]);
        }

        $user = Auth::guard("user_login")->user();
        $pribadi = Pribadi::where("user_id", $user->id)->first();
        $institusi = Institusi::where("user_id", $user->id)->first();
        $pendidikan = Pendidikan::where("user_id", $user->id)->first();
        $dokumen = Dokumen::where("user_id", $user->id)->first();

        if (!$pribadi || $pribadi->nama_lengkap === null || !$institusi || !$pendidikan || !$dokumen) {
            Session::flash("error", "Data biodata anda tidak lengkap.");
            return redirect()->intended("/dashboard");
        }

        $existLamaran = Lamaran::where("user_id", $user->id)->where("matkul_id", $getMatkul[0]->id)->get();
        if (!$existLamaran->isEmpty()) {
            return redirect()->back()->withErrors([
                "matkulError" => "Lamaran sudah ada."
            ]);
        }
        $lamaran = new Lamaran();
        $lamaran->status = "PENDING";
        $lamaran->user_id = $user->id;
        $lamaran->matkul_id = $getMatkul[0]->id;
        $lamaran->save();
    }

    public function resetPassword(Request $req)
    {
        return Inertia::render("custom/reset-password");
    }


    public function approveLamaran(Request $req)
    {
        Log::debug($req);
        $validated = $req->validate([
            "id" => "required|string"
        ]);
        $user = Auth::guard("user_login")->user();
        if (!$user->role === "admin") {
            return redirect()->intended("/dashboard")->withErrors([
                "roleError" => "Anda bukan admin."
            ]);
        };

        $id = $req->id;

        $lamaran = Lamaran::findOrFail($id);
        $lamaran->update([
            "status" => "APPROVED"
        ]);
        return redirect()->intended("/dashboard");
    }

    public function resetPasswordPost(Request $req)
    {
        $validated = $req->validate([
            "password" => "required|string",
            "password2" => "required|string"
        ]);

        $password = $req->password;
        $password2 = $req->password2;

        if ($password !== $password2) {
            return redirect()->intended("/reset-password")->withErrors([
                "password" => "Password tidak cocok"
            ]);
        };
        $user = Auth::guard("user_login")->user();

        $getUser = UserLogin::where("id", $user->id)->first();
        if (!$getUser) {
            return redirect()->intended("/reset-password")->withErrors([
                "error" => "User tidak ada"
            ]);
        }

        $getUser->password = Hash::make($password);
        $getUser->save();
        Session::flash("success", "berhasil mengubah password");
        return redirect()->intended("/reset-password");


        // $newPassword = 
    }


    public function updateBiodata(Request $req)
    {
        $validated = $req->validate([
            "id" => "required|string",
            'cv' => 'required|file|mimetypes:application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'ijazah' => 'required|file|mimetypes:application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'rps' => 'required|file|mimetypes:application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'foto_ktp' => 'mimes:jpg,jpeg,png,gif,webp',
            'suratKetersediaan' => 'required|file|mimetypes:application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ]);
        $id = $req->id;
        $user = UserLogin::where("id", $id)->first();

        if (!$user) {
            Session::flash("error", "User tidak ada");
        }
        // Data Pribadi
        $namaLengkap = $req->namaLengkap;
        $email = $req->email;
        $tgl_lahir = $req->tgl_lahir;
        $jk = $req->jk;
        $nowa = $req->nowa;
        $nip = $req->nip;
        $nik = $req->nik;
        $nidn = $req->nidn;
        $provinsi = $req->provinsi;
        $kabkot = $req->kabkot;
        $kodePos = $req->kodePos;
        $alamat = $req->alamat;
        $norek = $req->norek;
        $atasNama = $req->atasNama;
        $namaBank = $req->namaBank;

        // Institusi
        $institusi = $req->institusi;
        $statusPekerjaan = $req->statusPekerjaan;
        $masaKerja = $req->masaKerja;
        $pangkat = $req->pangkat;
        $bidangPekerjaan = $req->bidangPekerjaan;

        // Pendidikan
        $pendidikan = $req->pendidikan;
        $transformPendidikan = json_decode($pendidikan);



        DB::beginTransaction();
        try {
            Pribadi::updateOrCreate(
                ["user_id" => $id],
                [
                    "nama_lengkap" => $namaLengkap,
                    "email" => $email,
                    "nowa" => $nowa,
                    "jk" => $jk,
                    "tgl_lahir" => $tgl_lahir,
                    "nip" => $nip,
                    "nik" => $nik,
                    "nidn" => $nidn,
                    "alamat" => $alamat,
                    "provinsi" => $provinsi,
                    "kabkot" => $kabkot,
                    "kodepos" => $kodePos,
                    "norek" => $norek,
                    "atas_nama" => $atasNama,
                    "nama_bank" => $namaBank,
                ]
            );
            Log::debug("OKOKOK");

            Institusi::updateOrCreate(
                ["user_id" => $id],
                [
                    "institusi" => $institusi,
                    "status_pekerjaan" => $statusPekerjaan,
                    "masa_kerja" => $masaKerja,
                    "pangkat" => $pangkat,
                    "bidang_pekerjaan" => $bidangPekerjaan,
                ]
            );

            Pendidikan::where('user_id', $id)->delete();

            $dataPendidikan = [];
            foreach ($transformPendidikan as $key => $value) {
                array_push($dataPendidikan, [...(array)$value, 'user_id' => $user->id]);
            }

            Pendidikan::insert($dataPendidikan);
            Log::debug($pendidikan);
            $dokumen = Dokumen::where("user_id", $id)->first();

            if ($dokumen) {
                Storage::disk("public")->delete($dokumen->cv);
                Storage::disk("public")->delete($dokumen->ijazah);
                Storage::disk("public")->delete($dokumen->rps);
                Storage::disk("public")->delete($dokumen->foto_ktp);
                Storage::disk("public")->delete($dokumen->buku_tabungan);
                Storage::disk("public")->delete($dokumen->surat_ketersediaan);
            }

            $extCv = $req->file("cv")->extension();
            $pathCv = $req->file("cv")->store("dokumen", 'public');

            $extIjazah = $req->file("ijazah")->extension();
            $pathIjazah = $req->file("ijazah")->store("dokumen", 'public');

            $extRps = $req->file("rps")->extension();
            $pathRps = $req->file("rps")->store("dokumen", 'public');

            $extFotoKtp = $req->file("fotoKtp")->extension();
            $pathFotoKtp = $req->file("fotoKtp")->store("dokumen", 'public');

            $extBukuTabungan = $req->file("bukuTabungan")->extension();
            $pathBukuTabungan = $req->file("bukuTabungan")->store("dokumen", 'public');

            $extSuratKetersediaan = $req->file("suratKetersediaan")->extension();
            $pathSuratKetersediaan = $req->file("suratKetersediaan")->store("dokumen", 'public');
            Log::debug($pathFotoKtp);
            $dokumen = Dokumen::updateOrCreate(
                ["user_id" => $id],
                [
                    "cv" => $pathCv,
                    "ijazah" => $pathIjazah,
                    "rps" => $pathRps,
                    "foto_ktp" => $pathFotoKtp,
                    "buku_tabungan" => $pathBukuTabungan,
                    "surat_ketersediaan" => $pathSuratKetersediaan,
                ]
            );
            DB::commit();
            Session::flash("success", "Berhasil update biodata");
        } catch (Exception $e) {
            Log::error($e);
            DB::rollBack();
        }
    }

    public function detailTutor(Request $req, string $id) {
        if (Auth::guard("user_login")->user()->role === "tutor") return redirect()->back();
        $tutor = UserLogin::with(["pribadi", 'institusi', 'pendidikan', 'dokumen'])->where("id", $id)->first();
        return Inertia::render("custom/detail", [
            "user" => $tutor,
        ]);
    }

    public function download(string $path) {
    $fullPath = Storage::disk('public')->path($path);
    abort_unless(Storage::disk('public')->exists($path), 404);

    return response()->download($fullPath);
}
}
