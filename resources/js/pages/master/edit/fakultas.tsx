import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Fakultas } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Fakutlas',
        href: '/master-fakultas',
    },
    {
        title: 'Edit Fakultas',
        href: '',
    },
];

export default function EditFakultas({ fakultas }: { fakultas: Fakultas }) {
    const page = usePage()
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Fakultas" />
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
                <form method="post" action="/fakultas/edit">
                    <input
                        type="hidden"
                        name="_token"
                        value={page.props.csrf_token}
                    />
                    <input type="hidden" name="id" value={fakultas.id} />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Kode Fakultas</Label>
                            <Input
                                title="Kode Fakultas"
                                type="text"
                                name="kode_fakultas"
                                defaultValue={fakultas.kode_fakultas}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Fakultas</Label>
                            <Input
                                title="Fakultas"
                                type="text"
                                name="fakultas"
                                defaultValue={fakultas.nama}
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
