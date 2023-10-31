import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

export async function PUT(
    req: Request, 
    { params }: {params: {courseId: string, chapterId: string}}
) {
    try {
        const { userId } = auth();
        const { isCompleted } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const userProgress = await db.userProgress.upsert({
            where: {
                userId_chapterId: {
                    userId,
                    chapterId: params.chapterId
                }
            },
            update: {
                isCompleted
            },
            create: {
                userId,
                chapterId: params.chapterId,
                isCompleted
            }
        });

        return NextResponse.json(userProgress);


    } catch (error) {
        console.log(error, "Progress PUT")
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}