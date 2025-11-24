import { TableCell, TableRow } from '@/components/ui/table';

export default function EmptyState({ colspan }: { colspan: number }) {
    return (
        <TableRow>
            <TableCell colSpan={colspan} className="h-24 text-center">
                No results.
            </TableCell>
        </TableRow>
    );
}
