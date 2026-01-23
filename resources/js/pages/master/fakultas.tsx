import PaginationStateful from '@/components/custom/pagination-stateful';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Fakultas } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { MoreHorizontal } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { GetFakultas } from '../_api/master-data';
import DialogComponent from '../_components/dialog-component';
import EmptyState from '../auth/components/empty-state';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Fakutlas',
        href: '/master-fakultas',
    },
];

export default function FakultasPage() {
    const page = usePage();
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
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <span className="text-xl font-bold">Fakultas</span>
                <span className="text-lg font-bold">Tambah Fakultas</span>
                <FakultasComponent />
                <span className="text-lg font-bold">Data Fakultas</span>
                <TableFakultas />
            </div>
        </AppLayout>
    );
}

function TableFakultas() {
    const csrf_token = usePage().props.csrf_token;
    const [data, setData] = useState<Fakultas[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [nama, setNama] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<string>('');

    const loadData = async () => {
        const { data, totalPage, error } = await GetFakultas({
            currentPage,
            csrf_token,
            nama,
        });
        if (error.length > 0) {
            alert('Terjadi kesalahan saat get data fakultas');
            setData([]);
        } else {
            setData(data);
            setTotalPage(totalPage);
        }
    };
    useEffect(() => {
        loadData();
    }, [currentPage]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrentPage(1);
            loadData();
        }, 300);

        return () => {
            clearTimeout(timeout);
        };
    }, [nama]);

    return (
        <>
            <div className="flex items-center py-2">
                <Input
                    placeholder="Cari berdasarkan nama fakultas"
                    value={nama}
                    onChange={(value) => setNama(value.currentTarget.value)}
                    className="max-w-sm"
                />
            </div>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Kode Fakultas</TableHead>
                            <TableHead>Nama Fakultas</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 && <EmptyState colspan={2} />}
                        {data.map((dt, index) => (
                            <TableRow key={index}>
                                <TableCell>{dt.kode_fakultas ?? '-'}</TableCell>
                                <TableCell>{dt.nama ?? '-'}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="h-8 w-8 p-0"
                                            >
                                                <span className="sr-only">
                                                    Open menu
                                                </span>
                                                <MoreHorizontal />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    window.location.href = `/fakultas/${dt.id}/edit`;
                                                }}
                                            >
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    setDeleteId(
                                                        dt.id.toString() ?? '',
                                                    );
                                                    setIsOpen(true);
                                                }}
                                            >
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2">
                    <PaginationStateful
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPage}
                    />
                </div>
            </div>
            <Dialog open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Apakah anda sudah yakin?</DialogTitle>
                        <div className="mt-2 flex justify-end">
                            <form
                                action={`/fakultas/${deleteId}/delete`}
                                method="post"
                            >
                                <input
                                    type="hidden"
                                    name="_token"
                                    value={csrf_token}
                                />
                                <input
                                    type="hidden"
                                    name="id"
                                    value={deleteId}
                                />
                                <Button
                                    className="cursor-pointer"
                                    onClick={() => {}}
                                >
                                    Hapus
                                </Button>
                            </form>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}

function FakultasComponent() {
    const csrf_token = usePage().props.csrf_token;
    const [open, setOpen] = useState<boolean>(false);
    const buttonRef = useRef<HTMLFormElement>(null);
    return (
        <>
            <form ref={buttonRef} action="/fakultas" method="post">
                <input type="hidden" name="_token" value={csrf_token} />
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Fakultas</Label>
                        <Input
                            title="Kode Fakultas"
                            type="text"
                            name="fakultas"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Kode Fakultas</Label>
                        <Input
                            title="Fakultas"
                            type="text"
                            name="kode_fakultas"
                        />
                    </div>
                </div>
                <div className="my-2 flex justify-end">
                    <Button type="button" onClick={() => setOpen(true)}>
                        Buat fakultas
                    </Button>
                </div>
                <DialogComponent
                    open={open}
                    setOpen={setOpen}
                    buttonRef={buttonRef}
                />
            </form>
        </>
    );
}
