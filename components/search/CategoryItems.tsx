"use client";

import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";

import { cn } from "@/lib/utils";

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
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentCategory = searchParams.get("categoryId");
    const currentTitle = searchParams.get("title");

    const isSelected = currentCategory === value;

    const onClick = () => { 
        const url = qs.stringifyUrl({
            url: pathname,      
            query: {
                title: currentTitle,
                categoryId: isSelected ? null : value,
            }
        }, {skipNull: true, skipEmptyString: true});

        router.push(url);
    };

    return (
        <button 
            type="button"
            onClick={onClick}
            className={cn("flex items-center gap-x-1 py-2 px-3 text-sm border border-slate-200 rounded-full hover:border-green-700 transition",
                isSelected && "border-green-700 bg-green-200/20 text-neutral-800"
            )}
        >
            {Icon && <Icon size={20} />}
            <div className="truncate">
                {label}
            </div>
        </button>
    )
}