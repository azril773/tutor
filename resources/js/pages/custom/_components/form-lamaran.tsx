import DashboardController from '@/actions/App/Http/Controllers/DashboardController';
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
import { Form } from '@inertiajs/react';
import { Dispatch, RefObject, SetStateAction } from 'react';
import DialogLamaran from './dialog-lamaran';

export default function FormLamaran({
    buttonRef,
    setIsOpen,
    prodi,
    prodiByFakultas,
    setProdiByFakultas,
    fakultas,
    matkul,
    matkulByProdi,
    setMatkulByProdi
}: {
    buttonRef: RefObject<HTMLButtonElement | null>
    setIsOpen: Dispatch<SetStateAction<boolean>>
    prodi: Prodi[];
    prodiByFakultas: Prodi[]
    setProdiByFakultas: Dispatch<SetStateAction<Prodi[]>>;
    fakultas: Fakultas[];
    matkul: Matkul[];
    matkulByProdi: Matkul[]
    setMatkulByProdi: Dispatch<SetStateAction<Matkul[]>>;
    
}) {
    return (
        <Form {...DashboardController.prosesLamaran.form()} method="post">
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
                            setMatkulByProdi(
                                matkul.filter(
                                    (item) => item.prodi.kode_prodi === value,
                                ),
                            );
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
            <div className="mt-2 flex flex-col gap-2">
                <Label>Mata Kuliah</Label>
                <Select name="matkul">
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

        </Form>
    );
}
