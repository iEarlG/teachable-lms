
import { Chapter, Course, UserProgress } from "@prisma/client";

import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CourseSidebar } from "@/components/course/CourseSidebar";

interface CourseMobilebarProps {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null;
        })[]
    };
    progressCount: number;
};

export const CourseMobilebar = ({
    course,
    progressCount
}: CourseMobilebarProps) => {
    return (
        <Sheet>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0 bg-white">
                <CourseSidebar 
                    course={course}
                    progressCount={progressCount}
                />
            </SheetContent>
        </Sheet>
    )
};