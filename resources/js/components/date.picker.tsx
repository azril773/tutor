'use client';

import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Dispatch, SetStateAction } from 'react';

export function CustomDatePicker({
    date,
    setDate,
}: {
    date: Date | undefined;
    setDate: Dispatch<SetStateAction<Date | undefined>>;
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !date && 'text-muted-foreground',
                    )}
                >
                    {date ? (
                        format(date, 'PPP', { locale: id })
                    ) : (
                        <span>Pilih tanggal</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                {/* Hidden input to pass tgl_lahir value in form submission */}
                
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                        setDate(selectedDate || undefined);
                    }}
                    disabled={(d) =>
                        d > new Date() || d < new Date('1900-01-01')
                    }
                    captionLayout="dropdown"
                />
            </PopoverContent>
        </Popover>
    );
}
