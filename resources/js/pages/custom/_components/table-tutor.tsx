import PaginationStateful from '@/components/custom/pagination-stateful';
import { Button } from '@/components/ui/button';
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
import { GetTutors } from '@/pages/_api/tutor';
import EmptyState from '@/pages/auth/components/empty-state';
import { User } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { MoreHorizontal } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function TableTutor({ role }: { role: string }) {
    const props = usePage().props;
    const [data, setData] = useState<Array<User>>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [nama, setNama] = useState<string>('');

    const [error, setError] = useState<string>('');

    const loadData = async () => {
        const { data, totalPage, error } = await GetTutors({
            csrf_token: props.csrf_token,
            currentPage,
            nama,
        });
        console.log(data)
        if (error.length > 0) {
            setError(error);
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
                            <TableHead>NIK</TableHead>
                            <TableHead>Nama</TableHead>
                            <TableHead>Jenis Kelamin</TableHead>
                            <TableHead>Tanggal Lahir</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length <= 0 ? (
                            <EmptyState colspan={4}/>
                        ) : (
                            <>
                                {data.map((tutor, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {tutor.pribadi?.nik ?? '-'}
                                        </TableCell>
                                        <TableCell>
                                            {tutor.pribadi?.nama_lengkap ?? '-'}
                                        </TableCell>
                                        <TableCell>
                                            {tutor.pribadi?.jk ?? '-'}
                                        </TableCell>
                                        <TableCell>
                                            {tutor.pribadi?.tgl_lahir.toString() ?? '-'}
                                        </TableCell>
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
                                                        onClick={() =>
                                                            router.visit(
                                                                `/dashboard/tutor/${tutor.id}`,
                                                            )
                                                        }
                                                    >
                                                        Detail
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </>
                        )}
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
            {/* <Dialog open={open} onOpenChange={(value) => setIsOpen(value)}>
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
                                    value={selectedId ?? ''}
                                />
                                <Button
                                    type="submit"
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setIsOpen(false);
                                    }}
                                >
                                    Approve
                                </Button>
                            </Form>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog> */}
        </div>
    );
}
