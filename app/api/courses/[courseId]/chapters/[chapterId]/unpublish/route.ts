import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

export async function PATCH(
    req: Request,
    {params}: {params: {courseId: string; chapterId: string}}
) {
    try {
        const { userId } = auth();
        
        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId
            }
        });

        if (!ownCourse) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const unpublishedChapter = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            },
            data: {
                isPublished: false
            }
        });

        const publishedCourseChapters = await db.chapter.findMany({
            where: {
                courseId: params.courseId,
                isPublished: true
            }
        });

        if (publishedCourseChapters.length) {
            await db.course.update({
                where: {
                    id: params.courseId,
                },
                data: {
                    isPublished: false
                }
            });
        };

        return NextResponse.json(unpublishedChapter);
    } catch (error) {
        console.log(error, "ERROR PATCH UNPUBLISH CHAPTER");
        return new NextResponse("Internal Server Error", {status: 500});
    }
};