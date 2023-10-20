import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getProgress } from "@/actions/getProgress";

import { CourseSidebar } from "@/components/course/CourseSidebar";
import { CourseNavbar } from "@/components/course/CourseNavbar";

const CourseLayout = async ({
    children,
    params
}: { 
    children: React.ReactNode;
    params: { courseId: string };
}) => {
    const { userId } = auth();

    if (!userId) {
       return redirect("/")
    };

    const course = await db.course.findUnique({
        where: {
            id: params.courseId
        },
        include: {
            chapters: {
                where: {
                    isPublished: true
                },
                include: {
                    userProgress: {
                        where: {
                            userId
                        }
                    }
                },
                orderBy: {
                    position: "asc"
                }
            }
        }
    });

    if (!course) {
        return redirect("/")
    };

    const progressCount = await getProgress(userId, course.id);

    return ( 
        <div className="h-full">
            <div className="h-[80px] w-full md:pl-80 fixed inset-y-0 z-50">
                <CourseNavbar 
                    course={course}
                    progressCount={progressCount}
                />
            </div>
            <div className="hidden md:flex flex-col fixed h-full w-80 inset-y-0 z-50">
                <CourseSidebar 
                    course={course}
                    progressCount={progressCount}
                />
            </div>
            <main className="md:pl-80 h-full pt-[80px]">
                {children}
            </main>
        </div>
    );
}
 
export default CourseLayout;