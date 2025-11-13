import InputComponent from '@/components/inpur';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dispatch, SetStateAction } from 'react';
import { NumericFormat } from 'react-number-format';

export default function DataInstitusi({
    institusi,
    setInstitusi,
    statusPekerjaan,
    setStatusPekerjaan,
    masaKerja,
    setMasaKerja,
    pangkat,
    setPangkat,
    bidangPekerjaan,
    setBidangPekerjaan,
    error,
}: {
    institusi: string;
    setInstitusi: Dispatch<SetStateAction<string>>;
    statusPekerjaan: string;
    setStatusPekerjaan: Dispatch<SetStateAction<string>>;
    masaKerja: string;
    setMasaKerja: Dispatch<SetStateAction<string>>;
    pangkat: string;
    setPangkat: Dispatch<SetStateAction<string>>;
    bidangPekerjaan: string;
    setBidangPekerjaan: Dispatch<SetStateAction<string>>;
    error: Record<string, string>;
}) {
    return (
        <>
            <div className="text-md my-3 font-semibold">Data Institusi</div>
            <div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="grid w-full gap-4">
                    <InputComponent defaultValue={institusi}
                        title="Institusi"
                        id="institusi"
                        name="institusi"
                        type="text"
                        maxLength={100}
                        onChange={(value) => setInstitusi(value.target.value)}
                    />
                    <span className="-mt-4 text-sm text-red-500">
                        {error['institusi'] ?? ''}
                    </span>
                </div>
                <div className="grid w-full gap-4">
                    <InputComponent defaultValue={statusPekerjaan}
                        title="Status Pekerjaan"
                        id="statusPekerjaan"
                        name="statusPekerjaan"
                        type="text"
                        maxLength={100}
                        onChange={(value) =>
                            setStatusPekerjaan(value.target.value)
                        }
                    />
                    <span className="-mt-4 text-sm text-red-500">
                        {error['statusPekerjaan'] ?? ''}
                    </span>
                </div>
                <div className="grid w-full gap-4">
                    <Label>Masa Kerja</Label>
                    <NumericFormat defaultValue={masaKerja}
                        allowLeadingZeros={false}
                        allowNegative={false}
                        customInput={Input}
                        onChange={(value) => setMasaKerja(value.target.value)}
                        name='masaKerja'
                    />
                    <span className="-mt-4 text-sm text-red-500">
                        {error['masaKerja'] ?? ''}
                    </span>
                </div>
            </div>
            <div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="grid w-full gap-4">
                    <InputComponent defaultValue={pangkat}
                        title="Pangkat"
                        id="pangkat"
                        name="pangkat"
                        type="text"
                        maxLength={100}
                        onChange={(value) => setPangkat(value.target.value)}
                    />
                    <span className="-mt-4 text-sm text-red-500">
                        {error['pangkat'] ?? ''}
                    </span>
                </div>
                <div className="grid w-full gap-4">
                    <InputComponent defaultValue={bidangPekerjaan}
                        title="Bidang Pekerjaan"
                        id="bidangPekerjaan"
                        name="bidangPekerjaan"
                        type="text"
                        maxLength={100}
                        onChange={(value) =>
                            setBidangPekerjaan(value.target.value)
                        }
                    />
                    <span className="-mt-4 text-sm text-red-500">
                        {error['bidangPekerjaan'] ?? ''}
                    </span>
                </div>
            </div>
        </>
    );
}
