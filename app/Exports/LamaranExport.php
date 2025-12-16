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
        $this->data = Lamaran::with(["user_login.pribadi"])->get();
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
            $row->user_login->email ?? '-',
            optional($row->created_at)->format('Y-m-d'),
            $row->status,
        ];
    }

    public function headings(): array
    {
        return [
            'Nama Lengkap',
            'Email',
            'Tanggal',
            'Status Lamaran' ,
        ];
    }
}
