"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";
import Image from "next/image";
import toast from "react-hot-toast";
import * as z from "zod";
import axios from "axios";

import { FileVideo, FileVideo2, ImageIcon, ImagePlus, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FileUploader } from "@/components/FileUploader";

interface ChapterVideoFormProps {
    initialData: Chapter & {
        muxData?: MuxData | null;
    };
    courseId: string;
    chapterId: string;
};

const formSchema = z.object({
    videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({
    initialData,
    courseId,
    chapterId
}: ChapterVideoFormProps) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);

    const toggleEditing = () => {
        setIsEditing((current) => !current)
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast.success("Chapter video updated!");
            toggleEditing();
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong! Please try again.")
        }
    };
    
    return ( 
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="flex items-center justify-between font-medium">
                Chapter Course Video
                <Button variant="ghost" onClick={toggleEditing}>
                    {isEditing && (
                        <>
                            <span className="text-slate-600">Cancel</span>
                        </>
                    )}
                    {!isEditing && !initialData.videoUrl && (
                        <>
                            <FileVideo className="h-4 w-4 mr-2" />
                            <span className="text-slate-600">Add a video</span>
                        </>
                    )}
                    {!isEditing && initialData.videoUrl && (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            <span className="text-slate-600">Edit Video</span>
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                !initialData.videoUrl ? (
                    <div className="flex items-center justify-center h-60 rounded-md bg-slate-200">
                        <FileVideo2 className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        Video Upload
                    </div>
                )
            )}
            {isEditing && (
                <div>
                    <FileUploader 
                        endpoint="courseVideo"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({videoUrl: url});
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        Video must be less than 10 minutes long. We recommend using a 1080p video resolution.
                    </div>
                </div>
            )}
            {initialData.videoUrl && !isEditing && (
                <div className="text-xs text-muted-foreground mt-2">
                    Uploaded Video may take a few minutes to process. Refresh the page if the video does not appear after a few minutes.
                </div>
            )}
        </div>
    );
}