import { BreadcrumbItem, Fakultas } from "@/types";
import { Form, Head, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { GetFakultas } from "../_api/master-data";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import EmptyState from "../auth/components/empty-state";
import PaginationStateful from "@/components/custom/pagination-stateful";
import AppLayout from "@/layouts/app-layout";
import DashboardController from "@/actions/App/Http/Controllers/DashboardController";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import DialogComponent from "../_components/dialog-component";

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
                <span className='font-bold text-xl'>Fakultas</span>
                <span className='font-bold text-lg'>Tambah Fakultas</span>
                <FakultasComponent />
                <span className='font-bold text-lg'>Data Fakultas</span>
                <TableFakultas />
            </div>
        </AppLayout>
    )
}


function TableFakultas() {
    const csrf_token = usePage().props.csrf_token;
    const [data, setData] = useState<Fakultas[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [nama, setNama] = useState<string>('');

    const loadData = async () => {
        const { data, totalPage, error } = await GetFakultas({
            currentPage,
            csrf_token,
            nama,
        });
        if (error.length > 0) {
            alert("Terjadi kesalahan saat get data fakultas")
            setData([])
        }else{
            setData(data)
            setTotalPage(totalPage)
        }
    };
    useEffect(() => {
        loadData()
    }, [currentPage]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrentPage(1)
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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 && <EmptyState colspan={2} />}
                        {data.map((dt, index) => (
                            <TableRow key={index}>
                                <TableCell>{dt.kode_fakultas ?? '-'}</TableCell>
                                <TableCell>{dt.nama ?? '-'}</TableCell>
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
        </>
    );
}



function FakultasComponent() {
    const csrf_token = usePage().props.csrf_token
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