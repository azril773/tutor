import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Matkul, Prodi } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Mata Kuliah',
        href: '/master-matkul',
    },
    {
        title: 'Edit Mata Kuliah',
        href: '',
    },
];

export default function EditMatkul({ prodi, matkul }: { prodi: Prodi[], matkul: Matkul }) {
    const page = usePage();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Mata Kuliah" />
            <div className="flex flex-col p-4">
                {Object.values(page.props.errors).map((value) => (
                    <span className="text-sm text-red-500">{value}</span>
                ))}
                {page.props.flash.error && (
                    <span className="text-sm text-red-500">
                        {page.props.flash.error}
                    </span>
                )}
                {page.props.flash.success && (
                    <span className="text-sm text-green-500">
                        {page.props.flash.success}
                    </span>
                )}
            </div>
            <div className="flex flex-col p-4">
                <form method="post" action="/matkul/edit">
                    <input type="hidden" name="_token" value={page.props.csrf_token} />
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                        <div className="space-y-2">
                            <Label>Prodi</Label>
                            <Select name="prodi_id" defaultValue={matkul.prodi.id.toString()}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Prodi" />
                                </SelectTrigger>
                                <SelectContent>
                                    {prodi.map((prod, index) => (
                                        <SelectItem
                                            key={index}
                                            value={prod.id.toString()}
                                        >
                                            {prod.nama}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Semester</Label>
                            <Select name="semester" defaultValue={matkul.semester}>
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
                        <div className="space-y-2">
                            <Label>Mata Kuliah</Label>
                            <Input
                                title="Mata Kuliah"
                                type="text"
                                name="matkul"
                                defaultValue={matkul.nama}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Kuota</Label>
                            <Input title="Kuota" type="text" name="kuota" defaultValue={matkul.kuota} />
                        </div>
                        <div className="space-y-2">
                            <Label>Kode Mata Kuliah</Label>
                            <Input
                                title="Kode Mata Kuliah"
                                type="text"
                                name="kode_matkul"
                                defaultValue={matkul.kode_matkul}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <input type="hidden" name="id" value={matkul.id} />
                        <Button
                            type="submit"
                        >
                            Simpan Perubahan
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
