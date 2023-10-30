import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { File } from "lucide-react";
import { getChapters } from "@/actions/getChapters";

import { Banner } from "@/components/Banner";
import { Preview } from "@/components/Preview";

import { VideoHSLPlayer } from "@/components/course/chapters/VideoHSLPlayer";
import { CourseEnrollButton } from "@/components/course/chapters/CourseEnrollButton";
import { CourseProgressButton } from "@/components/course/chapters/CourseProgressButton";

import { Separator } from "@/components/ui/separator";


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
            <div className="flex flex-col max-w-full mx-auto pb-20">
                <div className="p-4">
                    <VideoHSLPlayer 
                        title={chapter.title}
                        nextChapterId={nextChapter?.id}
                        playbackId={muxData?.playbackId!}
                        isLocked={isLocked}
                        completeOnEnd={completeOnEnd}
                        courseId={params.courseId}
                        chapterId={params.chapterId}
                    />
                </div>
                <div>
                    <div className="flex flex-col md:flex-row items-center justify-between p-4">
                        <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
                        {purchase ? (
                            <CourseProgressButton 
                                courseId={params.courseId}
                                chapterId={params.chapterId}
                                isCompleted={!!userProgress?.isCompleted}
                                nextChapterId={nextChapter?.id}
                            />
                        ): (
                            <CourseEnrollButton 
                                courseId={params.courseId}
                                price={course.price!}
                            />
                        )}
                    </div>
                    <Separator />
                    <div>
                        <Preview 
                            value={chapter.description!}
                        />
                    </div>
                    {!!attachments?.length && (
                        <>
                            <Separator />
                            <div className="p-4">
                                {attachments.map((attachment) => (
                                    <a 
                                        href={attachment.url} 
                                        key={attachment.id} 
                                        target="_blank"
                                        className="flex items-center w-full p-3 bg-sky-200 border text-sky-700 rounded-md hover:underline"
                                    >
                                        <File />
                                        <p className="line-clamp-1">{attachment.name}</p>
                                    </a>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
 
export default ChapterIdPage;