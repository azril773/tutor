"use client"

import { Head, router } from "@inertiajs/react"
import { useState } from "react"
import {
  Copy,
  MoreHorizontal,
  Pencil,
  Printer,
  FileDown,
  Home,
  ArrowLeft,
  Download,
  AlertCircle,
  Info,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User } from "@/types"
import AppLayout from "@/layouts/app-layout"

// Types
type Pribadi = {
  id: number
  nama_lengkap?: string | null
  email?: string | null
  nowa?: string | null
  jk?: "L" | "P" | string | null
  tgl_lahir?: string | null
  nip?: string | null
  nik?: string | null
  nidn?: string | null
  alamat?: string | null
  provinsi?: string | null
  kabkot?: string | null
  kodepos?: string | null
  norek?: string | null
  atas_nama?: string | null
  nama_bank?: string | null
  npwp?: string | null
  user_id: number
}

type Institusi = {
  id: number
  institusi: string
  status_pekerjaan: string
  masa_kerja: string
  pangkat: string
  bidang_pekerjaan: string
  user_id: number
}

type Pendidikan = {
  id: number
  perguruan_tinggi: string
  jenjang: string
  bidang_studi: string
  tahun_lulus: string
  gelar_depan: string
  gelar_belakang: string
  user_id: number
}

type Dokumen = {
  id: number
  cv?: string | null
  ijazah?: string | null
  rps?: string | null
  foto_ktp?: string | null
  buku_tabungan?: string | null
  surat_ketersediaan?: string | null
  user_id: number
}

type PageProps = {
  title?: string
  error?: string | null
  loading?: boolean
  user: User
  urls: {
    back?: string
    edit?: string
    exportPdf?: string
    print?: string
  }
}

// Utility: Format date to Indonesian format (DD MMM YYYY)
const formatDate = (dateString?: string | null): string => {
  if (!dateString) return "—"
  try {
    const date = new Date(dateString)
    const formatter = new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    return formatter.format(date)
  } catch {
    return "—"
  }
}

// Utility: Extract filename from path
const shortPath = (url?: string | null): string => {
  if (!url) return "Tidak tersedia"
  const parts = url.split("/")
  return parts[parts.length - 1]
}

// Utility: Get initials from name
const getInitials = (name?: string | null): string => {
  if (!name) return "U"
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

// Component: Document Item
const DocumentItem = ({
  label,
  path,
  onCopy,
}: {
  label: string
  path?: string | null
  onCopy: (path: string) => void
}) => {
  const isAvailable = !!path
  const filename = shortPath(path)

  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <div className="flex-1">
        <p className="text-sm font-medium">{label}</p>
        <p className={`text-xs ${isAvailable ? "text-muted-foreground" : "text-muted-foreground"}`}>{filename}</p>
      </div>
      {isAvailable && (
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(`/files/${path}`, "_blank")}
                  aria-label={`Unduh ${label}`}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Unduh</TooltipContent>
            </Tooltip>
          </TooltipProvider>

        </div>
      )}
    </div>
  )
}

