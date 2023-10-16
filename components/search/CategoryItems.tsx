"use client";

import { cn } from "@/lib/utils";
import { IconType } from "react-icons";

interface CategoryItemsProps {
    label: string;
    icon?: IconType; 
    value?: string; 
};

export const CategoryItems = ({
    label,
    icon: Icon,
    value
}: CategoryItemsProps) => {
    return (
        <button className={cn("flex items-center gap-x-1 py-2 px-3 text-sm border border-slate-200 rounded-full hover:border-green-700 transition")}>
            {Icon && <Icon size={20} />}
            <div className="truncate">
                {label}
            </div>
        </button>
    )
}