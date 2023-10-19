import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { Chapter, Course, UserProgress } from "@prisma/client";
import { db } from "@/lib/db";

interface CourseSidebarProps {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null;
        })[]
    };
    progressCount: number;
};

export const CourseSidebar = async ({
    course,
    progressCount
}: CourseSidebarProps) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/")
    };

    const purchase = await db.purchase.findUnique({
        where: {
            userId_courseId: {
                userId,
                courseId: course.id
            }
        }
    });
    
    return (
        <div className="h-full flex flex-col overflow-y-auto shadow-sm border-r">
            <div className="flex flex-col p-8 border-b">
                <h1 className="font-semibold">
                    {course.title}
                </h1>
            </div>
            <div className="flex flex-col w-full">
                {course.chapters.map((chapter) => (
                    <CourseSidebarItems 
                        key={chapter.id}
                        id={chapter.id}
                        courseId={course.id}
                        label={chapter.title}
                        isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                        isLocked={!chapter.isFree && !purchase}
                    />
                ))}
            </div>
        </div>
    )
};