// Component: Education Table
const EducationTable = ({
  data,
  loading,
}: {
  data: Pendidikan[]
  loading?: boolean
}) => {
  const [searchTerm, setSearchTerm] = useState("")

  const filtered = data.filter(
    (item) =>
      item.perguruan_tinggi?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.bidang_studi?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Pendidikan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Pendidikan</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>Belum ada riwayat pendidikan</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Riwayat Pendidikan</CardTitle>
          <Badge variant="secondary">{data.length} item</Badge>
        </div>
        <div className="mt-4">
          <Input
            placeholder="Cari perguruan tinggi atau bidang studi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        {filtered.length === 0 ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Tidak ada hasil pencarian</AlertDescription>
          </Alert>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Perguruan Tinggi</TableHead>
                <TableHead>Jenjang</TableHead>
                <TableHead>Bidang Studi</TableHead>
                <TableHead>Tahun Lulus</TableHead>
                <TableHead>Gelar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.perguruan_tinggi || "—"}</TableCell>
                  <TableCell>{item.jenjang || "—"}</TableCell>
                  <TableCell>{item.bidang_studi || "—"}</TableCell>
                  <TableCell>{item.tahun_lulus || "—"}</TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {item.gelar_depan || ""}
                      {item.gelar_depan && item.gelar_belakang ? " " : ""}
                      {item.gelar_belakang || "—"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

// Main Component: Show
export default function Show({
  title = "Detail tutor",
  error,
  user
}: PageProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopyLink = (path: string) => {
    navigator.clipboard.writeText(path).then(() => {
      setCopiedId(path)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }


  const fullName = user.pribadi?.nama_lengkap || "Pengguna"
  const initials = getInitials(fullName)

  return (
    <AppLayout>
      <Head title={title} />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-card p-6">
          <div className="mx-auto max-w-4xl">    
            {/* Title & Actions */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">{title}</h1>
                <p className="mt-1 text-sm text-muted-foreground">Informasi lengkap profil tutor</p>
              </div>

              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {/* <DropdownMenuItem >
                      <Printer className="mr-2 h-4 w-4" />
                      Cetak
                    </DropdownMenuItem>
                    <DropdownMenuItem  >
                      <FileDown className="mr-2 h-4 w-4" />
                      Export PDF
                    </DropdownMenuItem> */}
                    <DropdownMenuItem  onClick={() => router.visit("/dashboard")}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Kembali
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Status Badge */}
          </div>
        </div>

        {/* Content */}
        <div className="bg-background p-6">
          <div className="mx-auto max-w-4xl space-y-6">
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="pendidikan">Pendidikan</TabsTrigger>
                <TabsTrigger value="dokumen">Dokumen</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {/* Personal Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Data Pribadi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 lg:grid-cols-3">
                      {/* Avatar & Name */}
                      <div className="flex flex-col items-center gap-4 lg:col-span-1">
                        <Avatar className="h-20 w-20">
                          <AvatarFallback className="bg-primary text-lg font-bold text-primary-foreground">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                          <p className="font-semibold">{fullName}</p>
                          <p className="text-sm text-muted-foreground">{user.pribadi?.email || "—"}</p>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="space-y-4 lg:col-span-2">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">No. Telepon</p>
                            <p className="text-sm">{user.pribadi?.nowa || "—"}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">Jenis Kelamin</p>
                            <p className="text-sm">
                                <Badge variant="outline" className="capitalize">{user.pribadi?.jk ?? '-'}</Badge>
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">Tanggal Lahir</p>
                            <p className="text-sm">{user.pribadi?.tgl_lahir ?formatDate(user.pribadi?.tgl_lahir.toLocaleString()) : '-'}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">NIP</p>
                            <p className="text-sm">{user.pribadi?.nip || "—"}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">NIK</p>
                            <p className="text-sm">{user.pribadi?.nik || "—"}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">NIDN</p>
                            <p className="text-sm">{user.pribadi?.nidn || "—"}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">Alamat</p>
                            <p className="text-sm">{user.pribadi?.alamat || "—"}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">Provinsi</p>
                            <p className="text-sm">{user.pribadi?.provinsi || "—"}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">Kabupaten/Kota</p>
                            <p className="text-sm">{user.pribadi?.kabkot || "—"}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">Kode Pos</p>
                            <p className="text-sm">{user.pribadi?.kodepos || "—"}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">NPWP</p>
                            <p className="text-sm">{user.pribadi?.npwp || "—"}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">NUPTK</p>
                            <p className="text-sm">{user.pribadi?.nuptk || "—"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Institution Card */}
                {user.institusi && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Institusi</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Institusi</p>
                          <p className="text-sm font-medium">{user.institusi.institusi || "—"}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Status Pekerjaan</p>
                          <p className="text-sm">{user.institusi.status_pekerjaan || "—"}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Masa Kerja</p>
                          <p className="text-sm">{user.institusi.masa_kerja || "—"}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Pangkat</p>
                          <p className="text-sm">{user.institusi.golongan || "—"}</p>
                        </div>
                        <div className="sm:col-span-2">
                          <p className="text-xs font-medium text-muted-foreground">Bidang Pekerjaan</p>
                          <p className="text-sm">{user.institusi.bidang_pekerjaan || "—"}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Summary for quick reference */}
                {user.pendidikan.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Ringkasan Pendidikan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {user.pendidikan.slice(0, 3).map((item) => (
                          <div key={item.id} className="text-sm">
                            <p className="font-medium">{item.perguruan_tinggi}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.jenjang} - {item.tahun_lulus}
                            </p>
                          </div>
                        ))}
                        {user.pendidikan.length > 3 && (
                          <p className="pt-2 text-xs text-muted-foreground">+{user.pendidikan.length - 3} lebih banyak</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Pendidikan Tab */}
              <TabsContent value="pendidikan">
                <EducationTable data={user.pendidikan as Pendidikan[]}/>
              </TabsContent>

              {/* Dokumen Tab */}
              <TabsContent value="dokumen">
                <Card>
                  <CardHeader>
                    <CardTitle>Dokumen</CardTitle>
                    <CardDescription>Manajemen dokumen profil pengguna</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {user.dokumen ? (
                      <div className="space-y-3">
                        <DocumentItem label="CV" path={user.dokumen.cv} onCopy={handleCopyLink} />
                        <DocumentItem label="Ijazah" path={user.dokumen.ijazah} onCopy={handleCopyLink} />
                        <DocumentItem label="RPS" path={user.dokumen.rps} onCopy={handleCopyLink} />
                        <DocumentItem label="Foto KTP" path={user.dokumen.foto_ktp} onCopy={handleCopyLink} />
                        <DocumentItem label="Buku Tabungan" path={user.dokumen.buku_tabungan} onCopy={handleCopyLink} />
                        <DocumentItem
                          label="Surat Ketersediaan"
                          path={user.dokumen.surat_ketersediaan}
                          onCopy={handleCopyLink}
                        />
                      </div>
                    ) : (
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription>Belum ada dokumen yang diunggah</AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
