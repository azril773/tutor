import { BASEURL, DEFAULT_ERROR_MESSAGE, Fakultas, Matkul, Prodi } from "@/types";


type ResponseGetFakultas = {
    data: Array<Fakultas>;
    totalPage: number;
};

export async function GetFakultas({
    csrf_token,
    currentPage,
    nama
}: {
    csrf_token: string;
    currentPage: number
    nama: string
}): Promise<{ data: Array<Fakultas>; totalPage: number; error: string }> {

    const searchParams = new URLSearchParams({
        page: currentPage.toString(),
        nama
    })

    try {
        const response = await fetch(`${BASEURL}/fakultas?${searchParams.toString()}`, {
            method: 'GET',
            headers: {
                'X-CSRF-TOKEN': csrf_token,
            },
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(text);
        }

        const { data, totalPage }: ResponseGetFakultas = await response.json();
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


type ResponseGetProdi = {
    data: Array<Prodi>;
    totalPage: number;
};

export async function GetProdi({
    csrf_token,
    currentPage,
    nama
}: {
    csrf_token: string;
    currentPage: number
    nama: string
}): Promise<{ data: Array<Prodi>; totalPage: number; error: string }> {

    const searchParams = new URLSearchParams({
        page: currentPage.toString(),
        nama
    })

    try {
        const response = await fetch(`${BASEURL}/prodi?${searchParams.toString()}`, {
            method: 'GET',
            headers: {
                'X-CSRF-TOKEN': csrf_token,
            },
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(text);
        }

        const { data, totalPage }: ResponseGetProdi = await response.json();
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

type ResponseGetMatkul = {
    data: Array<Matkul>;
    totalPage: number;
};

export async function GetMatkul({
    csrf_token,
    currentPage,
    nama
}: {
    csrf_token: string;
    currentPage: number
    nama: string
}): Promise<{ data: Array<Matkul>; totalPage: number; error: string }> {

    const searchParams = new URLSearchParams({
        page: currentPage.toString(),
        nama
    })

    try {
        const response = await fetch(`${BASEURL}/matkul?${searchParams.toString()}`, {
            method: 'GET',
            headers: {
                'X-CSRF-TOKEN': csrf_token,
            },
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(text);
        }

        const { data, totalPage }: ResponseGetMatkul = await response.json();
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
