<?php

namespace App\Exports;

use App\Models\Lamaran;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class LamaranExport implements FromCollection, WithMapping, WithHeadings
{
    protected $data;

    public function __construct()
    {   
        $this->data = Lamaran::with(["user_login.pribadi", "user_login.institusi"])->get();
    }

    // DATA SUDAH SIAP, TIDAK QUERY DB
    public function collection()
    {
        Log::debug(json_encode($this->data));
        return collect($this->data);
    }

    // MAPPING MANUAL (INI YANG LO MAU)
    public function map($row): array
    {
        return [
            $row->user_login->pribadi->nama_lengkap ?? '-',        // manual field
            $row->user_login->pribadi->email ?? '-',        // manual field
            $row->user_login->pribadi->tgl_lahir ?? '-',        // manual field
            $row->user_login->pribadi->nowa ?? '-',        // manual field
            $row->user_login->pribadi->provinsi ?? '-',        // manual field
            $row->user_login->pribadi->kabkot ?? '-',        // manual field
            $row->user_login->pribadi->alamat ?? '-',        // manual field
            $row->user_login->pribadi->kodepos ?? '-',        // manual field
            $row->user_login->pribadi->nik ?? '-',        // manual field
            $row->user_login->pribadi->nip ?? '-',        // manual field
            $row->user_login->pribadi->nidn ?? '-',        // manual field
            $row->user_login->pribadi->nuptk ?? '-',        // manual field
            $row->user_login->institusi->institusi ?? '-',        // manual field
            $row->user_login->institusi->status_pekerjaan ?? '-',        // manual field
            $row->user_login->institusi->masa_kerja ?? '-',        // manual field
            $row->user_login->institusi->golongan ?? '-',        // manual field
            $row->user_login->institusi->bidang_pekerjaan ?? '-',        // manual field
            $row->status,
        ];
    }

    public function headings(): array
    {
        return [
            'Nama Lengkap',
            'Email',
            'Tanggal Lahir',
            'No. HP',
            'Provinsi',
            'Kabupaten/Kota',
            'Alamat',
            'Kode Pos',
            'NIK',
            'NIP',
            'NIDN',
            'NUPTK',
            'Institusi',
            'Status Pekerjaan',
            'Masa Kerja',
            'Golongan',
            'Bidang Pekerjaan',
            'Status Lamaran' ,
        ];
    }
}
