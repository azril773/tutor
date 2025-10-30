import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Dispatch, RefObject, SetStateAction } from 'react';

export default function DialogLamaran({
    open,
    setOpen,
    buttonRef,
}: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    buttonRef: RefObject<HTMLButtonElement | null>;
}) {
    return (
        <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Apakah anda sudah yakin?</DialogTitle>
                    <div className="mt-2 flex justify-end">
                        <Button
                            className="cursor-pointer"
                            onClick={() => {
                                buttonRef.current?.click();
                                setOpen(false);
                            }}
                        >
                            Apply
                        </Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
