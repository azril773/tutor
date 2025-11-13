import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dispatch, SetStateAction } from 'react';

export default function Dokumen({
    cv,
    setCv,
    ijazah,
    setIjazah,
    rps,
    setRps,
    fotoKtp,
    setFotoKtp,
    bukuTabungan,
    setBukuTabungan,
    suratKetersediaan,
    setSuratKetersediaan,
    error
}: {
    cv: File | null;
    setCv: Dispatch<SetStateAction<File | null>>;
    ijazah: File | null;
    setIjazah: Dispatch<SetStateAction<File | null>>;
    rps: File | null;
    setRps: Dispatch<SetStateAction<File | null>>;
    fotoKtp: File | null;
    setFotoKtp: Dispatch<SetStateAction<File | null>>;
    bukuTabungan: File | null;
    setBukuTabungan: Dispatch<SetStateAction<File | null>>;
    suratKetersediaan: File | null;
    setSuratKetersediaan: Dispatch<SetStateAction<File | null>>;
    error: Record<string, string>
}) {
    return (
        <>
            <div className="flex justify-between">
                <div className="text-md my-3 font-semibold">Dokumen</div>
            </div>
            <div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="grid w-full gap-4">
                    <Label>CV</Label>
                    <Input
                        title="cv"
                        id="cv"
                        name="cv"
                        type="file"
                        accept=".pdf, .docx"
                        onChange={(file) => {
                            if (
                                file.target.files &&
                                file.target.files.length > 0
                            ) {
                                setCv(file.target.files[0]);
                            } else {
                                setCv(null);
                            }
                        }}
                    />
                    <span className="-mt-4 text-sm text-red-500">
                        {error['cv'] ?? ''}
                    </span>
                </div>
                <div className="grid w-full gap-4">
                    <Label>Ijazah</Label>
                    <Input
                        title="ijazah"
                        id="ijazah"
                        name="ijazah"
                        type="file"
                        accept=".pdf, .docx"
                        onChange={(file) => {
                            if (
                                file.target.files &&
                                file.target.files.length > 0
                            ) {
                                setIjazah(file.target.files[0]);
                            } else {
                                setIjazah(null);
                            }
                        }}
                    />
                    <span className="-mt-4 text-sm text-red-500">
                        {error['ijazah'] ?? ''}
                    </span>
                </div>
                <div className="grid w-full gap-4">
                    <Label>RPS</Label>
                    <Input
                        title="rps"
                        id="rps"
                        name="rps"
                        type="file"
                        accept=".pdf, .docx"
                        onChange={(file) => {
                            if (
                                file.target.files &&
                                file.target.files.length > 0
                            ) {
                                setRps(file.target.files[0]);
                            } else {
                                setRps(null);
                            }
                        }}
                    />
                    <span className="-mt-4 text-sm text-red-500">
                        {error['rps'] ?? ''}
                    </span>
                </div>
            </div>
            <div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="grid w-full gap-4">
                    <Label>Foto Ktp</Label>
                    <Input
                        title="Foto Ktp"
                        id="fotoKtp"
                        name="fotoKtp"
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={(file) => {
                            if (
                                file.target.files &&
                                file.target.files.length > 0
                            ) {
                                setFotoKtp(file.target.files[0]);
                            } else {
                                setFotoKtp(null);
                            }
                        }}
                    />
                    <span className="-mt-4 text-sm text-red-500">
                        {error['fotoKtp'] ?? ''}
                    </span>
                </div>
                <div className="grid w-full gap-4">
                    <Label>Buku Tabungan</Label>
                    <Input
                        title="Buku Tabungan"
                        id="bukuTabungan"
                        name="bukuTabungan"
                        type="file"
                        accept=".pdf, .docx"
                        onChange={(file) => {
                            if (
                                file.target.files &&
                                file.target.files.length > 0
                            ) {
                                setBukuTabungan(file.target.files[0]);
                            } else {
                                setBukuTabungan(null);
                            }
                        }}
                    />
                    <span className="-mt-4 text-sm text-red-500">
                        {error['bukuTabungan'] ?? ''}
                    </span>
                </div>
                <div className="grid w-full gap-4">
                    <Label>Surat Ketersediaan</Label>
                    <Input
                        title="suratKetersediaan"
                        id="suratKetersediaan"
                        name="suratKetersediaan"
                        type="file"
                        accept=".pdf, .docx"
                        onChange={(file) => {
                            if (
                                file.target.files &&
                                file.target.files.length > 0
                            ) {
                                setSuratKetersediaan(file.target.files[0]);
                            } else {
                                setSuratKetersediaan(null);
                            }
                        }}
                    />
                    <span className="-mt-4 text-sm text-red-500">
                        {error['suratKetersediaan'] ?? ''}
                    </span>
                </div>
            </div>
        </>
    );
}
