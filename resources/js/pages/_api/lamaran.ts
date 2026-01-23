import { BASEURL, DEFAULT_ERROR_MESSAGE, LamaranType, User } from '@/types';

type ResponseGetTutors = {
    data: Array<LamaranType>;
    totalPage: number;
};
export async function GetApplications({
    csrf_token,
    currentPage,
    nama,
    user_id
}: {
    csrf_token: string;
    currentPage: number
    nama: string
    user_id?: string
}): Promise<{ data: Array<LamaranType>; totalPage: number; error: string }> {

    const searchParams = new URLSearchParams({
        page: currentPage.toString(),
        nama
    })

    if (user_id) {
        searchParams.set("user_id", user_id)
    }

    try {
        const response = await fetch(`/applications?${searchParams.toString()}`, {
            method: 'GET',
            headers: {
                'X-CSRF-TOKEN': csrf_token,
            },
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(text);
        }

        const { data, totalPage }: ResponseGetTutors = await response.json();
        return { data, totalPage, error: '' };
    } catch (err) {
        const error = err as Error;
        return {
            data: [],
            totalPage: 1,
            error: error.message ?? DEFAULT_ERROR_MESSAGE,
        };
    }
}
