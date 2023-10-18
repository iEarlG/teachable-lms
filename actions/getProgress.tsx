
import { db } from "@/lib/db";

export const getProgress = async (
    courseId: string, 
    userId: string
): Promise<number> => {
    try {
        const publishedChapters = await db.chapter.findMany({
            where :{
                courseId,
                isPublished: true
            },
            select: {
                id: true
            }
        });

        const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);

        const completedChapters = await db.userProgress.count({
            where: {
                id: userId,
                chapterId: {
                    in: publishedChapterIds
                },
                isCompleted: true
            }
        });

        const progressPercentage = (completedChapters / publishedChapterIds.length) * 100;

        return progressPercentage;
        
    } catch (error) {
        console.log(error, "Get Progress");
        return 0;
    }
};