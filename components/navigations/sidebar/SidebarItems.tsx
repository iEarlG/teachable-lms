"use client";

import { LucideIcon } from "lucide-react";

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
    return (
        <div>
            SidebarItems
        </div>
    )
};