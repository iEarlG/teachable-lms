"use client"

import { useConfettiStore } from "@/hooks/UseConfetti";
import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import axios from "axios";
import { Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface VideoHSLPlayerProps {
    title: string;
    nextChapterId?: string;
    playbackId: string;
    isLocked: boolean;  
    completeOnEnd: boolean;
    courseId: string;
    chapterId: string;
};

export const VideoHSLPlayer = ({
    title,
    nextChapterId,
    playbackId,
    isLocked,
    completeOnEnd,
    courseId,
    chapterId
}: VideoHSLPlayerProps) => {
    const router = useRouter();
    const confetti = useConfettiStore();

    const [isReady, setIsReady] = useState(false);

    const onEndVideo = async () => {
        try {
            if (completeOnEnd) {
                await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                    isCompleted: true
                });

                if (!nextChapterId) {
                    confetti.onOpen();
                }
                    
                toast.success(`You have completed the ${title}.`);
                router.refresh();

                if (nextChapterId) {
                    router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
                } 
            }
        } catch {
            toast.error("Something went wrong. Please try again.");
        }
    }


    return (
        <div className="relative aspect-video">
            {!isReady && !isLocked && (
                <div className="absolute flex items-center justify-center inset-0 bg-slate-800">
                    <Loader2 className="h-8 w-8 animate-spin text-secondary" />
                </div>
            )}
            {isLocked && (
                <div className="absolute flex flex-col items-center justify-center gap-y-2 inset-0 bg-slate-800 text-secondary">
                    <Lock className="h-8 w-8" />
                    <p className="text-sm">The {title} is LOCKED.</p>
                </div>
            )}
            {!isLocked && (
                <MuxPlayer 
                    title={title}
                    className={cn(!isReady && "hidden")}
                    onCanPlay={() => setIsReady(true)}
                    onEnded={onEndVideo}
                    playbackId={playbackId}
                    autoPlay
                />
            )}
        </div>
    )
};