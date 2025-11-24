import { Dispatch, SetStateAction, useEffect } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '../ui/pagination';

export default function PaginationStateful({
    currentPage,
    setCurrentPage,
    totalPages,
}: {
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    totalPages: number;
}) {
    return (
        <>
            <Pagination>
                <PaginationContent className='flex gap-4'>
                    <PaginationItem>
                        <PaginationPrevious className='cursor-pointer'
                            onClick={() => {
                                if (currentPage > 1) {
                                    setCurrentPage((prev) => prev - 1);
                                }
                            }}
                        />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => {
                                const isNearCurrentPage =
                                Math.abs(page - currentPage) <= 1;
                            const isFirstPage = page === 1;
                            const isLastPage = page === totalPages;
                            const isNearStart = currentPage <= 2 && page <= 4;
                            const isNearEnd =
                                currentPage >= totalPages - 1 &&
                                page >= totalPages - 3;

                            if (
                                isFirstPage ||
                                isLastPage ||
                                isNearCurrentPage || isNearStart || isNearEnd
                            ) {
                                return (
                                    <PaginationItem
                                        key={page}
                                        className={`cursor-pointer ${page === currentPage && 'bg-zinc-950/5 dark:bg-white/10 p-2 rounded'}`}
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        <span className="">{page}</span>
                                    </PaginationItem>
                                );
                            }

                            if (page === 2 || page === totalPages - 1) {
                                return (
                                    <span
                                        key={page}
                                        className="w-9 text-center text-sm/6 font-semibold text-zinc-950 select-none dark:text-white"
                                    >
                                        &hellip;
                                    </span>
                                );
                            }
                            return null;
                        },
                    )}
                    <PaginationItem>
                        <PaginationNext className='cursor-pointer'
                            onClick={() => {
                                if (currentPage !== totalPages) {
                                    setCurrentPage((prev) => prev + 1);
                                }
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    );
}
