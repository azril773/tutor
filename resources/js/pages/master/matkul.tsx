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
import { BreadcrumbItem, Matkul, Prodi } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { GetMatkul } from '../_api/master-data';
import DialogComponent from '../_components/dialog-component';
import EmptyState from '../auth/components/empty-state';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { NumericFormat } from 'react-number-format';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Mata Kuliah',
        href: '/master-matkul',
    },
];

export default function MatkulPage({ prodi }: { prodi: Prodi[] }) {
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
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <span className="text-xl font-bold">Mata Kuliah</span>
                <span className="text-lg font-bold">Tambah Mata Kuliah</span>
                <MatkulComponent prodi={prodi} />
                <ImportMatkul prodi={prodi} />
                <span className="text-lg font-bold">Data Mata Kuliah</span>
                <TableMatkul />
            </div>
        </AppLayout>
    );
}

function MatkulComponent({ prodi }: { prodi: Prodi[] }) {
    const csrf_token = usePage().props.csrf_token;
    const [open, setOpen] = useState<boolean>(false);
    const buttonRef = useRef<HTMLFormElement>(null);
    return (
        <>
            <form ref={buttonRef} action="/matkul" method="post" >
                <input type="hidden" name="_token" value={csrf_token} />
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                        <Label>Prodi</Label>
                        <Select name="prodi_id">
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
                        <Select name="semester">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Semester" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem
                                    value={"Semester 1"}
                                >
                                    Semester 1
                                </SelectItem>
                                <SelectItem
                                    value={"Semester 2"}
                                >
                                    Semester 2
                                </SelectItem>
                                <SelectItem
                                    value={"Semester 3"}
                                >
                                    Semester 3
                                </SelectItem>
                                <SelectItem
                                    value={"Semester 4"}
                                >
                                    Semester 4
                                </SelectItem>
                                <SelectItem
                                    value={"Semester 5"}
                                >
                                    Semester 5
                                </SelectItem>
                                <SelectItem
                                    value={"Semester 6"}
                                >
                                    Semester 6
                                </SelectItem>
                                <SelectItem
                                    value={"Semester 7"}
                                >
                                    Semester 7
                                </SelectItem>
                                <SelectItem
                                    value={"Semester 8"}
                                >
                                    Semester 8
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Mata Kuliah</Label>
                        <Input title="Mata Kuliah" type="text" name="matkul" />
                    </div>
                    <div className="space-y-2">
                        <Label>Kuota</Label>
                        <NumericFormat allowLeadingZeros={true} allowNegative={false} customInput={Input} title="Kuota" type="text" name="kuota" />
                    </div>
                    <div className="space-y-2">
                        <Label>Kode Mata Kuliah</Label>
                        <Input
                            title="Kode Mata Kuliah"
                            type="text"
                            name="kode_matkul"
                        />
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button type="button" onClick={() => setOpen(true)}>
                        Buat mata kuliah
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
function ImportMatkul({ prodi }: { prodi: Prodi[] }) {
    const csrf_token = usePage().props.csrf_token;
    const [open, setOpen] = useState<boolean>(false);
    const buttonRef = useRef<HTMLFormElement>(null);
    return (
        <>
            <form ref={buttonRef} action="/import_matkul" method="post" encType="multipart/form-data">
                <input type="hidden" name="_token" value={csrf_token} />
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Prodi</Label>
                        <Select name="prodi_id">
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
                        <Label className="flex justify-between">
                            File
                            <a
                                className="text-blue-500"
                                href="/template.xlsx"
                                download
                            >
                                Template
                            </a>
                        </Label>
                        <Input
                            title="File"
                            type="file"
                            name="file"
                            accept=".xlsx, .csv"
                        />
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button type="button" onClick={() => setOpen(true)}>
                        Buat mata kuliah
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

function TableMatkul() {
    const csrf_token = usePage().props.csrf_token;
    const [data, setData] = useState<Matkul[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [nama, setNama] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<string>('');

    const loadData = async () => {
        const { data, totalPage, error } = await GetMatkul({
            currentPage,
            csrf_token,
            nama,
        });
        if (error.length > 0) {
            alert('Terjadi kesalahan saat get data matkul');
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
                    placeholder="Cari berdasarkan nama matkul"
                    value={nama}
                    onChange={(value) => setNama(value.currentTarget.value)}
                    className="max-w-sm"
                />
            </div>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Kode Mata Kuliah</TableHead>
                            <TableHead>Nama Mata Kuliah</TableHead>
                            <TableHead>Semester</TableHead>
                            <TableHead>Kuota</TableHead>
                            <TableHead>Prodi</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 && <EmptyState colspan={5} />}
                        {data.map((dt, index) => (
                            <TableRow key={index}>
                                <TableCell>{dt.kode_matkul ?? '-'}</TableCell>
                                <TableCell>{dt.nama ?? '-'}</TableCell>
                                <TableCell>{dt.semester ?? '-'}</TableCell>
                                <TableCell>{dt.kuota ?? '-'}</TableCell>
                                <TableCell>{dt.prodi.nama ?? '-'}</TableCell>
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
                                                    window.location.href = `/matkul/${dt.id}/edit`;
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
                                action={`/matkul/${deleteId}/delete`}
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
