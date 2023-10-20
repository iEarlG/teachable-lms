
import { Chapter, Course, UserProgress } from "@prisma/client";

import { NavbarRoutes } from "@/components/navigations/navbar/NavbarRoutes";
import { CourseMobilebar } from "@/components/course/CourseMobilebar";

interface CourseNavbarProps {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null;
        })[]
    };
    progressCount: number;
}

export const CourseNavbar = ({
    course,
    progressCount
}: CourseNavbarProps) => {
    return (
        <div className="h-full flex items-center p-4 border-b bg-white shadow-sm">
            <CourseMobilebar 
                course={course}
                progressCount={progressCount}
            />
            <NavbarRoutes />
        </div>
    )
};