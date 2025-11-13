import { CustomDatePicker } from '@/components/date.picker';
import InputComponent from '@/components/inpur';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { DataKota, DataProvinsi } from './utils';

export default function DataPribadi({
    namaLengkap,
    setNamaLengkap,
    email,
    setEmail,
    jk,
    setJk,
    nowa,
    setNowa,
    nip,
    setNip,
    nik,
    setNik,
    nidn,
    setNidn,
    provinsi,
    setProvinsi,
    kabkot,
    setKabkot,
    kodePos,
    setKodepos,
    alamat,
    setAlamat,
    norek,
    setNorek,
    atasNama,
    setAtasNama,
    namaBank,
    setNamaBank,
    tglLahir,
    setTglLahir,
    error,
}: {
    namaLengkap: string;
    setNamaLengkap: Dispatch<SetStateAction<string>>;
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
    jk: string;
    setJk: Dispatch<SetStateAction<string>>;
    nowa: string;
    setNowa: Dispatch<SetStateAction<string>>;
    nip: string;
    setNip: Dispatch<SetStateAction<string>>;
    nik: string;
    setNik: Dispatch<SetStateAction<string>>;
    nidn: string;
    setNidn: Dispatch<SetStateAction<string>>;
    provinsi: string;
    setProvinsi: Dispatch<SetStateAction<string>>;
    kabkot: string;
    setKabkot: Dispatch<SetStateAction<string>>;
    kodePos: string;
    setKodepos: Dispatch<SetStateAction<string>>;
    alamat: string;
    setAlamat: Dispatch<SetStateAction<string>>;
    norek: string;
    setNorek: Dispatch<SetStateAction<string>>;
    atasNama: string;
    setAtasNama: Dispatch<SetStateAction<string>>;
    namaBank: string;
    setNamaBank: Dispatch<SetStateAction<string>>;
    tglLahir?: Date;
    setTglLahir: Dispatch<SetStateAction<Date | undefined>>;
    error: Record<string, string>;
}) {
    const [dataKota, setDataKota] = useState<Record<string, string>>({});
    const nameToCodeProvinsi = (name: string): string => {
        const code = Object.entries(DataProvinsi).find(([key, value]) => value === name)?.[0] ?? ''
        return code
    }

    useEffect(() => {
        let tempKota = {}
        Object.entries(DataKota).forEach(([key, item]) => {
            if (key.startsWith(nameToCodeProvinsi(provinsi))) {
                tempKota = Object.assign(tempKota, { [key]: item });
            }
        });
        setDataKota(tempKota)
    }, [provinsi])
    return (
        <>
            <div className="text-md my-3 font-semibold">Data Pribadi</div>
            <div className="my-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div>
                    <InputComponent
                        defaultValue={namaLengkap}
                        title="Nama Lengkap"
                        id="namaLengkap"
                        name="namaLengkap"
                        type="text"
                        maxLength={100}
                        onChange={(value) => setNamaLengkap(value.target.value)}
                        autoFocus
                    />
                    <span className="-mt-4 text-sm text-red-500">
                        {error['namaLengkap'] ?? ''}
                    </span>
                </div>
                <div>
                    <InputComponent
                        defaultValue={email}
                        title="Email"
                        id="email"
                        name="email"
                        type="text"
                        onChange={(value) => setEmail(value.target.value)}
                    />
                    <span className="-mt-4 text-sm text-red-500">
                        {error['email'] ?? ''}
                    </span>
                </div>
            </div>
            <div className="my-4 grid grid-cols-1 gap-4 w-full lg:grid-cols-3">
                <div className="grid w-full gap-2">
                    <Label>Tanggal Lahir</Label>
                    <CustomDatePicker date={tglLahir} setDate={setTglLahir} />
                    <span className="-mt-2 text-sm text-red-500">
                        {error['tglLahir'] ?? ''}
                    </span>
                </div>
                <div className="grid w-full gap-4 lg:justify-center">
                    <Label>Jenis Kelamin</Label>
                    <Select
                        name="jk"
                        defaultValue={jk}
                        onValueChange={(value) => setJk(value)}
                    >
                        <SelectTrigger className="w-[300px]">
                            <SelectValue placeholder="Jenis Kelamin" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="laki-laki">Laki Laki</SelectItem>
                            <SelectItem value="wanita">Wanita</SelectItem>
                        </SelectContent>
                    </Select>
                    <span className="-mt-4 text-sm text-red-500">
                        {error['jk'] ?? ''}
                    </span>
                </div>
                <div className="grid w-full gap-2">
                    <Label>No WA / No Hp</Label>
                    <NumericFormat
                        defaultValue={nowa}
                        allowNegative={false}
                        customInput={Input}
                        maxLength={20}
                        onChange={(value) => setNowa(value.target.value)}
                        name="nowa"
                    />
                    <span className="-mt-4 text-sm text-red-500">
                        {error['nowa'] ?? ''}
                    </span>
                </div>
            </div>
            <div className="my-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="grid w-full gap-4">
                    <Label>NIP</Label>
                    <NumericFormat
                        defaultValue={nip}
                        allowLeadingZeros={true}
                        allowNegative={true}
                        customInput={Input}
                        maxLength={20}
                        onChange={(value) => setNip(value.target.value)}
                        name="nip"
                    />
                    <span className="-mt-4 text-sm text-red-500">
                        {error['nip'] ?? ''}
                    </span>
                </div>
                <div className="grid w-full gap-4">
                    <Label>NIK</Label>
                    <NumericFormat
                        defaultValue={nik}
                        allowLeadingZeros={true}
                        allowNegative={true}
                        customInput={Input}
                        maxLength={20}
                        onChange={(value) => setNik(value.target.value)}
                        name="nik"
                    />
                    <span className="-mt-4 text-sm text-red-500">
                        {error['nik'] ?? ''}
                    </span>
                </div>
                <div className="grid w-full gap-4">
                    <Label>NIDN</Label>
                    <NumericFormat
                        defaultValue={nidn}
                        allowLeadingZeros={true}
                        allowNegative={true}
                        customInput={Input}
                        maxLength={20}
                        onChange={(value) => setNidn(value.target.value)}
                        name="nidn"
                    />
                    <span className="-mt-4 text-sm text-red-500">
                        {error['nidn'] ?? ''}
                    </span>
                </div>
            </div>
            <Separator className="my-4" />
            <span className="text-md font-semibold">Alamat Domisili</span>
            <div className="my-4 grid grid-cols-1 lg:grid-cols-3">
                <div className="grid w-full gap-4">
                    <Label>Provinsi</Label>
                    <Select
                        defaultValue={nameToCodeProvinsi(provinsi)}
                        name="provinsi"
                        onValueChange={(value) => {
                            setProvinsi(DataProvinsi[value as keyof typeof DataProvinsi]);
                        }}
                    >
                        <SelectTrigger className="w-[300px]">
                            <SelectValue placeholder="Provinsi" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(DataProvinsi).map(
                                ([key, value]) => (
                                    <SelectItem key={key} value={key}>
                                        {value}
                                    </SelectItem>
                                ),
                            )}
                        </SelectContent>
                    </Select>
                    <span className="-mt-4 text-sm text-red-500">
                        {error['provinsi'] ?? ''}
                    </span>
                </div>
                <div className="grid w-full gap-4">
                    <Label>Kab / Kota</Label>
                    <Select
                        name="kabkot"
                        defaultValue={kabkot}
                        onValueChange={(value) => setKabkot(value)}
                    >
                        <SelectTrigger className="w-[300px]">
                            <SelectValue placeholder="Kab / Kota" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(dataKota).map(([key, value]) => (
                                <SelectItem key={key} value={value}>
                                    {value}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <span className="-mt-4 text-sm text-red-500">
                        {error['kabkot'] ?? ''}
                    </span>
                </div>
                <div className="grid w-full gap-4">
                    <Label>Kode POS</Label>
                    <NumericFormat
                        defaultValue={kodePos}
                        allowLeadingZeros={true}
                        allowNegative={false}
                        inputMode="decimal"
                        customInput={Input}
                        onChange={(value) => setKodepos(value.target.value)}
                        name="kodePos"
                    />
                    <span className="-mt-2 text-sm text-red-500">
                        {error['kodePos'] ?? ''}
                    </span>
                </div>
            </div>
            <div className="my-4 grid grid-cols-1 gap-4 lg:grid-cols-1">
                <div className="grid w-full gap-4">
                    <Label>Alamat</Label>
                    <Textarea
                        onChange={(value) => setAlamat(value.target.value)}
                        name="alamat"
                        defaultValue={alamat}
                    />
                    <span className="-mt-4 text-sm text-red-500">
                        {error['alamat'] ?? ''}
                    </span>
                </div>
            </div>
            <Separator className="my-4" />
            <span className="text-md font-semibold">Rekening</span>
            <div className="my-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="grid w-full gap-4">
                    <Label>No Rekening</Label>
                    <NumericFormat
                        defaultValue={norek}
                        allowLeadingZeros={true}
                        allowNegative={false}
                        decimalScale={0}
                        thousandSeparator={false}
                        customInput={Input}
                        onChange={(value) => setNorek(value.target.value)}
                        name="norek"
                    />
                    <span className="-mt-4 text-sm text-red-500">
                        {error['norek'] ?? ''}
                    </span>
                </div>
                <div className="grid w-full gap-4">
                    <InputComponent
                        defaultValue={atasNama}
                        title="Atas Nama"
                        id="atasNama"
                        name="atasNama"
                        type="text"
                        maxLength={100}
                        onChange={(value) => setAtasNama(value.target.value)}
                    />
                    <span className="-mt-4 text-sm text-red-500">
                        {error['atasNama'] ?? ''}
                    </span>
                </div>
                <div className="grid w-full gap-4">
                    <InputComponent
                        defaultValue={namaBank}
                        title="Nama Bank"
                        id="namaBank"
                        name="namaBank"
                        type="text"
                        maxLength={100}
                        onChange={(value) => setNamaBank(value.target.value)}
                    />
                    <span className="-mt-4 text-sm text-red-500">
                        {error['namaBank'] ?? ''}
                    </span>
                </div>
            </div>
        </>
    );
}
