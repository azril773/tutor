import { ResponseApi } from '@/types';

export async function updateBiodata({
    formData,
    csrf_token,
}: {
    formData: FormData;
    csrf_token: string;
}): Promise<ResponseApi> {
    try {
        const response = await fetch('/biodata', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'X-CSRF-TOKEN': csrf_token,
            },
            body: formData,
        });
        if (!response.ok) {
            const text = await response.text();
            console.log(text)
            throw new Error(text);
        }

        const result: ResponseApi = await response.json();
        return result;
    } catch (err) {
        const error = err as Error;
        return {
            data: 'null',
            message: error.message ?? 'Terjadi Kesalahan',
            error: 'true',
        };
    }
}
