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
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}


export type Pribadi = {
    nama_lengkap: string
    email: string
    nowa: string
    jk: string
    tgl_lahir: Date
    nip: string
    nik: string
    nidn: string
    alamat: string
    provinsi: string
    kabkot: string
    kodepos: string
    norek: string
    atas_nama: string
    nama_bank: string
    npwp: string
}

export type Institusi = {
    institusi: string
    status_pekerjaan: string
    masa_kerja: string
    pangkat: string
    bidang_pekerjaan: string
}


export type Pendidikan = {
    perguruan_tinggi: string;
    jenjang: string;
    bidang_studi: string;
    tahun_lulus: string;
    gelar_depan: string;
    gelar_belakang: string;
};


export type User = {
    id: number;
    email: string;
    password: string;
    pribadi: Pribadi
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
};

export type LamaranType = {
    id: number;
    status: string
    user_id: number;
    matkul_id: number;
    user_login: User;
    matkul: Matkul;
};
