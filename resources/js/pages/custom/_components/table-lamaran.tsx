import DashboardController from '@/actions/App/Http/Controllers/DashboardController';
import PaginationStateful from '@/components/custom/pagination-stateful';
import { Badge } from '@/components/ui/badge';
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { GetApplications } from '@/pages/_api/lamaran';
import EmptyState from '@/pages/auth/components/empty-state';
import { LamaranType } from '@/types';
import { Form, usePage } from '@inertiajs/react';
import { MoreHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function TableLamaran({
    user_id,
    role,
}: {
    user_id?: string;
    role: string;
}) {
    const props = usePage().props;
    const [data, setData] = useState<LamaranType[]>([]);
    const [selectedId, setSelectedId] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [nama, setNama] = useState<string>('');

    const [open, setOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const loadData = async () => {
        const { data, totalPage, error } = await GetApplications({
            csrf_token: props.csrf_token,
            currentPage,
            nama,
            user_id,
        });
        if (error.length > 0) {
            alert("Terjadi kesalahan saat get data lamaran")
            setError(error);
            setData([]);
        } else {
            setData(data);
            console.log(totalPage)
            setTotalPage(totalPage);
        }
    };

    useEffect(() => {
        loadData();
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
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Cari berdasarkan nama"
                    value={nama}
                    onChange={(value) => setNama(value.currentTarget.value)}
                    className="max-w-sm"
                />
            </div>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama Tutor</TableHead>
                            <TableHead>Fakultas</TableHead>
                            <TableHead>Prodi</TableHead>
                            <TableHead>Matkul</TableHead>
                            <TableHead>Status</TableHead>
                            {role === 'admin' && <TableHead></TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 && <EmptyState colspan={6} />}
                        {data.map((dt, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {dt.user_login?.pribadi?.nama_lengkap ??
                                        '-'}
                                </TableCell>
                                <TableCell>
                                    {dt.matkul?.prodi?.fakultas?.nama ?? '-'}
                                </TableCell>
                                <TableCell>{dt.matkul?.prodi?.nama}</TableCell>
                                <TableCell>{dt.matkul?.nama}</TableCell>
                                <TableCell>
                                    {dt.status === 'PENDING' ? (
                                        <Badge variant={'secondary'}>
                                            {dt.status}
                                        </Badge>
                                    ) : (
                                        <Badge
                                            variant="secondary"
                                            className="bg-blue-500 text-white dark:bg-blue-600"
                                        >
                                            {dt.status}
                                        </Badge>
                                    )}
                                </TableCell>
                                {role === 'admin' && (
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
                                                        setOpen(true);
                                                        setSelectedId(
                                                            dt.id.toString(),
                                                        );
                                                    }}
                                                >
                                                    Approve
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                )}
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
            <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Apakah anda sudah yakin?</DialogTitle>
                        <div className="mt-2 flex justify-end">
                            <Form
                                {...DashboardController.approveLamaran.form()}
                                method="post"
                            >
                                <input
                                    type="hidden"
                                    name="id"
                                    value={selectedId}
                                />
                                <Button
                                    type="submit"
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    Approve
                                </Button>
                            </Form>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}
