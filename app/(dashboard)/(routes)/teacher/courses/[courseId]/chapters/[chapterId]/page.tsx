import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import Link from "next/link";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import { IconBadge } from "@/components/ui/IconBadge";

const ChapterIdPage = async ({
    params,
}: {
    params: { courseId: string; chapterId: string };
}) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const chapter = await db.chapter.findUnique({
        where: {
            id: params.chapterId,
            courseId: params.courseId,
        },
        include: {
            muxData: true,
        }
    });

    if (!chapter) {
        return redirect("/");
    };

    const requiredChapterFields = [ 
        chapter.title,
        chapter.description,
        chapter.videoUrl
    ];

    const totalChapterFields = requiredChapterFields.length;
    const completedChapterFields = requiredChapterFields.filter(Boolean).length;

    const chapterCompletion = `(${completedChapterFields}/${totalChapterFields})`;

    return ( 
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="w-full">
                    <Link 
                        href={`/teacher/courses/${params.courseId}`} 
                        className="flex items-center text-sm hover:opacity-75 transition mb-6"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to course setup
                    </Link>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-2xl font-medium">Course Chapter Setup</h1>
                            <span className="text-xs text-slate-700">Complete all fields {chapterCompletion} to continue</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div className="space-y-4">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={LayoutDashboard} size="md" />
                            <h2 className="text-xl">Customize your Chapters</h2>
                        </div>
                        <p className="text-sm text-slate-700">Add a title, description and video to your chapter</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ChapterIdPage;