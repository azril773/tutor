<?php

namespace App\Http\Controllers;

use App\Exports\LamaranExport;
use App\Mail\approve;
use App\Mail\reject;
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
use Error;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

use function Termwind\render;

class DashboardController extends Controller
{
    //
    public function view(Request $req)
    {
        $fakultas = Fakultas::all();
        $prodi = Prodi::with("fakultas")->get();
        $matkul = Matkul::with("prodi")->get();
        $tutors = UserLogin::with(["pribadi", 'institusi', 'pendidikan', 'dokumen'])->get();
        $user = Auth::guard("user_login")->user();
        $role = $user->role;
        return Inertia::render("custom/lamaran", [
            "fakultas" => $fakultas,
            "prodi" => $prodi,
            "matkul" => $matkul,
            "role" => $role,
            "user_id" => $user->id,
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
        $dokumen = Dokumen::where("user_id", $user->id)->first();
        return Inertia::render("custom/biodata", [
            "idUser" => $user->id,
            "role" => $role,
            "dataPribadi" => $pribadi,
            "dataInstitusi" => $institusi,
            "dataPendidikan" => $pendidikan,
            "dokumen" => $dokumen,
        ]);
    }

    public function prosesLamaran(Request $req)
    {
        $validated = $req->validate([
            "fakultas" => "required|string",
            "prodi" => "required|string",
            "matkul" => "required|string",
            "semester" => "required|string",
        ]);

        $matkul = $req->matkul;
        $semester = $req->semester;
        $getMatkul = Matkul::where("kode_matkul", $matkul)->where("semester", $semester)->get();

        if ($getMatkul->isEmpty()) {
            return redirect()->back()->withErrors([
                "matkulError" => "Matkul not found."
            ]);
        }

        if ($getMatkul[0]->kuota <= 0) {
            return redirect()->back()->withErrors([
                "matkulError" => "Kuota mata kuliah sudah penuh."
            ]);
        }

        $user = Auth::guard("user_login")->user();
        if ($user->role !== 'tutor') {
            return redirect()->back()->withErrors([
                "error" => "Access denied!"
            ]);
        }
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
        Session::flash("success", "Berhasil melamar");
        return redirect()->intended("/dashboard");
    }

    public function resetPassword(Request $req)
    {
        return Inertia::render("custom/reset-password");
    }


    public function approveLamaran(Request $req)
    {
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

        $lamaran = Lamaran::with("user_login", "user_login.pribadi")->findOrFail($id);
        $lamaran->update([
            "status" => "APPROVED"
        ]);
        Mail::to($lamaran->user_login->email)->send(new approve($lamaran->user_login->pribadi->nama_lengkap));
        Session::flash("success", 'Berhasil approve lamaran');
        return redirect()->intended("/dashboard");
    }

    public function rejectLamaran(Request $req)
    {
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

        $lamaran = Lamaran::with("user_login", "user_login.pribadi")->findOrFail($id);
        $lamaran->update([
            "status" => "REJECTED"
        ]);
        Mail::to($lamaran->user_login->email)->send(new reject($lamaran->user_login->pribadi->nama_lengkap));
        Session::flash("success", 'Berhasil reject lamaran');
        return redirect()->intended("/dashboard");
    }

    public function resetPasswordPost(Request $req)
    {
        $validated = $req->validate([
            "passwordlama" => "required|string",
            "password" => "required|string",
            "password2" => "required|string"
        ]);

        $passwordlama = $req->passwordlama;
        $password = $req->password;
        $password2 = $req->password2;

        if ($password !== $password2) {
            return redirect()->intended("/reset-password")->withErrors([
                "password" => "Password tidak cocok"
            ]);
        };
        $user = Auth::guard("user_login")->user();

        if (!Hash::check($passwordlama, $user->password)) {
            return redirect()->intended("/reset-password")->withErrors([
                "password" => "Password lama salah"
            ]);
        }

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
        $req->validate([
            "id" => "required|string",
            'cv' => 'nullable|mimetypes:application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document|max:2048',
            'ijazah' => 'nullable|mimes:pdf,docx|max:2048',
            'rps' => 'nullable|mimes:pdf,docx|max:2048',
            'fotoKtp' => 'nullable|mimetypes:image/jpg,image/jpeg,image/png,image/gif,image/webp|max:2048',
            'bukuTabungan' => 'nullable|mimes:pdf,docx,image/jpg,image/jpeg,image/png,image/gif,image/webp|max:2048',
            'suratKetersediaan' => 'nullable|mimes:pdf,docx|max:2048',
        ], [
            'cv.max' => 'Ukuran file CV maksimal 2MB.',
            'ijazah.max' => 'Ukuran file Ijazah maksimal 2MB.',
            'rps.max' => 'Ukuran file RPS maksimal 2MB.',
            'fotoKtp.max' => 'Ukuran file Foto KTP maksimal 2MB.',
            'bukuTabungan.max' => 'Ukuran file Buku Tabungan maksimal 2MB.',
            'suratKetersediaan.max' => 'Ukuran file Surat Ketersediaan maksimal 2MB.',
            'cv.mimetypes' => 'Format file CV tidak didukung.',
            'ijazah.mimetypes' => 'Format file Ijazah tidak didukung.',
            'rps.mimetypes' => 'Format file RPS tidak didukung.',
            'fotoKtp.mimetypes' => 'Format file Foto KTP tidak didukung.',
            'bukuTabungan.mimetypes' => 'Format file Buku Tabungan tidak didukung.',
            'suratKetersediaan.mimetypes' => 'Format file Surat Ketersediaan tidak didukung.',
        ]);

        $id = $req->id;
        $user = UserLogin::where("id", $id)->first();

        if (!$user) {
            return redirect()->intended("/biodata")->withErrors([
                "error" => "User tidak ditemukan"
            ]);
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
        $nuptk = $req->nuptk;
        $npwp = $req->npwp;
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
        $golongan = $req->golongan;
        $bidangPekerjaan = $req->bidangPekerjaan;

        // Pendidikan



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
                    "nuptk" => $nuptk,
                    "npwp" => $npwp,
                    "alamat" => $alamat,
                    "provinsi" => $provinsi,
                    "kabkot" => $kabkot,
                    "kodepos" => $kodePos,
                    "norek" => $norek,
                    "atas_nama" => $atasNama,
                    "nama_bank" => $namaBank,
                ]
            );

            Institusi::updateOrCreate(
                ["user_id" => $id],
                [
                    "institusi" => $institusi,
                    "status_pekerjaan" => $statusPekerjaan,
                    "masa_kerja" => $masaKerja,
                    "golongan" => $golongan,
                    "bidang_pekerjaan" => $bidangPekerjaan,
                ]
            );

            Pendidikan::where('user_id', $id)->delete();

            $pendidikan = $req->pendidikan;
            $dataPendidikan = [];
            foreach ($pendidikan as $item) {
                $dataPendidikan[] = array_merge((array)$item, ['user_id' => $id]);
            }

            Pendidikan::insert($dataPendidikan);
            $dokumen = Dokumen::where("user_id", $id)->first();
            if (empty($dokumen->cv) && empty($req->file("cv"))) {
                return response()->json("Dokumen CV harus diisi", 400);
            }
            if (empty($dokumen->ijazah) && empty($req->file("ijazah"))) {
                return response()->json("Dokumen Ijazah harus diisi", 400);
            }
            if (empty($dokumen->rps) && empty($req->file("rps"))) {
                return response()->json("Dokumen RPS harus diisi", 400);
            }
            if (empty($dokumen->foto_ktp) && empty($req->file("fotoKtp"))) {
                return response()->json("Dokumen Foto KTP harus diisi", 400);
            }
            if (empty($dokumen->buku_tabungan) && empty($req->file("bukuTabungan"))) {
                return response()->json("Dokumen Buku Tabungan harus diisi", 400);
            }
            if (empty($dokumen->surat_ketersediaan) && empty($req->file("suratKetersediaan"))) {
                return response()->json("Dokumen Surat Ketersediaan harus diisi", 400);
            }

            if ($dokumen) {
                if (!empty($req->file("cv"))) Storage::disk("public")->delete($dokumen->cv);
                if (!empty($req->file("ijazah"))) Storage::disk("public")->delete($dokumen->ijazah);
                if (!empty($req->file("rps"))) Storage::disk("public")->delete($dokumen->rps);
                if (!empty($req->file("fotoKtp"))) Storage::disk("public")->delete($dokumen->foto_ktp);
                if (!empty($req->file("bukuTabungan"))) Storage::disk("public")->delete($dokumen->buku_tabungan);
                if (!empty($req->file("suratKetersediaan"))) Storage::disk("public")->delete($dokumen->surat_ketersediaan);
            }

            $pathCv = !empty($req->file("cv")) ? $req->file("cv")->store("dokumen", 'public') : '';

            $pathIjazah = !empty($req->file('ijazah')) ? $req->file("ijazah")->store("dokumen", 'public') : '';

            $pathRps = !empty($req->file("rps")) ? $req->file("rps")->store("dokumen", 'public') : '';

            $pathFotoKtp = !empty($req->file('fotoKtp')) ? $req->file("fotoKtp")->store("dokumen", 'public') : '';

            $pathBukuTabungan = !empty($req->file("bukuTabungan")) ? $req->file("bukuTabungan")->store("dokumen", 'public') : '';

            $pathSuratKetersediaan = !empty($req->file('suratKetersediaan')) ? $req->file("suratKetersediaan")->store("dokumen", 'public') : '';

            $data = array_filter([
                "cv" => $pathCv,
                "ijazah" => $pathIjazah,
                "rps" => $pathRps,
                "foto_ktp" => $pathFotoKtp,
                "buku_tabungan" => $pathBukuTabungan,
                "surat_ketersediaan" => $pathSuratKetersediaan,
            ], function ($v) {
                return !empty($v);
            });

            $dokumen = Dokumen::updateOrCreate(
                ["user_id" => $id],
                $data
            );
            DB::commit();
            Session::flash("success", "Berhasil update biodata");
            return redirect()->intended("/biodata");
        } catch (Exception $e) {
            return redirect()->intended("/biodata")->withErrors([
                "error" => "Gagal update biodata"
            ]);
            DB::rollBack();
        }
    }

