import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dokumen as DokumenType } from '@/types';
import { Download } from 'lucide-react';
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
    error,
    dokumen,
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
    error: Record<string, string>;
    dokumen?: DokumenType;
}) {
    console.log(dokumen);
    return (
        <>
            <div className="flex justify-between">
                <div className="text-md my-3 font-semibold">Dokumen</div>
            </div>
            <div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="grid w-full gap-4">
                    <Label>
                        CV{' '}
                        {dokumen?.cv && (
                            <Download
                                onClick={() =>
                                    window.open(
                                        `/files/${dokumen.cv}`,
                                        '_blank',
                                    )
                                }
                                className="h-4 w-4"
                            />
                        )}
                    </Label>
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
                    <Label>
                        Ijazah{' '}
                        {dokumen?.ijazah && (
                            <Download
                                onClick={() =>
                                    window.open(
                                        `/files/${dokumen.ijazah}`,
                                        '_blank',
                                    )
                                }
                                className="h-4 w-4"
                            />
                        )}
                    </Label>
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
                    <Label>
                        RPS{' '}
                        {dokumen?.rps && (
                            <Download
                                onClick={() =>
                                    window.open(
                                        `/files/${dokumen.rps}`,
                                        '_blank',
                                    )
                                }
                                className="h-4 w-4"
                            />
                        )}
                    </Label>
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
                    <Label>
                        Foto Ktp{' '}
                        {dokumen?.foto_ktp && (
                            <Download
                                onClick={() =>
                                    window.open(
                                        `/files/${dokumen.foto_ktp}`,
                                        '_blank',
                                    )
                                }
                                className="h-4 w-4"
                            />
                        )}
                    </Label>
                    <Input
                        title="Foto Ktp"
                        id="fotoKtp"
                        name="fotoKtp"
                        type="file"
                        accept=".jpg, .jpeg, .png, .pdf, .docx"
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
                    <Label>
                        Buku Tabungan{' '}
                        {dokumen?.buku_tabungan && (
                            <Download
                                onClick={() =>
                                    window.open(
                                        `/files/${dokumen.buku_tabungan}`,
                                        '_blank',
                                    )
                                }
                                className="h-4 w-4"
                            />
                        )}
                    </Label>
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
                    <Label>
                        Surat Ketersediaan{' '}
                        {dokumen?.surat_ketersediaan && (
                            <Download
                                onClick={() =>
                                    window.open(
                                        `/files/${dokumen.surat_ketersediaan}`,
                                        '_blank',
                                    )
                                }
                                className="h-4 w-4"
                            />
                        )}
                    </Label>
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
