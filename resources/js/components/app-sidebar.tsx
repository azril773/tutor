import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, Key, LayoutGrid, MailPlus } from 'lucide-react';
import AppLogo from './app-logo';


export function AppSidebar() {
    const props = usePage().props
    const mainNavItems: NavItem[] = [
        {
            title: 'Bioadata',
            href: "/biodata",
            icon: MailPlus,
            groups: ["tutor"]
        },
        {
            title: 'Lamaran',
            href: "/dashboard",
            icon: MailPlus,
            groups: ["tutor"]
        },
        {
            title: 'Detail Biodata',
            href: '/dashboard/tutor/'+props.auth.user.id,
            icon: MailPlus,
            groups: ["tutor"]
        },
        {
            title: 'Admin',
            href: "/dashboard",
            icon: MailPlus,
            groups: ["admin"]
        },
        {
            title: 'Data Fakultas',
            href: "/master-fakultas",
            icon: MailPlus,
            groups: ["admin"]
        },
        {
            title: 'Data Program Studi',
            href: "/master-prodi",
            icon: MailPlus,
            groups: ["admin"]
        },
        {
            title: 'Data Mata Kuliah',
            href: "/master-matkul",
            icon: MailPlus,
            groups: ["admin"]
        },
        {
            title: 'Reset Password',
            href: '/reset-password',
            icon: Key,
            groups: ["admin", 'tutor']
        },
    ];
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
