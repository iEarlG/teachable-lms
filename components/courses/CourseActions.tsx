"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { useConfettiStore } from "@/hooks/UseConfetti";

interface CourseActionsProps {
    courseId: string;
    isPublished: boolean;
    disabled: boolean;
};

export const CourseActions = ({
    courseId,
    isPublished,
    disabled,
}: CourseActionsProps) => {
    const router = useRouter();
    const confetti = useConfettiStore();
    const [isLoading, setIsLoading] = useState(false)
    
    const onDeleteChapter = async () => {
        try {
            setIsLoading(true);

            await axios.delete(`/api/courses/${courseId}`);
            toast.success("Course deleted successfully.");
            router.refresh();
            router.push(`/teacher/courses`)
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
                await axios.patch(`/api/courses/${courseId}/unpublish`);
                toast.success("Course Unpublished");
            } else {
                await axios.patch(`/api/courses/${courseId}/publish`);
                toast.success("Course Published successfully.");
                confetti.onOpen();
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