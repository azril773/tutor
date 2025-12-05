import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Fakultas, Matkul, Prodi } from '@/types';
import { usePage } from '@inertiajs/react';
import { Dispatch, RefObject, SetStateAction, useState } from 'react';

export default function FormLamaran({
    buttonRef,
    setIsOpen,
    prodi,
    prodiByFakultas,
    setProdiByFakultas,
    fakultas,
    matkul,
    matkulByProdi,
    setMatkulByProdi,
}: {
    buttonRef: RefObject<HTMLButtonElement | null>;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    prodi: Prodi[];
    prodiByFakultas: Prodi[];
    setProdiByFakultas: Dispatch<SetStateAction<Prodi[]>>;
    fakultas: Fakultas[];
    matkul: Matkul[];
    matkulByProdi: Matkul[];
    setMatkulByProdi: Dispatch<SetStateAction<Matkul[]>>;
}) {
    const csrf_token = usePage().props.csrf_token;
    const [kodeProdi, setKodeProdi] = useState<string | null>(null);
    const [semester, setSemester] = useState<string | null>(null);
    const [key, setKey] = useState<number>(0);
    return (
        <form action="/proses-lamaran" method="post">
            <input type="hidden" name="_token" value={csrf_token} />
            <div className="grid w-full grid-cols-2 gap-2">
                <div className="flex flex-col gap-2">
                    <Label>Fakultas</Label>
                    <Select
                        name="fakultas"
                        onValueChange={(value) => {
                            setProdiByFakultas(
                                prodi.filter(
                                    (item) =>
                                        item.fakultas.kode_fakultas === value,
                                ),
                            );
                        }}
                    >
                        <SelectTrigger className="w-[100%]">
                            <SelectValue placeholder="Pilih Fakultas" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Fakultas</SelectLabel>
                                {fakultas.map((item: Fakultas) => (
                                    <SelectItem
                                        key={item.id}
                                        value={item.kode_fakultas}
                                    >
                                        {item.nama}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Prodi</Label>
                    <Select
                        name="prodi"
                        onValueChange={(value) => {
                            setKodeProdi(value);
                        }}
                    >
                        <SelectTrigger className="w-[100%]">
                            <SelectValue placeholder="Pilih Prodi" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Prodi</SelectLabel>
                                {prodiByFakultas.map((item: Prodi) => (
                                    <SelectItem
                                        key={item.id}
                                        value={item.kode_prodi}
                                    >
                                        {item.nama}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid w-full grid-cols-2 gap-2">
                <div className="mt-2 flex flex-col gap-2">
                    <Label>Semester</Label>
                    <Select
                        name="semester"
                        onValueChange={(value) => {
                            setMatkulByProdi(
                                matkul.filter(
                                    (item) =>
                                        item.semester.trim().toLowerCase() ===
                                            value.trim().toLowerCase() &&
                                        item.prodi.kode_prodi === kodeProdi,
                                ),
                            );
                            setKey((prev) => prev + 1);
                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Semester" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={'Semester 1'}>
                                Semester 1
                            </SelectItem>
                            <SelectItem value={'Semester 2'}>
                                Semester 2
                            </SelectItem>
                            <SelectItem value={'Semester 3'}>
                                Semester 3
                            </SelectItem>
                            <SelectItem value={'Semester 4'}>
                                Semester 4
                            </SelectItem>
                            <SelectItem value={'Semester 5'}>
                                Semester 5
                            </SelectItem>
                            <SelectItem value={'Semester 6'}>
                                Semester 6
                            </SelectItem>
                            <SelectItem value={'Semester 7'}>
                                Semester 7
                            </SelectItem>
                            <SelectItem value={'Semester 8'}>
                                Semester 8
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="mt-2 flex flex-col gap-2">
                    <Label>Mata Kuliah</Label>
                    <Select name="matkul" key={key}>
                        <SelectTrigger className="w-[100%]">
                            <SelectValue placeholder="Pilih Mata Kuliah" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Matkul</SelectLabel>
                                {matkulByProdi.map((item: Matkul) => (
                                    <SelectItem
                                        key={item.id}
                                        value={item.kode_matkul}
                                    >
                                        {item.nama}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="mt-2 flex justify-end">
                <Button
                    onClick={() => setIsOpen(true)}
                    className="cursor-pointer"
                    type="button"
                >
                    Apply
                </Button>
                <button
                    type="submit"
                    className="hidden"
                    ref={buttonRef}
                ></button>
            </div>
        </form>
    );
}
