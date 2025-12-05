import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
    groups: string[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export type Pribadi = {
    id: number;
    nama_lengkap: string;
    email: string;
    nowa: string;
    jk: string;
    tgl_lahir: Date;
    nip: string;
    nik: string;
    nuptk: string;
    npwp: string;
    golongan: string;
    nidn: string;
    alamat: string;
    provinsi: string;
    kabkot: string;
    kodepos: string;
    norek: string;
    atas_nama: string;
    nama_bank: string;
};

export type Institusi = {
    id: number;
    institusi: string;
    status_pekerjaan: string;
    masa_kerja: string;
    golongan: string;
    bidang_pekerjaan: string;
};

export type Pendidikan = {
    id: number;
    perguruan_tinggi: string;
    jenjang: string;
    bidang_studi: string;
    tahun_lulus: string;
    gelar_depan: string;
    gelar_belakang: string;
};

export type PendidikanPayload = {
    perguruan_tinggi: string;
    jenjang: string;
    bidang_studi: string;
    tahun_lulus: string;
    gelar_depan: string;
    gelar_belakang: string;
};

export type Dokumen = {
    id: number;
    cv: string;
    ijazah: string;
    rps: string;
    foto_ktp: string;
    buku_tabungan: string;
    surat_ketersediaan: string;
};

export type User = {
    id: number;
    email: string;
    password: string;
    pribadi: Pribadi;
    institusi: Institusi;
    pendidikan: Pendidikan[];
    dokumen: Dokumen;
};

export type Fakultas = {
    id: number;
    kode_fakultas: string;
    nama: string;
};

export type Prodi = {
    id: number;
    kode_prodi: string;
    nama: string;
    fakultas: Fakultas;
};

export type Matkul = {
    id: number;
    kode_matkul: string;
    nama: string;
    prodi: Prodi;
    semester: string
};

export type LamaranType = {
    id: number;
    status: string;
    user_id: number;
    matkul_id: number;
    user_login: User;
    matkul: Matkul;
};

export type ResponseApi = { data: string; message: string; error: string };

export const BASEURL = 'http://localhost:8000';
export const DEFAULT_ERROR_MESSAGE = 'Terjadi Kesalahan';