    public function detailTutor(Request $req, string $id)
    {
        $user = Auth::guard("user_login")->user();
        if ($user->role === "tutor") {
            if ($user->id != $id) return redirect()->intended("/dashboard");
            $tutor = UserLogin::with(["pribadi", 'institusi', 'pendidikan', 'dokumen'])->where("id", $id)->first();
        } else {
            $tutor = UserLogin::with(["pribadi", 'institusi', 'pendidikan', 'dokumen'])->where("id", $id)->first();
        }
        return Inertia::render("custom/detail", [
            "user" => $tutor,
        ]);
    }

    public function download(string $path)
    {
        $fullPath = Storage::disk('public')->path($path);
        abort_unless(Storage::disk('public')->exists($path), 404);

        return response()->download($fullPath);
    }

    public function getTutors(Request $req)
    {
        $user = Auth::guard("user_login")->user();
        if ($user->role == 'tutor') {
            return response()->json([
                "data" => [],
                "totalPage" => 0
            ]);
        }
        $limit = 10;
        $currentPage = intval($req->query("page")) ?? 1;
        $nama = $req->query("nama") ?? '';
        $skip = ($currentPage - 1) * $limit;

        $tutors = UserLogin::with(["pribadi"])->where("role", 'tutor')->whereHas("pribadi", function ($query) use ($nama) {
            $query->where("nama_lengkap", 'ILIKE', "%" . $nama . "%");
        });
        $count = $tutors->count();
        return response()->json([
            "data" => $tutors->skip($skip)->take($limit)->get(),
            "totalPage" => ceil($count / $limit)
        ]);
    }


