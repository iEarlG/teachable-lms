"use client";

import { usePathname, useRouter } from "next/navigation";

import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface SidebarItemsProps {
    icon: LucideIcon;   
    label: string;
    href: string;
};

export const SidebarItems = ({
    icon: Icon,
    label,
    href
}: SidebarItemsProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = (pathname === "/" && href === "/") || 
        pathname === href || 
        pathname?.startsWith(`${href}/`);

    const onClick = () => {
        router.push(href);
    };
    
    return (
        <button
            onClick={onClick}
            type="button"
            className={cn("flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 hover:text-slate-600 hover:bg-sky-300/20",
                isActive && "bg-sky-700 bg-slate-200/20 hover:bg-sky-200/20 hover:text-sky-700"
            )}
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon 
                    size={20} 
                    className={cn("text-slate-500",
                        isActive && "text-sky-700"
                    )} 
                />
                <span>{label}</span>
            </div>
            <div className={cn("h-full ml-auto opacity-0 border-[1px] border-sky-700 transition-all",
                isActive && "opacity-100"
            )} 
            />
        </button>
    )
};