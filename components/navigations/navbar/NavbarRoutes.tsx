"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useAuth } from "@clerk/nextjs";

import { LogOut } from "lucide-react";
import { isTeacher } from "@/lib/teacher";

import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/search/SearchInput";

export const NavbarRoutes = () => {
    const { userId } = useAuth();
    const pathname = usePathname();

    const isTeacherPage = pathname?.startsWith("/teacher");
    const isChapterPage = pathname?.includes("/courses");
    const isSearchPage = pathname === "/search";

    return (
        <>
        {isSearchPage && (
            <div className="hidden md:block">
                <SearchInput />
            </div>
        )}
            <div className="flex gap-x-2 ml-auto">
                {isTeacherPage || isChapterPage ? (
                    <Link href="/">
                        <Button size="sm" variant="ghost">
                            <LogOut className="h-4 w-4 mr-2" />
                            Exit
                        </Button>
                    </Link>
                ): isTeacher(userId) ? (
                    <Link href="/teacher/courses">
                        <Button size="sm" variant="ghost">
                            Teacher Mode
                        </Button>
                    </Link>
                ): null}
                <UserButton afterSignOutUrl="/" />
            </div>
        </>
    )
};