    public function getApplications(Request $req)
    {
        $limit = 10;
        $currentPage = intval($req->query("page")) ?? 1;
        $nama = $req->query("nama") ?? '';
        $user_id = $req->query("user_id");
        $skip = ($currentPage - 1) * $limit;

        $user = Auth::guard("user_login")->user();


        if ($user->role === 'admin') {
            $applications = Lamaran::with(["matkul", "matkul.prodi", 'matkul.prodi.fakultas', "user_login", 'user_login.pribadi'])->whereHas("user_login", function ($q) use ($nama) {
                $q->whereHas("pribadi", function ($q) use ($nama) {
                    $q->where("nama_lengkap", 'ILIKE', '%' . $nama . '%');
                });
            });
            $count = $applications->count();
            return response()->json([
                "data" => $applications->skip($skip)->take($limit)->get(),
                "totalPage" => ceil($count / $limit)
            ]);
        }
        if ($user_id && $user->id == $user_id) {
            $applications = Lamaran::with(["matkul", "matkul.prodi", 'matkul.prodi.fakultas', "user_login", 'user_login.pribadi'])->whereHas("user_login", function ($q) use ($nama) {
                $q->whereHas("pribadi", function ($q) use ($nama) {
                    $q->where("nama_lengkap", 'ILIKE', '%' . $nama . '%');
                });
            })->where("user_id", $user_id);
            $count = $applications->count();
            return response()->json([
                "data" => $applications->skip($skip)->take($limit)->get(),
                "totalPage" => ceil($count / $limit)
            ]);
        }
        return response()->json([
            "data" => [],
            "totalPage" => ceil(0 / $limit)
        ]);
    }


