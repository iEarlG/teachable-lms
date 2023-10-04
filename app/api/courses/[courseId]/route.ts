import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

export async function PATCH(
    req: Request,
    { params }: {params: {courseId: string}}
) {
    try {
        const { userId} = auth();
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