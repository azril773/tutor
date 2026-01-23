import PaginationStateful from '@/components/custom/pagination-stateful';
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Fakultas, Prodi } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { GetProdi } from '../_api/master-data';
import DialogComponent from '../_components/dialog-component';
import EmptyState from '../auth/components/empty-state';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Prodi',
        href: '/master-prodi',
    },
];

export default function ProdiPage({ fakultas }: { fakultas: Fakultas[] }) {
    const page = usePage();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Program Studi" />
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
                <span className="text-xl font-bold">Program Studi</span>
                <span className="text-lg font-bold">Tambah Program Studi</span>
                <ProdiComponent fakultas={fakultas} />
                <span className="text-lg font-bold">Data Program Studi</span>
                <TableProdi />
            </div>
        </AppLayout>
    );
}

function ProdiComponent({ fakultas }: { fakultas: Fakultas[] }) {
    const csrf_token = usePage().props.csrf_token;
    const [open, setOpen] = useState<boolean>(false);
    const buttonRef = useRef<HTMLFormElement>(null);
    return (
        <>
            <form ref={buttonRef} action="/prodi" method="post">
                <input type="hidden" name="_token" value={csrf_token} />
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                        <Label>Fakultas</Label>
                        <Select name="fakultas_id">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Fakultas" />
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
                        <Label>Prodi</Label>
                        <Input title="Prodi" type="text" name="prodi" />
                    </div>
                    <div className="space-y-2">
                        <Label>Kode Prodi</Label>
                        <Input
                            title="Kode Prodi"
                            type="text"
                            name="kode_prodi"
                        />
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button type="button" onClick={() => setOpen(true)}>
                        Buat prodi
                    </Button>
                </div>
            </form>
            <DialogComponent
                open={open}
                setOpen={setOpen}
                buttonRef={buttonRef}
            />
        </>
    );
}

function TableProdi() {
    const csrf_token = usePage().props.csrf_token;
    const [data, setData] = useState<Prodi[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [nama, setNama] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<string>('');

    const loadData = async () => {
        const { data, totalPage, error } = await GetProdi({
            currentPage,
            csrf_token,
            nama,
        });
        if (error.length > 0) {
            alert('Terjadi kesalahan saat get data prodi');
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
                    placeholder="Cari berdasarkan nama prodi"
                    value={nama}
                    onChange={(value) => setNama(value.currentTarget.value)}
                    className="max-w-sm"
                />
            </div>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Kode Prodi</TableHead>
                            <TableHead>Nama Prodi</TableHead>
                            <TableHead>Fakultas</TableHead>
                            <TableHead>
                                {' '}
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 && <EmptyState colspan={2} />}
                        {data.map((dt, index) => (
                            <TableRow key={index}>
                                <TableCell>{dt.kode_prodi ?? '-'}</TableCell>
                                <TableCell>{dt.nama ?? '-'}</TableCell>
                                <TableCell>{dt.fakultas.nama ?? '-'}</TableCell>
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
                                                    window.location.href = `/prodi/${dt.id}/edit`;
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
                                action={`/prodi/${deleteId}/delete`}
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