    public function fakultas(Request $req)
    {
        $req->validate([
            "kode_fakultas" => "required|string",
            "fakultas" => "required|string"
        ]);

        $kode_fakultas = $req->kode_fakultas;
        $fakultas = $req->fakultas;

        $existFakultas = Fakultas::where(function ($que) use ($fakultas) {
            $que->where("nama", 'ILIKE', $fakultas)->orWhere("kode_fakultas", 'ILIKE', $fakultas);
        })->first();
        $existKodeFakultas = Fakultas::where(function ($que) use ($kode_fakultas) {
            $que->where("nama", 'ILIKE', $kode_fakultas)->orWhere("kode_fakultas", 'ILIKE', $kode_fakultas);
        })->first();
        if (!empty($existFakultas) || !empty($existKodeFakultas)) {
            return redirect()->intended('/master-fakultas')->withErrors([
                "error" => "Fakultas sudah ada"
            ]);
        };

        $fakul = new Fakultas();
        $fakul->kode_fakultas = $kode_fakultas;
        $fakul->nama = $fakultas;
        $fakul->save();
        Session::flash("success", 'Berhasil buat fakultas');
        return redirect()->intended("/master-fakultas");
    }



    public function prodi(Request $req)
    {
        $req->validate([
            "fakultas_id" => "required|string",
            "kode_prodi" => "required|string",
            "prodi" => "required|string"
        ]);
        $fakultas_id = $req->fakultas_id;
        $kode_prodi = $req->kode_prodi;
        $prodi = $req->prodi;

        $existProdi = Prodi::where(function ($que) use ($prodi) {
            $que->where("nama", 'ILIKE', $prodi)->orWhere("kode_prodi", 'ILIKE', $prodi);
        })->first();
        $existKodeProdi = Prodi::where(function ($que) use ($kode_prodi) {
            $que->where("nama", 'ILIKE', $kode_prodi)->orWhere("kode_prodi", 'ILIKE', $kode_prodi);
        })->first();
        if (!empty($existProdi) || !empty($existKodeProdi)) {
            return redirect()->intended('/master-prodi')->withErrors([
                "error" => "Prodi sudah ada"
            ]);
        };

        $fakultas = Fakultas::where("id", '=', $fakultas_id)->first();
        if (empty($fakultas)) {
            return redirect()->intended("/master-prodi")->withErrors([
                "error" => "Fakultas tidak ada"
            ]);
        };

        $prod = new Prodi();
        $prod->fakultas_id = $fakultas_id;
        $prod->kode_prodi = $kode_prodi;
        $prod->nama = $prodi;
        $prod->save();
        Session::flash("success", 'Berhasil buat prodi');
        return redirect()->intended("/master-prodi");
    }


