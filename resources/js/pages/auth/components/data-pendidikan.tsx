import InputComponent from '@/components/inpur';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Pendidikan, PendidikanPayload } from '@/types';
import { Trash } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { NumericFormat } from 'react-number-format';

export default function DataPendidikan({
    pendidikan,
    setPendidikan,
    pdkError,
}: {
    pendidikan: Array<PendidikanPayload>;
    setPendidikan: Dispatch<SetStateAction<Array<PendidikanPayload>>>;
    pdkError: Record<string, Partial<Pendidikan>>;
}) {
    const handleTambahPendidikan = () => {
        setPendidikan((prev) => {
            if (pendidikan.length >= 5) return prev;
            return [
                ...prev,
                {
                    perguruan_tinggi: '',
                    jenjang: '',
                    bidang_studi: '',
                    tahun_lulus: '',
                    gelar_depan: '',
                    gelar_belakang: '',
                },
            ];
        });
    };
    return (
        <>
            <div className="flex justify-between">
                <div className="text-md my-3 font-semibold">
                    Data Pendidikan
                </div>
                <Button
                    type="button"
                    className="sm:text-md w-40 cursor-pointer text-xs"
                    onClick={() => handleTambahPendidikan()}
                >
                    Tambah Pendidikan
                </Button>
            </div>
            {pendidikan.map((pdk, index) => (
                <div key={index}>
                    {index > 0 && <Separator className="my-10" />}
                    <div className="text-md my-3 flex gap-2 font-semibold">
                        Pendidikan ({index + 1}){' '}
                        <Trash
                            onClick={() => {
                                if (pendidikan.length > 1) {
                                    const newPendidikan = pendidikan.filter(
                                        (item, i) => index !== i,
                                    );
                                    setPendidikan(newPendidikan);
                                }
                            }}
                            className="w-5"
                        />
                    </div>
                    <div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="grid w-full gap-4">
                            <InputComponent
                                title="Perguruan Tinggi"
                                id="perguruantinggi"
                                name="perguruantinggi"
                                type="text"
                                maxLength={100}
                                onChange={(value) =>
                                    (pdk.perguruan_tinggi = value.target.value)
                                }
                                defaultValue={pdk.perguruan_tinggi}
                            />
                            <span className="-mt-4 text-sm text-red-500">
                                {pdkError[index]?.perguruan_tinggi ?? ''}
                            </span>
                        </div>
                        <div className="grid w-full gap-4">
                            <InputComponent
                                title="Jenjang"
                                id="jenjang"
                                name="jenjang"
                                type="text"
                                maxLength={100}
                                onChange={(value) =>
                                    (pdk.jenjang = value.target.value)
                                }
                                defaultValue={pdk.jenjang}
                            />
                            <span className="-mt-4 text-sm text-red-500">
                                {pdkError[index]?.jenjang ?? ''}
                            </span>
                        </div>
                        <div className="grid w-full gap-4">
                            <InputComponent
                                title="Bidang Studi"
                                id="bidangstudi"
                                name="bidangstudi"
                                type="text"
                                maxLength={100}
                                onChange={(value) =>
                                    (pdk.bidang_studi = value.target.value)
                                }
                                defaultValue={pdk.bidang_studi}
                            />
                            <span className="-mt-4 text-sm text-red-500">
                                {pdkError[index]?.bidang_studi ?? ''}
                            </span>
                        </div>
                    </div>
                    <div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="grid w-full gap-4">
                            <Label>Tahun Lulus</Label>
                            <NumericFormat
                                allowLeadingZeros={false}
                                allowNegative={false}
                                customInput={Input}
                                onChange={(value) =>
                                    (pdk.tahun_lulus = value.target.value)
                                }
                                defaultValue={pdk.tahun_lulus}
                            />
                            <span className="-mt-4 text-sm text-red-500">
                                {pdkError[index]?.tahun_lulus ?? ''}
                            </span>
                        </div>
                        <div className="grid w-full gap-4">
                            <InputComponent
                                title="Gelar Depan"
                                id="gelardepan"
                                name="gelardepan"
                                type="text"
                                maxLength={100}
                                onChange={(value) =>
                                    (pdk.gelar_depan = value.target.value)
                                }
                                defaultValue={pdk.gelar_depan}
                            />
                            <span className="-mt-4 text-sm text-red-500">
                                {pdkError[index]?.gelar_depan ?? ''}
                            </span>
                        </div>
                        <div className="grid w-full gap-4">
                            <InputComponent
                                title="Gelar Belakang"
                                id="gelarbelakang"
                                name="gelarbelakang"
                                type="text"
                                maxLength={100}
                                onChange={(value) =>
                                    (pdk.gelar_belakang = value.target.value)
                                }
                                defaultValue={pdk.gelar_belakang}
                            />
                            <span className="-mt-4 text-sm text-red-500">
                                {pdkError[index]?.gelar_belakang ?? ''}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
