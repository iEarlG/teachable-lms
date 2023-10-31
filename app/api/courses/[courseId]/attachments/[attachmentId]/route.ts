import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { isTeacher } from "@/lib/teacher";
import { db } from "@/lib/db";

export async function DELETE(
    req: Request,
    {params}: {params: {courseId: string; attachmentId: string}}
) {
    try {
        const { userId } = auth();

        if (!userId || !isTeacher(userId)) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId
            },
        });

        if (!courseOwner) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const attachment = await db.attachment.delete({
            where: {
                courseId: params.courseId,
                id: params.attachmentId
            }
        });

        return NextResponse.json(attachment);

    } catch (error) {
        console.error(error, "DELETE ATTACHMENT ID");
        return new NextResponse("Internal Server Error", {status: 500});
    }
}