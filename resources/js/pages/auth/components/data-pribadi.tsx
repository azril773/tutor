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
import { format } from 'date-fns';
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
    nuptk,
    setNuptk,
    npwp,
    setNpwp,
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
    nuptk: string;
    setNuptk: Dispatch<SetStateAction<string>>;
    npwp: string;
    setNpwp: Dispatch<SetStateAction<string>>;
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
        const code =
            Object.entries(DataProvinsi).find(
                ([key, value]) => value === name,
            )?.[0] ?? '';
        return code;
    };

    useEffect(() => {
        let tempKota = {};
        Object.entries(DataKota).forEach(([key, item]) => {
            if (key.startsWith(nameToCodeProvinsi(provinsi))) {
                tempKota = Object.assign(tempKota, { [key]: item });
            }
        });
        setDataKota(tempKota);
    }, [provinsi]);
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
                        required={true}
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
                        required={true}
                    />
                    <span className="-mt-4 text-sm text-red-500">
                        {error['email'] ?? ''}
                    </span>
                </div>
            </div>
            <div className="my-4 grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="grid w-full gap-2">
                    <Label>
                        Tanggal Lahir <span className="text-red-500">*</span>
                    </Label>
                    <input
                        type="hidden"
                        name="tgl_lahir"
                        value={tglLahir ? format(tglLahir, 'yyyy-MM-dd') : ''}
                    />
                    <CustomDatePicker date={tglLahir} setDate={setTglLahir} />
                    <span className="-mt-2 text-sm text-red-500">
                        {error['tglLahir'] ?? ''}
                    </span>
                </div>
                <div className="grid w-full gap-4 lg:justify-center">
                    <Label>
                        Jenis Kelamin <span className="text-red-500">*</span>
                    </Label>
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
                    <Label>
                        No WA / No Hp <span className="text-red-500">*</span>
                    </Label>
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
                    <Label>
                        NIP <span className="text-red-500">*</span>
                    </Label>
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
                    <Label>
                        NIK <span className="text-red-500">*</span>
                    </Label>
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
                    <Label>
                        NIDN <span className="text-red-500">*</span>
                    </Label>
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
            <div className="my-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="grid w-full gap-4">
                    <Label>
                        NUPTK <span className="text-red-500">*</span>
                    </Label>
                    <NumericFormat
                        defaultValue={nuptk}
                        allowLeadingZeros={true}
                        allowNegative={true}
                        customInput={Input}
                        maxLength={20}
                        onChange={(value) => setNuptk(value.target.value)}
                        name="nuptk"
                    />
                    <span className="-mt-4 text-sm text-red-500">
                        {error['nuptk'] ?? ''}
                    </span>
                </div>
                <div className="grid w-full gap-4">
                    <Label>
                        NPWP <span className="text-red-500">*</span>
                    </Label>
                    <NumericFormat
                        defaultValue={npwp}
                        allowLeadingZeros={true}
                        allowNegative={true}
                        customInput={Input}
                        maxLength={20}
                        onChange={(value) => setNpwp(value.target.value)}
                        name="npwp"
                    />
                    <span className="-mt-4 text-sm text-red-500">
                        {error['npwp'] ?? ''}
                    </span>
                </div>
            </div>
            <Separator className="my-4" />
            <span className="text-md font-semibold">Alamat Domisili </span>
            <div className="my-4 grid grid-cols-1 lg:grid-cols-3">
                <div className="grid w-full gap-4">
                    <Label>
                        Provinsi <span className="text-red-500">*</span>
                    </Label>
                    <Select
                        defaultValue={provinsi}
                        name='provinsi'
                        onValueChange={(value) => {
                            console.log(value);
                            console.log(value);
                            setProvinsi(value);
                        }}
                    >
                        <SelectTrigger className="w-[300px]">
                            <SelectValue placeholder="Provinsi" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(DataProvinsi).map(
                                ([key, value]) => (
                                    <SelectItem key={value} value={value}>
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
                    <Label>
                        Kab / Kota <span className="text-red-500">*</span>
                    </Label>
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
                    <Label>
                        Kode POS <span className="text-red-500">*</span>
                    </Label>
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
                    <Label>
                        Alamat <span className="text-red-500">*</span>
                    </Label>
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
            <span className="text-md font-semibold">Rekening </span>
            <div className="my-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="grid w-full gap-4">
                    <Label>
                        No Rekening <span className="text-red-500">*</span>
                    </Label>
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
                        required={true}
                    />
                    <span className="-mt-4 text-sm text-red-500">
                        {error['atasNama'] ?? ''}
                    </span>
                </div>
                <div className="grid w-full gap-4">
                    <Label>
                        Bank <span className="text-red-500">*</span>
                    </Label>
                    <Select
                        name="namaBank"
                        defaultValue={namaBank}
                        onValueChange={(value) => setNamaBank(value)}
                    >
                        <SelectTrigger className="w-[300px]">
                            <SelectValue placeholder="Bank" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={'BRI'}>{'BRI'}</SelectItem>
                            <SelectItem value={'BSI'}>{'BSI'}</SelectItem>
                        </SelectContent>
                    </Select>
                    <span className="-mt-4 text-sm text-red-500">
                        {error['namaBank'] ?? ''}
                    </span>
                </div>
            </div>
        </>
    );
}
