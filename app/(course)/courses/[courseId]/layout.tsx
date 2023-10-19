import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getProgress } from "@/actions/getProgress";

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
                    userProgresses: {
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
            <div className="hidden md:flex flex-col fixed h-full w-80 inset-y-0 z-50">
                <CourseSidebar 
                    course={course}
                    progressCount={progressCount}
                />
            </div>
            <main className="md:pl-80 h-full">
                {children}
            </main>
        </div>
    );
}
 
export default CourseLayout;