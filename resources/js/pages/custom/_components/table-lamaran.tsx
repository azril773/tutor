import DashboardController from '@/actions/App/Http/Controllers/DashboardController';
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
import { LamaranType } from '@/types';
import { Form } from '@inertiajs/react';
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useRef, useState } from 'react';

export default function TableLamaran({
    data,
    role,
}: {
    data: Array<LamaranType>;
    role: string;
}) {
    const approveRef = useRef<HTMLButtonElement | null>(null);
    const [open, setIsOpen] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const columnsAdmin: ColumnDef<LamaranType>[] = [
        {
            id: 'nama',
            header: 'Nama Tutor',
            cell: ({ row }) => <>{row.original.user_login.pribadi.nama_lengkap}</>,
            filterFn: (row, id, value) => {
                return row.original.user_login.pribadi.nama_lengkap
                    .toLowerCase()
                    .includes(value.toLowerCase());
            },
        },
        {
            id: 'fakultas',
            header: 'Fakultas',
            cell: ({ row }) => {
                console.log(row.original);
                return <>{row.original.matkul.prodi.fakultas.nama}</>;
            },
        },
        {
            id: 'prodi',
            header: 'Prodi',
            cell: ({ row }) => <>{row.original.matkul.prodi.nama}</>,
        },
        {
            id: 'matkul',
            header: 'Matkul',
            cell: ({ row }) => <>{row.original.matkul.nama}</>,
        },
        {
            id: 'status',
            header: 'Status',
            cell: ({ row }) => {
                return (
                    <>
                        <Badge
                            variant={`secondary`}
                            className={`${row.original.status === 'APPROVED' ? 'bg-blue-500 text-white dark:bg-blue-600' : ''}`}
                        >
                            {row.original.status}
                        </Badge>
                    </>
                );
            },
        },
        {
            id: 'action',
            enableHiding: false,
            cell: ({ row }) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() => {
                                    setIsOpen(true);
                                    setSelectedId(row.original.id);
                                }}
                            >
                                Approve
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
    const columns: ColumnDef<LamaranType>[] = [
        {
            id: 'nama',
            header: 'Nama Tutor',
            cell: ({ row }) => <>{row.original.user_login.pribadi.nama_lengkap}</>,
            filterFn: (row, id, value) => {
                return row.original.user_login.pribadi.nama_lengkap
                    .toLowerCase()
                    .includes(value.toLowerCase());
            },
        },
        {
            id: 'fakultas',
            header: 'Fakultas',
            cell: ({ row }) => {
                console.log(row.original);
                return <>{row.original.matkul.prodi.fakultas.nama}</>;
            },
        },
        {
            id: 'prodi',
            header: 'Prodi',
            cell: ({ row }) => <>{row.original.matkul.prodi.nama}</>,
        },
        {
            id: 'matkul',
            header: 'Matkul',
            cell: ({ row }) => <>{row.original.matkul.nama}</>,
        },
        {
            id: 'status',
            header: 'Status',
            cell: ({ row }) => {
                return (
                    <>
                        <Badge
                            variant={`secondary`}
                            className={`${row.original.status === 'APPROVED' ? 'bg-blue-500 text-white dark:bg-blue-600' : ''}`}
                        >
                            {row.original.status}
                        </Badge>
                    </>
                );
            },
        },
    ];
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {},
    );
    const [rowSelection, setRowSelection] = useState({});
    const table = useReactTable({
        data,
        columns: role === 'admin' ? columnsAdmin : columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Cari berdasarkan nama"
                    value={
                        (table.getColumn('nama')?.getFilterValue() as string) ??
                        ''
                    }
                    onChange={(event) =>
                        table
                            .getColumn('nama')
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{' '}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
            <Dialog open={open} onOpenChange={(value) => setIsOpen(value)}>
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
            </Dialog>
        </div>
    );
}