    public function matkul(Request $req)
    {
        $req->validate([
            "prodi_id" => "required|string",
            "kode_matkul" => "required|string",
            "matkul" => "required|string",
            "kuota" => "required|integer",
            "semester" => "required|string"
        ]);
        $prodi_id = $req->prodi_id;
        $kode_matkul = $req->kode_matkul;
        $matkul = $req->matkul;
        $kuota = $req->kuota;
        $semester = $req->semester;

        $existMatkul = Matkul::where(function ($que) use ($matkul) {
            $que->where("nama", 'ILIKE', $matkul)->orWhere("kode_matkul", 'ILIKE', $matkul);
        })->first();
        $existKodeMatkul = Matkul::where(function ($que) use ($kode_matkul) {
            $que->where("nama", 'ILIKE', $kode_matkul)->orWhere("kode_matkul", 'ILIKE', $kode_matkul);
        })->first();
        if (!empty($existMatkul) || !empty($existKodeMatkul)) {
            return redirect()->intended('/master-matkul')->withErrors([
                "error" => "Matkul sudah ada"
            ]);
        };

        $prodi = Prodi::where("id", '=', $prodi_id)->first();
        if (empty($prodi)) {
            return redirect()->intended("/master-matkul")->withErrors([
                "error" => "Prodi tidak ada"
            ]);
        };

        $mat = new Matkul();
        $mat->prodi_id = $prodi_id;
        $mat->kode_matkul = $kode_matkul;
        $mat->nama = $matkul;
        $mat->kuota = $kuota;
        $mat->semester = $semester;
        $mat->save();
        Session::flash("success", 'Berhasil buat matkul');
        return redirect()->intended("/master-matkul");
    }

    public function import_matkul(Request $req)
    {
        $req->validate([
            "prodi_id" => "required|string",
            'file' => 'required|mimetypes:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv,text/plain|max:5120'
        ], [
            'file.required' => 'File wajib diupload.',
            'file.mimetypes' => 'Tipe file harus .xlsx, .csv, atau .txt.',
            'file.max' => 'Ukuran file maksimal 5MB.'
        ]);
        try {
            $prodi_id = $req->prodi_id;
            $prodi = Prodi::where("id", '=', $prodi_id)->first();
            if (empty($prodi)) {
                return redirect()->intended("/master-matkul")->withErrors([
                    "error" => "Prodi tidak ada"
                ]);
            };

            $rows = Excel::toArray([], $req->file('file'))[0];

            $headers = array_map(fn($col) => strtolower(str_replace(" ", "_", $col)), $rows[0]);
            $allowedColumns = ["nama", "kuota", "kode_matkul", 'semester'];
            foreach ($headers as $value) {
                if (!in_array($value, $allowedColumns)) {
                    return redirect()->intended("/master-matkul")->withErrors([
                        "error" => "Nama Kolom tidak sesuai. Harus 'nama', 'kuota', 'kode_matkul', 'semester'"
                    ]);
                };
            }

            $result = [];

            $existKodeAndNama = [];

            $matkul = Matkul::all();

            foreach ($matkul as $mat) {
                $existKodeAndNama[] = $mat->nama;
                $existKodeAndNama[] = $mat->kode_matkul;
            }

            foreach (array_slice($rows, 1) as $row) {
                if (in_array($row[1], $existKodeAndNama)) return redirect()->intended("/master-data")->withErrors([
                    "error" => 'Kode ' . $row[1] . " sudah ada"
                ]);
                if (in_array($row[0], $existKodeAndNama)) return redirect()->intended("/master-data")->withErrors([
                    "error" => 'Nama ' . $row[0] . " sudah ada"
                ]);

                $result[] = array_combine([...$headers, 'prodi_id'], [...$row, $prodi_id]);
            }



            Matkul::insert($result);

            Session::flash("success", 'Berhasil buat matkul');
            return redirect()->intended("/master-matkul");
        } catch (Exception $e) {
            return redirect()->intended("/master-matkul")->withErrors([
                'error' => "Terjadi kesalahan"
            ]);
        }
    }

