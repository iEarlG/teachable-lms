import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

export async function PATCH(
    req: Request,
    { params }: {params: {courseId: string}}
) {
    try {
        const { userId } = auth();
        const { courseId } = params;
        const values = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

       const course = await db.course.update({
        where: {
            id: courseId,
            userId
        },
        data: {
            ...values
        }
       })

      return NextResponse.json(course);

    } catch (error) {
        console.log(error, "Error while fetching course details [COURSE ID API]");
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};

const { Video } = new Mux(
    process.env.MUX_TOKEN_ID!,
    process.env.MUX_TOKEN_SECRET!
);

export async function DELETE(
    req: Request,
    { params }: {params: {courseId: string}}
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

       const course = await db.course.findUnique({
        where: {
            id: params.courseId,
            userId
        },
        include: {
            chapters: {
                include: {
                    muxData: true
                }
            }
        }
       });

       if (!course) {
            return new NextResponse("Course not found!", { status: 404 });
       }

       for (const chapter of course.chapters) {
            if (chapter.muxData?.assetId) {
                await Video.Assets.del(chapter.muxData.assetId);
            }
       };

       const deletedCourse = await db.course.delete({
            where: {
                id: params.courseId,
            }
       });

      return NextResponse.json(deletedCourse);

    } catch (error) {
        console.log(error, "ERROR WHILE DELETING THE COURSE [COURSE ID API]");
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};