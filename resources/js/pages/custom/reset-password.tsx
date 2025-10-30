import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { resetPasswordPost } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { Form, Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reset Password',
        href: '/reset-password',
    },
];
export default function ResetPassword() {
    const { errors, flash } = usePage().props;
    const [passwordBaru, setPasswordBaru] = useState<string>('');
    const [konfirmasiPasswordBaru, setKonfirmasiPasswordBaru] =
        useState<string>('');
    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Apply Lamaran" />
                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                        {Object.values(errors).map((value) => (
                        <span className="text-sm text-red-500">{value}</span>
                    ))}
                {flash.success && (
                    <>
                    <span className="text-sm text-green-500 capitalize">{flash.success}</span>
                    </>
                )}
                    <Form {...resetPasswordPost.form()} method='post'>
                        <div className="grid gap-2 md:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <Label>Password Baru</Label>
                                <Input
                                    type="password"
                                    onChange={(value) =>
                                        setPasswordBaru(value.target.value)
                                    }
                                    name="password"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Konfirmasi Password Baru</Label>
                                <Input
                                    type="password"
                                    onChange={(value) =>
                                        setKonfirmasiPasswordBaru(
                                            value.target.value,
                                        )
                                    }
                                    name="password2"
                                />
                                <span className="text-sm text-red-500">
                                    {konfirmasiPasswordBaru.length > 0 &&
                                    passwordBaru !== konfirmasiPasswordBaru
                                        ? 'Password tidak cocok'
                                        : ''}
                                </span>
                            </div>
                        </div>
                        <div>
                            <Button onClick={() => {
                                setPasswordBaru("")
                                setKonfirmasiPasswordBaru("")
                            }}>Reset</Button>
                        </div>
                    </Form>
                </div>
            </AppLayout>
        </>
    );
}