    public function getFakultas(Request $req)
    {
        $limit = 10;
        $currentPage = intval($req->query("page")) ?? 1;
        $nama = $req->query("nama") ?? '';
        $skip = ($currentPage - 1) * $limit;

        $fakultas = Fakultas::where("nama", 'ILIKE', '%' . $nama . '%');
        // with(["pribadi"])->whereHas("pribadi", function ($query) use ($nama) {
        //     Log::debug($nama);
        //     $query->where("nama_lengkap", 'ILIKE', "%" . $nama . "%");
        // });
        $count = $fakultas->count();
        return response()->json([
            "data" => $fakultas->skip($skip)->take($limit)->get(),
            "totalPage" => ceil($count / $limit)
        ]);
    }

    public function editFakultas(Request $req, string $id)
    {
        $fakultasData = Fakultas::where("id", $id)->first();
        if (empty($fakultasData)) {
            return redirect()->intended('/master-fakultas')->withErrors([
                "error" => "Fakultas tidak ditemukan"
            ]);
        };
        return Inertia::render("master/edit/fakultas", [
            'fakultas' => $fakultasData
        ]);
    }

    public function prosesDeleteFakultas(Request $req, string $id)
    {
        $fakultasData = Fakultas::where("id", $id)->first();
        if (empty($fakultasData)) {
            return redirect()->intended('/master-fakultas')->withErrors([
                "error" => "Fakultas tidak ditemukan"
            ]);
        };
        $fakultasData->delete();
        Session::flash("success", 'Berhasil hapus fakultas');
        return redirect()->intended("/master-fakultas");
    }

    public function prosesEditFakultas(Request $req)
    {
        $req->validate([
            "id" => "required|string",
            "kode_fakultas" => "required|string",
            "fakultas" => "required|string"
        ]);

        $kode_fakultas = $req->kode_fakultas;
        $fakultas = $req->fakultas;

        $fakultasData = Fakultas::where("id", $req->id)->first();
        if (empty($fakultasData)) {
            return redirect()->intended('/master-fakultas')->withErrors([
                "error" => "Fakultas tidak ditemukan"
            ]);
        };

        $existFakultas = Fakultas::whereNot("id", $req->id)->where(function ($que) use ($fakultas) {
            $que->where("nama", 'ILIKE', $fakultas)->orWhere("kode_fakultas", 'ILIKE', $fakultas);
        })->first();
        $existKodeFakultas = Fakultas::whereNot("id", $req->id)->where(function ($que) use ($kode_fakultas) {
            $que->where("nama", 'ILIKE', $kode_fakultas)->orWhere("kode_fakultas", 'ILIKE', $kode_fakultas);
        })->first();
        if (!empty($existFakultas) || !empty($existKodeFakultas)) {
            return redirect()->intended('/fakultas/'.$req->id.'/edit')->withErrors([
                "error" => "Fakultas sudah ada"
            ]);
        };

        $fakultasData->kode_fakultas = $kode_fakultas;
        $fakultasData->nama = $fakultas;
        $fakultasData->save();
        Session::flash("success", 'Berhasil edit fakultas');
        return redirect()->intended("/master-fakultas");
    }

