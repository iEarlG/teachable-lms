import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getChapters } from "@/actions/getChapters";
import { Banner } from "@/components/Banner";

const ChapterIdPage = async ({
    params
}: {
    params: { courseId: string, chapterId: string };
}) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const { course, chapter, muxData, attachments, nextChapter, userProgress, purchase } = await getChapters({
        userId,
        courseId: params.courseId,
        chapterId: params.chapterId
    });

    if (!chapter || !course) {
        return redirect("/");
    }

    const isLocked = !chapter.isFree && !purchase;
    const completeOnEnd = !!purchase && !userProgress?.isCompleted;

    return ( 
        <div>
            {userProgress?.isCompleted && (
                <Banner 
                    label="You have completed this chapter 🎉"
                    variant="success"
                />
            )}
            {isLocked && (
                <Banner 
                    label="This chapter is locked because you haven't purchased the course yet."
                    variant="warning"
                />
            )}

            <div className="flex flex-col max-w-4xl mx-auto pb-20">
                <div className="p-4">
                    <VideoHSLPlayer 
                        title={chapter.title}
                        nextChapterId={nextChapter?.id}
                        playbackId={muxData?.playbackId}
                        isLocked={isLocked}
                        completeOnEnd={completeOnEnd}
                        courseId={params.courseId}
                        chapterId={params.chapterId}
                    />
                </div>
            </div>
        </div>
    );
}
 
export default ChapterIdPage;