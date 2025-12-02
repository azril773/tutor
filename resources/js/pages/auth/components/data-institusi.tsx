import InputComponent from '@/components/inpur';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dispatch, SetStateAction } from 'react';
import { NumericFormat } from 'react-number-format';

export default function DataInstitusi({
    institusi,
    setInstitusi,
    statusPekerjaan,
    setStatusPekerjaan,
    masaKerja,
    setMasaKerja,
    golongan,
    setGolongan,
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
    golongan: string;
    setGolongan: Dispatch<SetStateAction<string>>;
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
                        required={true}
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
                        required={true}
                    />
                    <span className="-mt-4 text-sm text-red-500">
                        {error['statusPekerjaan'] ?? ''}
                    </span>
                </div>
                <div className="grid w-full gap-4">
                    <Label>Masa Kerja <span className="text-red-500">*</span></Label>
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
                    <Label>
                        Golongan <span className="text-red-500">*</span>
                    </Label>
                    <Select
                        defaultValue={golongan}
                        name="golongan"
                        onValueChange={(value) => {
                            setGolongan(value);
                        }}
                    >
                        <SelectTrigger className="w-[300px]">
                            <SelectValue placeholder="Golongan       " />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem key={"III"} value={"III"}>
                                III
                            </SelectItem>
                            <SelectItem key={"IV"} value={"IV"}>
                                IV
                            </SelectItem>
                            <SelectItem key={"IX"} value={"IX"}>
                                IX
                            </SelectItem>
                            <SelectItem key={"X"} value={"X"}>
                                X
                            </SelectItem>
                            <SelectItem key={"NON ASN"} value={"NON ASN"}>
                                NON ASN
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <span className="-mt-4 text-sm text-red-500">
                        {error['golongan'] ?? ''}
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
                        required={true}
                    />
                    <span className="-mt-4 text-sm text-red-500">
                        {error['bidangPekerjaan'] ?? ''}
                    </span>
                </div>
            </div>
        </>
    );
}
