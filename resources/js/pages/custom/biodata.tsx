import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import AppLayout from '@/layouts/app-layout';
import {
    BreadcrumbItem,
    Dokumen as DokumenType,
    Institusi,
    Pendidikan,
    PendidikanPayload,
    Pribadi,
} from '@/types';
import { usePage } from '@inertiajs/react';
import { FileText, Landmark, University, Users } from 'lucide-react';
import { useState } from 'react';
import { updateBiodata } from '../_api/biodata';
import DataInstitusi from '../auth/components/data-institusi';
import DataPendidikan from '../auth/components/data-pendidikan';
import DataPribadi from '../auth/components/data-pribadi';
import Dokumen from '../auth/components/dokumen';

export default function Biodata({
    idUser,
    dataPribadi,
    dataInstitusi,
    dataPendidikan,
    dokumen
}: {
    idUser: string;
    dataPribadi: Pribadi | null;
    dataInstitusi?: Institusi;
    dataPendidikan: Pendidikan[];
    dokumen?: DokumenType
}) {
    const page = usePage();
    const arrayMenu: string[] = [
        'pribadi',
        'institusi',
        'pendidikan',
        'dokumen',
    ];
    const [loading, setLoading] = useState<boolean>(false);
    const [view, setView] = useState<
        'pribadi' | 'institusi' | 'pendidikan' | 'dokumen'
    >('pribadi');

    // Data pribadi
    const [namalengkap, setNamaLengkap] = useState<string>(
        dataPribadi?.nama_lengkap ?? '',
    );
    const [email, setEmail] = useState<string>(dataPribadi?.email ?? '');
    const [tglLahir, setTglLahir] = useState<Date | undefined>(
        dataPribadi?.tgl_lahir ?? undefined,
    );
    const [jk, setJk] = useState<string>(dataPribadi?.jk ?? '');
    const [nowa, setNowa] = useState<string>(dataPribadi?.nowa ?? '');
    const [nip, setNip] = useState<string>(dataPribadi?.nip ?? '');
    const [nik, setNik] = useState<string>(dataPribadi?.nik ?? '');
    const [nuptk, setNuptk] = useState<string>(dataPribadi?.nuptk ?? '');
    const [npwp, setNpwp] = useState<string>(dataPribadi?.npwp ?? '');
    const [nidn, setNidn] = useState<string>(dataPribadi?.nidn ?? '');
    const [provinsi, setProvinsi] = useState<string>(
        dataPribadi?.provinsi ?? '',
    );
    const [kabkot, setKabkot] = useState<string>(dataPribadi?.kabkot ?? '');
    const [kodePos, setKodePos] = useState<string>(dataPribadi?.kodepos ?? '');
    const [alamat, setAlamat] = useState<string>(dataPribadi?.alamat ?? '');
    const [norek, setNorek] = useState<string>(dataPribadi?.norek ?? '');
    const [atasNama, setAtasNama] = useState<string>(
        dataPribadi?.atas_nama ?? '',
    );
    const [namaBank, setNamaBank] = useState<string>(
        dataPribadi?.nama_bank ?? '',
    );

    // data institusi
    const [institusi, setInstitusi] = useState<string>(
        dataInstitusi?.institusi ?? '',
    );
    const [statusPekerjaan, setStatusPekerjaan] = useState<string>(
        dataInstitusi?.status_pekerjaan ?? '',
    );
    const [masaKerja, setMasaKerja] = useState<string>(
        dataInstitusi?.masa_kerja ?? '',
    );
    const [golongan, setGolongan] = useState<string>(
        dataInstitusi?.golongan ?? '',
    );
    const [bidangPekerjaan, setBidangPekerjaan] = useState<string>(
        dataInstitusi?.bidang_pekerjaan ?? '',
    );

    const [cv, setCv] = useState<File | null>(null);
    const [ijazah, setIjazah] = useState<File | null>(null);
    const [rps, setRps] = useState<File | null>(null);
    const [fotoKtp, setFotoKtp] = useState<File | null>(null);
    const [bukuTabungan, setBukuTabungan] = useState<File | null>(null);
    const [suratKetersediaan, setSuratKetersediaan] = useState<File | null>(
        null,
    );

    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [error, setError] = useState<Record<string, string>>({});
    const [pdkError, setPdkError] = useState<
        Record<string, Partial<Pendidikan>>
    >({});
    const [pendidikan, setPendidikan] = useState<Array<PendidikanPayload>>(
        dataPendidikan.length > 0
            ? dataPendidikan
            : [
                  {
                      perguruan_tinggi: '',
                      jenjang: '',
                      bidang_studi: '',
                      tahun_lulus: '',
                      gelar_depan: '',
                      gelar_belakang: '',
                  },
              ],
    );

    const handleViewChange = (view: string) => {
        switch (view) {
            case 'pribadi':
                setView('pribadi');
                break;
            case 'institusi':
                if (!checkErrorPribadi()) return false;
                setView('institusi');
                break;
            case 'pendidikan':
                if (!checkErrorPribadi()) return false;
                if (!checkErrorInstitusi()) return false;
                setView('pendidikan');
                break;
            case 'dokumen':
                if (!checkErrorPribadi()) return false;
                if (!checkErrorInstitusi()) return false;
                if (!checkErrorPendidikan()) return false;

                setView('dokumen');
                break;
            default:
                break;
        }
    };

    const checkErrorPribadi = (): boolean => {
        let tempError: Record<string, string> = {};
        if (namalengkap.length <= 0)
            tempError['namaLengkap'] = 'Form Ini harus diisi.';
        if (email.length <= 0) tempError['email'] = 'Form Ini harus diisi.';
        if (!tglLahir) tempError['tglLahir'] = 'Form Ini harus diisi.';
        if (jk.length <= 0) tempError['jk'] = 'Form Ini harus diisi.';
        if (nowa.length <= 0) tempError['nowa'] = 'Form ini harus diisi.';
        if (nip.length <= 0) tempError['nip'] = 'Form ini harus diisi.';
        if (nik.length <= 0) tempError['nik'] = 'Form ini harus diisi.';
        if (nidn.length <= 0) tempError['nidn'] = 'Form ini harus diisi.';
        if (nuptk.length <= 0) tempError['nuptk'] = 'Form ini harus diisi.';
        if (npwp.length <= 0) tempError['npwp'] = 'Form ini harus diisi.';
        if (provinsi.length <= 0)
            tempError['provinsi'] = 'Form ini harus diisi.';
        if (kabkot.length <= 0) tempError['kabkot'] = 'Form ini harus diisi.';
        if (kodePos.length <= 0) tempError['kodePos'] = 'Form ini harus diisi.';
        if (alamat.length <= 0) tempError['alamat'] = 'Form ini harus diisi.';
        if (norek.length <= 0) tempError['norek'] = 'Form ini harus diisi.';
        if (atasNama.length <= 0)
            tempError['atasNama'] = 'Form ini harus diisi.';
        if (namaBank.length <= 0)
            tempError['namaBank'] = 'Form ini harus diisi.';

        console.log('OKOKOk');
        setError(tempError);
        return Object.keys(tempError).length === 0;
    };

    const checkErrorInstitusi = () => {
        let tempError: Record<string, string> = {};
        if (institusi.length <= 0)
            tempError['institusi'] = 'Form ini harus diisi.';
        if (statusPekerjaan.length <= 0)
            tempError['statusPekerjaan'] = 'Form ini harus diisi.';
        if (masaKerja.length <= 0)
            tempError['masaKerja'] = 'Form ini harus diisi.';
        if (golongan.length <= 0) tempError['golongan'] = 'Form ini harus diisi.';
        if (bidangPekerjaan.length <= 0)
            tempError['bidangPekerjaan'] = 'Form ini harus diisi.';
        setError(tempError);
        return Object.keys(tempError).length === 0;
    };

    const checkErrorPendidikan = () => {
        let tempErrorPdk: Record<string, Partial<Pendidikan>> = {};
        pendidikan.forEach((pdk, index) => {
            tempErrorPdk[index] = {};
            if (pdk.perguruan_tinggi.length <= 0)
                tempErrorPdk[index]['perguruan_tinggi'] =
                    'Form ini harus diisi.';
            if (pdk.jenjang.length <= 0)
                tempErrorPdk[index]['jenjang'] = 'Form ini harus diisi.';
            if (pdk.bidang_studi.length <= 0)
                tempErrorPdk[index]['bidang_studi'] = 'Form ini harus diisi.';
            if (pdk.tahun_lulus.length <= 0)
                tempErrorPdk[index]['tahun_lulus'] = 'Form ini harus diisi.';
            if (pdk.gelar_depan.length <= 0)
                tempErrorPdk[index]['gelar_depan'] = 'Form ini harus diisi.';
            if (pdk.gelar_belakang.length <= 0)
                tempErrorPdk[index]['gelar_belakang'] = 'Form ini harus diisi.';
        });
        setPdkError(tempErrorPdk);
        return !Object.values(tempErrorPdk).some(
            (value) => Object.keys(value).length > 0,
        );
    };

    const checkFile = () => {
        let tempError: Record<string, string> = {};
        if (!cv) tempError['cv'] = 'Form Ini harus diisi.';
        if (!ijazah) tempError['ijazah'] = 'Form Ini harus diisi.';
        if (!rps) tempError['rps'] = 'Form Ini harus diisi.';
        if (!fotoKtp) tempError['fotoKtp'] = 'Form Ini harus diisi.';
        if (!bukuTabungan) tempError['bukuTabungan'] = 'Form Ini harus diisi.';
        if (!suratKetersediaan)
            tempError['suratKetersediaan'] = 'Form Ini harus diisi.';

        setError(tempError);
        return Object.keys(tempError).length === 0;
    };

    const handleSubmitForm = async (idUser: string) => {
        const formData = new FormData();
        formData.append('id', idUser);
        formData.append('namaLengkap', namalengkap);
        formData.append('email', email);
        formData.append(
            'tgl_lahir',
            new Date(tglLahir ?? '')?.toISOString() ?? '',
        );
        formData.append('jk', jk);
        formData.append('nowa', nowa);
        formData.append('nip', nip);
        formData.append('nik', nik);
        formData.append('nidn', nidn);
        formData.append('nuptk', nuptk);
        formData.append('npwp', npwp);
        formData.append('provinsi', provinsi);
        formData.append('kabkot', kabkot);
        formData.append('kodePos', kodePos);
        formData.append('alamat', alamat);
        formData.append('norek', norek);
        formData.append('atasNama', atasNama);
        formData.append('namaBank', namaBank);
        formData.append('institusi', institusi);
        formData.append('statusPekerjaan', statusPekerjaan);
        formData.append('masaKerja', masaKerja);
        formData.append('golongan', golongan);
        formData.append('bidangPekerjaan', bidangPekerjaan);
        formData.append('pendidikan', JSON.stringify(pendidikan));
        formData.append('cv', cv as Blob ?? '');
        formData.append('ijazah', ijazah as Blob ?? '');
        formData.append('rps', rps as Blob ?? '');
        formData.append('fotoKtp', fotoKtp as Blob ?? '');
        formData.append('bukuTabungan', bukuTabungan as Blob ?? '');
        formData.append('suratKetersediaan', suratKetersediaan as Blob ?? '');

        const { data, message, error } = await updateBiodata({
            formData,
            csrf_token: page.props.csrf_token,
        });
        if (error === 'true') {
            setLoading(false)
            alert(message)
        }else{
            alert(message)
            window.location.href = '/biodata'
        }

    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Biodata',
            href: '/biodata',
        },
    ];
    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="my-3 flex items-center justify-center gap-3">
                    <div className="flex flex-col items-center">
                        <span className="mb-1 text-xs sm:text-xs/6">
                            Data Pribadi
                        </span>
                        <Button
                            className={`w-5 sm:w-10 ${view === 'pribadi' ? 'bg-gray-900' : 'bg-gray-800'} cursor-pointer`}
                            onClick={() => {
                                handleViewChange('pribadi');
                            }}
                        >
                            <Users className="size-[15px] text-white sm:size-[20px]" />
                        </Button>
                    </div>
                    <Separator className="max-w-4 lg:max-w-12" />
                    <div className="flex flex-col items-center">
                        <span className="mb-1 text-xs sm:text-xs/6">
                            Institusi
                        </span>
                        <Button
                            className={`w-5 sm:w-10 ${view === 'institusi' ? 'bg-gray-900' : 'bg-gray-800'} cursor-pointer`}
                            onClick={() => {
                                handleViewChange('institusi');
                            }}
                        >
                            <Landmark className="size-[15px] text-white sm:size-[20px]" />
                        </Button>
                    </div>
                    <Separator className="max-w-4 lg:max-w-12" />
                    <div className="flex flex-col items-center">
                        <span className="mb-1 text-xs sm:text-xs/6">
                            Pendidikan
                        </span>
                        <Button
                            className={`w-5 sm:w-10 ${view === 'pendidikan' ? 'bg-gray-900' : 'bg-gray-800'} cursor-pointer`}
                            onClick={() => {
                                handleViewChange('pendidikan');
                            }}
                        >
                            <University className="size-[15px] text-white sm:size-[20px]" />
                        </Button>
                    </div>
                    <Separator className="max-w-4 lg:max-w-12" />
                    <div className="flex flex-col items-center">
                        <span className="mb-1 text-xs sm:text-xs/6">
                            Dokumen
                        </span>
                        <Button
                            className={`w-5 sm:w-10 ${view === 'dokumen' ? 'bg-gray-900' : 'bg-gray-800'} cursor-pointer`}
                            onClick={() => {
                                handleViewChange('dokumen');
                            }}
                        >
                            <FileText className="size-[15px] text-white sm:size-[20px]" />
                        </Button>
                    </div>
                </div>
                {Object.values(errors).map((value) => (
                    <span className="text-sm text-red-500">{value}</span>
                ))}
                {page.props.flash.error && (
                    <span className="text-sm text-red-500">
                        {page.props.flash.error}
                    </span>
                )}
                {page.props.flash.success && (
                    <span className="text-sm text-green-500">
                        {page.props.flash.success}
                    </span>
                )}
                <section className="mx-10 my-10">
                    <section
                        id="data-pribadi"
                        className={`${view !== 'pribadi' ? 'hidden' : ''}`}
                    >
                        <DataPribadi
                            namaLengkap={namalengkap}
                            setNamaLengkap={setNamaLengkap}
                            email={email}
                            setEmail={setEmail}
                            jk={jk}
                            setJk={setJk}
                            nowa={nowa}
                            setNowa={setNowa}
                            nip={nip}
                            setNip={setNip}
                            nik={nik}
                            setNik={setNik}
                            nidn={nidn}
                            setNidn={setNidn}
                            nuptk={nuptk}
                            setNuptk={setNuptk}
                            npwp={npwp}
                            setNpwp={setNpwp}
                            provinsi={provinsi}
                            setProvinsi={setProvinsi}
                            kabkot={kabkot}
                            setKabkot={setKabkot}
                            kodePos={kodePos}
                            setKodepos={setKodePos}
                            alamat={alamat}
                            setAlamat={setAlamat}
                            norek={norek}
                            setNorek={setNorek}
                            atasNama={atasNama}
                            setAtasNama={setAtasNama}
                            namaBank={namaBank}
                            setNamaBank={setNamaBank}
                            tglLahir={tglLahir}
                            setTglLahir={setTglLahir}
                            error={error}
                        />
                    </section>
                    <section
                        id="data-institusi"
                        className={`${view !== 'institusi' ? 'hidden' : ''}`}
                    >
                        <DataInstitusi
                            institusi={institusi}
                            setInstitusi={setInstitusi}
                            statusPekerjaan={statusPekerjaan}
                            setStatusPekerjaan={setStatusPekerjaan}
                            masaKerja={masaKerja}
                            setMasaKerja={setMasaKerja}
                            golongan={golongan}
                            setGolongan={setGolongan}
                            bidangPekerjaan={bidangPekerjaan}
                            setBidangPekerjaan={setBidangPekerjaan}
                            error={error}
                        />
                    </section>
                    <section
                        id="data-institusi"
                        className={`${view !== 'pendidikan' ? 'hidden' : ''}`}
                    >
                        <DataPendidikan
                            pendidikan={pendidikan}
                            setPendidikan={setPendidikan}
                            pdkError={pdkError}
                        />
                    </section>
                    <section
                        id="data-institusi"
                        className={`${view !== 'dokumen' ? 'hidden' : ''}`}
                    >
                        <Dokumen
                            cv={cv}
                            setCv={setCv}
                            ijazah={ijazah}
                            setIjazah={setIjazah}
                            rps={rps}
                            setRps={setRps}
                            fotoKtp={fotoKtp}
                            setFotoKtp={setFotoKtp}
                            bukuTabungan={bukuTabungan}
                            setBukuTabungan={setBukuTabungan}
                            suratKetersediaan={suratKetersediaan}
                            setSuratKetersediaan={setSuratKetersediaan}
                            error={error}
                            dokumen={dokumen}
                        />
                    </section>
                </section>
                <div className="flex justify-end">
                    <Button
                        className={`${view !== 'dokumen' ? 'hidden' : ''}`}
                        onClick={() => {
                            // console.log(checkFile());
                            setLoading(true);
                            handleSubmitForm(idUser);
                        }}
                    >
                        Update {loading && <Spinner />}
                    </Button>
                    <Button
                        className={`${view === 'dokumen' ? 'hidden' : ''}`}
                        type="button"
                        onClick={() => {
                            const menu = arrayMenu[arrayMenu.indexOf(view) + 1];
                            handleViewChange(menu);
                        }}
                    >
                        Berikutnya
                    </Button>
                </div>
            </AppLayout>
        </>
    );
}
