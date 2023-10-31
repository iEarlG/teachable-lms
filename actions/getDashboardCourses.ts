import { Category, Chapter, Course } from "@prisma/client";

import { db } from "@/lib/db";
import { getProgress } from "@/actions/getProgress";

type CourseWithProgressWithCategory = Course & {
    category: Category;
    chapters: Chapter[];
    progress: number | null;
};

type DashboardCourse = {
    completedCourses: CourseWithProgressWithCategory[],
    inProgressCourses: CourseWithProgressWithCategory[],
};

export const getDashboardCourses = async (
    userId: string,
): Promise<DashboardCourse> => {
    try {   
        const purchasedCourses = await db.purchase.findMany({
            where: {
                userId,
            },
            select: {
                course: {
                    include: {
                        category: true,
                        chapters: {
                            where: {
                                isPublished: true,
                            }
                        }
                    }
                }
            }
        });

        const courses = purchasedCourses.map((purchase) => purchase.course) as CourseWithProgressWithCategory[];

        for (let course of courses) {
            const progress = await getProgress(userId, course.id);
            course["progress"] = progress;
        }

        const completedCourses = courses.filter((course) => course.progress === 100);
        const inProgressCourses = courses.filter((course) => (course.progress ?? 0) < 100);

        return {
            completedCourses,
            inProgressCourses,
        };
    } catch (error) {
        console.log("DashboardCourses Error", error);
        return {
            completedCourses: [],
            inProgressCourses: [],
        }
    };
}