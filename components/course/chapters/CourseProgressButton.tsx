"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Check, X } from "lucide-react";
import { useConfettiStore } from "@/hooks/UseConfetti";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";

interface CourseProgressButtonProps {
    courseId: string;
    chapterId: string;
    isCompleted?: boolean;
    nextChapterId?: string;
};

export const CourseProgressButton = ({
    courseId,
    chapterId,
    isCompleted,
    nextChapterId
}: CourseProgressButtonProps) => {
    const router = useRouter();
    const confetti = useConfettiStore();

    const [isLoading, setIsLoading] = useState(false);

    const onMarkProgress = async () => {
        try {
            setIsLoading(true);

            await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                isCompleted: !isCompleted
            });

            if (!isCompleted && !nextChapterId) {
                confetti.onOpen();
            }

            if (!isCompleted && nextChapterId) {
                router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
            }

            toast.success("Your progress has been updated.");
            router.refresh();
        } catch {
            toast.error("Something went wrong. Please try again later.")
        } finally {
            setIsLoading(false);
        }
    };

    const Icon = isCompleted ? X : Check;

    return (
        <Button 
            type="button" 
            variant={isCompleted ? "outline" : "success"}
            className="w-full md:w-auto"
            onClick={onMarkProgress}
            disabled={isLoading}
        >
            {isCompleted ? "Not Complete" : "Mark as completed"}
            <Icon className="h-4 w-4 ml-2" />
        </Button>
    )
};