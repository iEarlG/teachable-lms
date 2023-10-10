"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/ConfirmModal";

interface ChapterActionsProps {
    chapterId: string;
    courseId: string;
    isPublished: boolean;
    disabled: boolean;
};

export const ChapterActions = ({
    chapterId,
    courseId,
    isPublished,
    disabled,
}: ChapterActionsProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    
    const onDeleteChapter = async () => {
        try {
            setIsLoading(true);

            await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
            toast.success("Chapter deleted successfully.");
            router.refresh();
            router.push(`/teacher/courses/${courseId}`)
        } catch {
            toast.error("Something went wrong. Please try again.")
        } finally {
            setIsLoading(false);
        }
    };

    const onPublishChapter = async () => {
        try {
            setIsLoading(true);

            if (isPublished) {
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`);
                toast.success("Chapter Unpublished");
            } else {
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`);
                toast.success("Chapter Published successfully.");
            }

            router.refresh();
        } catch {
            toast.error("Something went wrong. Please try again.")
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="flex items-center gap-x-2">
            <Button
                variant="outline"
                size="sm"
                onClick={onPublishChapter}
                disabled={disabled || isLoading}
            >
                {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <ConfirmModal onConfirm={onDeleteChapter}>
                <Button size="sm" disabled={isLoading}>
                    <Trash className="h-4 w-4" />
                </Button>
            </ConfirmModal>
        </div>
    );
};