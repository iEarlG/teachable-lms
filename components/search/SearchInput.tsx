"use client";

import qs from "query-string";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

import { Input } from "@/components/ui/input";

export const SearchInput = () => {
    const [value, setValue] = useState("");
    const debounceValue = useDebounce(value);
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentCategory = searchParams.get("categoryId");

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                categoryId: currentCategory,
                title: debounceValue,
            }
        }, { skipEmptyString: true, skipNull: true });

        router.push(url);

    }, [debounceValue, currentCategory, router, pathname]);
    

    return (
        <div className="relative">
            <Search 
                className="h-4 w-4 absolute top-3 left-3 text-slate-600"
            />
            <Input 
                className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
                placeholder="Search for courses"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
};