import { BASEURL, DEFAULT_ERROR_MESSAGE, User } from '@/types';

type ResponseGetTutors = {
    data: Array<User>;
    totalPage: number;
};
export async function GetTutors({
    csrf_token,
    currentPage,
    nama
}: {
    csrf_token: string;
    currentPage: number
    nama: string
}): Promise<{ data: Array<User>; totalPage: number; error: string }> {

    const searchParams = new URLSearchParams({
        page: currentPage.toString(),
        nama
    })

    try {
        const response = await fetch(`${BASEURL}/tutors?${searchParams.toString()}`, {
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
