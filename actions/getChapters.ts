
import { Attachment, Chapter } from "@prisma/client";
import { db } from "@/lib/db";

interface GetChapterProps {
    userId: string;
    courseId: string;
    chapterId: string;
};

export const getChapters = async ({
    userId,
    courseId,
    chapterId
}: GetChapterProps) => {
    try {
        const purchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId
                }
            }
        });

        const course = await db.course.findUnique({
            where: {
                id: courseId,
                isPublished: true
            },
            select: {
                price: true,
            }
        });

        const chapter = await db.chapter.findUnique({
            where: {
                id: chapterId,
                isPublished: true
            }
        });

        if (!course || !chapter) {
            throw new Error("Course or Chapter not found");
        }

        let muxData = null;
        let attachments: Attachment[] = [];
        let nextChapter: Chapter | null = null;

        if (purchase) {
            attachments = await db.attachment.findMany({
                where: {
                    courseId,
                }
            });
        }

        if (chapter.isFree || purchase) {
            muxData = await db.muxData.findUnique({
                where: {
                    chapterId
                }
            });
            nextChapter = await db.chapter.findFirst({
                where: {
                    courseId,
                    isPublished: true,
                    position: {
                        gt: chapter?.position
                    }
                },
                orderBy: {
                    position: "asc"
                }
            });
        }

        const userProgress = await db.userProgress.findUnique({
            where: {
                userId_chapterId: {
                    userId,
                    chapterId
                }
            }
        });

        return {
            course,
            chapter,
            muxData,
            attachments,
            nextChapter,
            userProgress,
            purchase,
        };

    } catch (error) {
        console.log(error, "Get Chapter");
        return {
            couse: null,
            chapter: null,
            muxData: null,
            attachments: [],
            nextChapter: null,
            userProgress: null,
            purchase: null,
        }
    }
}