    public function getProdi(Request $req)
    {
        $limit = 10;
        $currentPage = intval($req->query("page")) ?? 1;
        $nama = $req->query("nama") ?? '';
        $skip = ($currentPage - 1) * $limit;

        $prodi = Prodi::where("nama", 'ILIKE', '%' . $nama . '%')->with("fakultas");
        // with(["pribadi"])->whereHas("pribadi", function ($query) use ($nama) {
        //     Log::debug($nama);
        //     $query->where("nama_lengkap", 'ILIKE', "%" . $nama . "%");
        // });
        $count = $prodi->count();
        return response()->json([
            "data" => $prodi->skip($skip)->take($limit)->get(),
            "totalPage" => ceil($count / $limit)
        ]);
    }

    public function editProdi(Request $req, string $id)
    {
        $prodiData = Prodi::with("fakultas")->where("id", $id)->first();
        $fakultas = Fakultas::get();
        if (empty($prodiData)) {
            return redirect()->intended('/master-prodi')->withErrors([
                "error" => "Prodi tidak ditemukan"
            ]);
        };
        return Inertia::render("master/edit/prodi", [
            'prodi' => $prodiData,
            'fakultas' => $fakultas
        ]);
    }

    public function prosesEditProdi(Request $req)
    {
        $req->validate([
            "id" => "required|string",
            "fakultas_id" => "required|string",
            "kode_prodi" => "required|string",
            "prodi" => "required|string"
        ]);

        $fakultas_id = $req->fakultas_id;
        $kode_prodi = $req->kode_prodi;
        $prodi = $req->prodi;

        $prodiData = Prodi::where("id", $req->id)->first();
        if (empty($prodiData)) {
            return redirect()->intended('/master-prodi')->withErrors([
                "error" => "Prodi tidak ditemukan"
            ]);
        };

        $existProdi = Prodi::whereNot("id", $req->id)->where(function ($que) use ($prodi) {
            $que->where("nama", 'ILIKE', $prodi)->orWhere("kode_prodi", 'ILIKE', $prodi);
        })->first();
        $existKodeProdi = Prodi::whereNot("id", $req->id)->where(function ($que) use ($kode_prodi) {
            $que->where("nama", 'ILIKE', $kode_prodi)->orWhere("kode_prodi", 'ILIKE', $kode_prodi);
        })->first();
        if (!empty($existProdi) || !empty($existKodeProdi)) {
            return redirect()->intended('/prodi/'.$req->id.'/edit')->withErrors([
                "error" => "Prodi sudah ada"
            ]);
        };

        $fakultas = Fakultas::where("id", '=', $fakultas_id)->first();
        if (empty($fakultas)) {
            return redirect()->intended("/prodi/".$req->id."/edit")->withErrors([
                "error" => "Fakultas tidak ada"
            ]);
        };

        $prodiData->fakultas_id = $fakultas_id;
        $prodiData->kode_prodi = $kode_prodi;
        $prodiData->nama = $prodi;
        $prodiData->save();
        Session::flash("success", 'Berhasil edit prodi');
        return redirect()->intended("/master-prodi");
    }

    public function prosesDeleteProdi(Request $req) {
        $prodiData = Prodi::where("id", $req->id)->first();
        if (empty($prodiData)) {
            return redirect()->intended('/master-prodi')->withErrors([
                "error" => "Prodi tidak ditemukan"
            ]);
        };
        $prodiData->delete();
        Session::flash("success", 'Berhasil hapus prodi');
        return redirect()->intended("/master-prodi");
    }

    public function getMatkul(Request $req)
    {
        $limit = 10;
        $currentPage = intval($req->query("page")) ?? 1;
        $nama = $req->query("nama") ?? '';
        $skip = ($currentPage - 1) * $limit;

        $matkul = Matkul::where("nama", 'ILIKE', '%' . $nama . '%')->with("prodi");
        // with(["pribadi"])->whereHas("pribadi", function ($query) use ($nama) {
        //     Log::debug($nama);
        //     $query->where("nama_lengkap", 'ILIKE', "%" . $nama . "%");
        // });
        $count = $matkul->count();
        return response()->json([
            "data" => $matkul->skip($skip)->take($limit)->get(),
            "totalPage" => ceil($count / $limit)
        ]);
    }

