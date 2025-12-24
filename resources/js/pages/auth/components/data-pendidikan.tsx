import InputComponent from '@/components/inpur';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Pendidikan, PendidikanPayload } from '@/types';
import { Trash } from 'lucide-react';
import { Dispatch, SetStateAction, use, useState } from 'react';
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
    const [count, setCount] = useState(1);
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
        <div key={count}>
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
                                    setCount(count + 1);
                                    setPendidikan([...newPendidikan]);
                                }
                            }}
                            className="w-5"
                        />
                    </div>
                    <div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="grid w-full gap-4">
                            <InputComponent
                                title="Perguruan Tinggi"
                                id={`perguruantinggi[${index}]`}
                                name={`pendidikan[${index}][perguruan_tinggi]`}
                                type="text"
                                maxLength={100}
                                onChange={(value) =>
                                    (pdk.perguruan_tinggi = value.target.value)
                                }
                                defaultValue={pdk.perguruan_tinggi}
                                required={true}
                            />
                            <span className="-mt-4 text-sm text-red-500">
                                {pdkError[index]?.perguruan_tinggi ?? ''}
                            </span>
                        </div>
                        <div className="grid w-full gap-4">
                            <InputComponent
                                title="Jenjang"
                                id={`jenjang[${index}]`}
                                name={`pendidikan[${index}][jenjang]`}
                                type="text"
                                maxLength={100}
                                onChange={(value) =>
                                    (pdk.jenjang = value.target.value)
                                }
                                defaultValue={pdk.jenjang}
                                required={true}
                            />
                            <span className="-mt-4 text-sm text-red-500">
                                {pdkError[index]?.jenjang ?? ''}
                            </span>
                        </div>
                        <div className="grid w-full gap-4">
                            <InputComponent
                                title="Bidang Studi"
                                id={`bidangstudi[${index}]`}
                                name={`pendidikan[${index}][bidang_studi]`}
                                type="text"
                                maxLength={100}
                                onChange={(value) =>
                                    (pdk.bidang_studi = value.target.value)
                                }
                                defaultValue={pdk.bidang_studi}
                                required={true}
                            />
                            <span className="-mt-4 text-sm text-red-500">
                                {pdkError[index]?.bidang_studi ?? ''}
                            </span>
                        </div>
                    </div>
                    <div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="grid w-full gap-4">
                            <Label>Tahun Lulus <span className="text-red-500">*</span></Label>
                            <NumericFormat
                                name={`pendidikan[${index}][tahun_lulus]`}
                                allowLeadingZeros={false}
                                allowNegative={false}
                                customInput={Input}
                                onChange={(value) =>
                                    (pdk.tahun_lulus = value.target.value)
                                }
                                defaultValue={pdk.tahun_lulus}
                                required={true}
                            />
                            <span className="-mt-4 text-sm text-red-500">
                                {pdkError[index]?.tahun_lulus ?? ''}
                            </span>
                        </div>
                        <div className="grid w-full gap-4">
                            <InputComponent
                                title="Gelar Depan"
                                id={`gelardepan[${index}]`}
                                name={`pendidikan[${index}][gelar_depan]`}
                                type="text"
                                maxLength={100}
                                onChange={(value) =>
                                    (pdk.gelar_depan = value.target.value)
                                }
                                defaultValue={pdk.gelar_depan}
                                required={true}
                            />
                            <span className="-mt-4 text-sm text-red-500">
                                {pdkError[index]?.gelar_depan ?? ''}
                            </span>
                        </div>
                        <div className="grid w-full gap-4">
                            <InputComponent
                                title="Gelar Belakang"
                                id={`gelarbelakang[${index}]`}
                                name={`pendidikan[${index}][gelar_belakang]`}
                                type="text"
                                maxLength={100}
                                onChange={(value) =>
                                    (pdk.gelar_belakang = value.target.value)
                                }
                                defaultValue={pdk.gelar_belakang}
                                required={true}
                            />
                            <span className="-mt-4 text-sm text-red-500">
                                {pdkError[index]?.gelar_belakang ?? ''}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
