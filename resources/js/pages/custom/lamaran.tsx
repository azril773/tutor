import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import {
    Fakultas,
    LamaranType,
    Matkul,
    Prodi,
    type BreadcrumbItem,
} from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import DialogLamaran from './_components/dialog-lamaran';
import FormLamaran from './_components/form-lamaran';
import TableLamaran from './_components/table-lamaran';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Lamaran',
        href: dashboard().url,
    },
];

export default function Lamaran({
    fakultas,
    prodi,
    matkul,
    lamaran,
    role,
}: {
    fakultas: Fakultas[];
    prodi: Prodi[];
    matkul: Matkul[];
    lamaran: LamaranType[];
    role: string;
}) {
    console.log(lamaran);
    const { errors, flash } = usePage().props;
    const [prodiByFakultas, setProdiByFakultas] = useState<Array<Prodi>>([]);
    const [matkulByProdi, setMatkulByProdi] = useState<Array<Matkul>>([]);

    const [open, setIsOpen] = useState<boolean>(false);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lamaran" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {role === 'tutor' && (
                    <span className="font-sans font-semibold">
                        Apply Lamaran
                    </span>
                )}
                {Object.values(errors).map((value) => (
                    <span className="text-sm text-red-500">{value}</span>
                ))}

                {flash.error && (
                    <span className="text-sm text-red-500">{flash.error}</span>
                )}
                {role === 'tutor' && (
                    <FormLamaran
                        buttonRef={buttonRef}
                        setIsOpen={setIsOpen}
                        fakultas={fakultas}
                        matkul={matkul}
                        prodi={prodi}
                        prodiByFakultas={prodiByFakultas}
                        setProdiByFakultas={setProdiByFakultas}
                        matkulByProdi={matkulByProdi}
                        setMatkulByProdi={setMatkulByProdi}
                    />
                )}
                <DialogLamaran
                    open={open}
                    setOpen={setIsOpen}
                    buttonRef={buttonRef}
                />
                <div className="w-full">
                    <span className="font-sans font-semibold">
                        Data Lamaran
                    </span>
                    <TableLamaran data={lamaran} role={role} />
                </div>
            </div>
        </AppLayout>
    );
}
