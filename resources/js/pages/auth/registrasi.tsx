import registrasi from '@/actions/App/Http/Controllers/CustomAuth/registrasi';
import InputComponent from '@/components/inpur';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Form, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { NumericFormat } from 'react-number-format';

export default function Registrasi() {
    const { flash } = usePage().props;
    const [namaLengkap, setNamaLengkap] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [nik, setNik] = useState<string>('');
    const [jk, setJk] = useState<string>('');
    return (
        <>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        <>
                            <Link
                                href={'/'}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Login
                            </Link>{' '}
                        </>
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-[800px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                        <div className="flex-1 rounded-br-lg rounded-bl-lg bg- p-6 pb-12 leading-[20px] lg:rounded-tl-lg lg:rounded-br-none  dark:text-[#EDEDEC] ">
                            <div className="flex flex-col items-center gap-4">
                                <div className="mb-1 flex items-center justify-center rounded-md">
                                    <img src="/logouin2.png" alt="logo uin" />
                                </div>
                                <div className="space-y-2 text-center">
                                    <h1 className="text-xl font-medium">
                                        Registrasi Tutor
                                    </h1>
                                    <p className="text-center text-sm text-muted-foreground">
                                        Silahkan masukan data yang ada di bawah.
                                    </p>
                                </div>
                            </div>
                            {flash.error && (
                                <div className="my-1">
                                    <br />
                                    <span className="text-sm text-red-500">
                                        {flash.error}
                                    </span>
                                </div>
                            )}
                            <br />
                            <Form
                                {...registrasi.registrasi_user.form()}
                                method="post"
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <InputComponent
                                            defaultValue={namaLengkap}
                                            title="Nama Lengkap"
                                            id="namaLengkap"
                                            name="namaLengkap"
                                            type="text"
                                            maxLength={100}
                                            onChange={(value) =>
                                                setNamaLengkap(
                                                    value.target.value,
                                                )
                                            }
                                            autoFocus
                                        />
                                        <span className="-mt-4 text-sm text-red-500">
                                            {/* {error['namaLengkap'] ?? ''} */}
                                        </span>
                                    </div>
                                    <div>
                                        <InputComponent
                                            defaultValue={email}
                                            title="Email"
                                            id="email"
                                            name="email"
                                            type="text"
                                            onChange={(value) =>
                                                setEmail(value.target.value)
                                            }
                                        />
                                        <span className="-mt-4 text-sm text-red-500">
                                            {/* {error['email'] ?? ''} */}
                                        </span>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>NIK</Label>
                                        <NumericFormat
                                            defaultValue={nik}
                                            allowLeadingZeros={true}
                                            allowNegative={true}
                                            customInput={Input}
                                            maxLength={20}
                                            onChange={(value) =>
                                                setNik(value.target.value)
                                            }
                                            name="nik"
                                        />
                                        <span className="-mt-4 text-sm text-red-500">
                                            {/* {error['nik'] ?? ''} */}
                                        </span>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Jenis Kelamin</Label>
                                        <Select
                                            name="jk"
                                            defaultValue={jk}
                                            onValueChange={(value) =>
                                                setJk(value)
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Jenis Kelamin" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="laki-laki">
                                                    Laki Laki
                                                </SelectItem>
                                                <SelectItem value="wanita">
                                                    Wanita
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <span className="-mt-4 text-sm text-red-500">
                                            {/* {error['jk'] ?? ''} */}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex w-full justify-end">
                                    <Button type="submit">Registrasi</Button>
                                </div>
                            </Form>
                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
