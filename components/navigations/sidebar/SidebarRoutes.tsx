"use client";

import { usePathname } from "next/navigation";

import { Layout, Compass, Book, LineChart } from "lucide-react";

import { SidebarItems } from "@/components/navigations/sidebar/SidebarItems";

const studentRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/",
    },
    {
        icon: Compass,  
        label: "Browse Courses",
        href: "/search"
    },
];

const teacherRoutes = [
    {
        icon: Book,
        label: "Courses",
        href: "/teacher/courses",
    },
    {
        icon: LineChart,  
        label: "Analytics",
        href: "/teacher/analytics"
    },
];

export const SidebarRoutes = () => {
    const pathname = usePathname();

    const isTeacherMode = pathname?.startsWith("/teacher");
    const routes = isTeacherMode ? teacherRoutes : studentRoutes;

    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItems 
                    key={route.href}
                    icon={route.icon}   
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    )
};