    public function editMatkul(Request $req, string $id)
    {
        $matkulData = Matkul::with("prodi", "prodi.fakultas")->where("id", $id)->first();
        $prodi = Prodi::with("fakultas")->get();
        if (empty($matkulData)) {
            return redirect()->intended('/master-matkul')->withErrors([
                "error" => "Matkul tidak ditemukan"
            ]);
        };
        return Inertia::render("master/edit/matkul", [
            'matkul' => $matkulData,
            'prodi' => $prodi
        ]);
    }
    
    public function prosesEditMatkul(Request $req)
    {
        $req->validate([
            "id" => "required|string",
            "prodi_id" => "required|string",
            "kode_matkul" => "required|string",
            "matkul" => "required|string",
            "kuota" => "required|integer",
            "semester" => "required|string"
        ]);

        $prodi_id = $req->prodi_id;
        $kode_matkul = $req->kode_matkul;
        $matkul = $req->matkul;
        $kuota = $req->kuota;
        $semester = $req->semester;

        $matkulData = Matkul::where("id", $req->id)->first();
        if (empty($matkulData)) {
            return redirect()->intended('/master-matkul')->withErrors([
                "error" => "Matkul tidak ditemukan"
            ]);
        };

        $existMatkul = Matkul::whereNot("id", $req->id)->where(function ($que) use ($matkul) {
            $que->where("nama", 'ILIKE', $matkul)->orWhere("kode_matkul", 'ILIKE', $matkul);
        })->first();
        $existKodeMatkul = Matkul::whereNot("id", $req->id)->where(function ($que) use ($kode_matkul) {
            $que->where("nama", 'ILIKE', $kode_matkul)->orWhere("kode_matkul", 'ILIKE', $kode_matkul);
        })->first();
        if (!empty($existMatkul) || !empty($existKodeMatkul)) {
            return redirect()->intended('/matkul/'.$req->id.'/edit')->withErrors([
                "error" => "Matkul sudah ada"
            ]);
        };

        $prodi = Prodi::where("id", '=', $prodi_id)->first();
        if (empty($prodi)) {
            return redirect()->intended('/matkul/'.$req->id.'/edit')->withErrors([
                "error" => "Prodi tidak ada"
            ]);
        };

        $matkulData->prodi_id = $prodi_id;
        $matkulData->kode_matkul = $kode_matkul;
        $matkulData->nama = $matkul;
        $matkulData->kuota = $kuota;
        $matkulData->semester = $semester;
        $matkulData->save();
        Session::flash("success", 'Berhasil edit matkul');
        return redirect()->intended("/master-matkul");
    }

    public function prosesDeleteMatkul(Request $req, string $id)
    {
        $matkulData = Matkul::where("id", $id)->first();
        if (empty($matkulData)) {
            return redirect()->intended('/master-matkul')->withErrors([
                "error" => "Matkul tidak ditemukan"
            ]);
        };
        $matkulData->delete();
        Session::flash("success", 'Berhasil hapus matkul');
        return redirect()->intended("/master-matkul");
    }

    public function masterFakultas(Request $req)
    {
        return Inertia::render("master/fakultas");
    }

    public function masterProdi(Request $req)
    {
        $fakultas = Fakultas::all();
        return Inertia::render("master/prodi", [
            'fakultas' => $fakultas
        ]);
    }

    public function masterMatkul(Request $req)
    {
        $prodi = Prodi::with("fakultas")->get();
        // $matkul = Matkul::with("prodi")->get();
        return Inertia::render("master/matkul", [
            'prodi' => $prodi
        ]);
    }

    public function download_lamaran(Request $req)
    {
        return Excel::download(new LamaranExport, 'lamaran.xlsx');
    }
}
