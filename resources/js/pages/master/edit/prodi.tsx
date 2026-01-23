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
import { BreadcrumbItem, Fakultas, Prodi } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Prodi',
        href: '/master-prodi',
    },
    {
        title: 'Edit Prodi',
        href: '',
    },
];

export default function EditProdi({
    prodi,
    fakultas,
}: {
    prodi: Prodi;
    fakultas: Fakultas[];
}) {
    const page = usePage()
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Prodi" />
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
                <form method="post" action="/prodi/edit">
                    <input
                        type="hidden"
                        name="_token"
                        value={usePage().props.csrf_token}
                    />
                    <input type="hidden" name="id" value={prodi.id} />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Fakultas</Label>
                            <Select name="fakultas_id" defaultValue={prodi.fakultas.id.toString()}>
                                <SelectTrigger className="w-full">
                                    <SelectValue
                                        placeholder="Fakultas"
                                        
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {fakultas.map((fakul, index) => (
                                        <SelectItem
                                            key={index}
                                            value={fakul.id.toString()}
                                        >
                                            {fakul.nama}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Kode Prodi</Label>
                            <Input
                                title="Kode Prodi"
                                type="text"
                                name="kode_prodi"
                                defaultValue={prodi.kode_prodi}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Prodi</Label>
                            <Input
                                title="Prodi"
                                type="text"
                                name="prodi"
                                defaultValue={prodi.nama}
                            />
                        </div>
                    </div>
                    <div className="my-2 flex justify-end">
                        <Button type="submit">Simpan perubahan</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
