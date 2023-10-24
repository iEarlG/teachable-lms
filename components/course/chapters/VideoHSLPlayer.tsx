"use client"

import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import { Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

    const [isReady, setIsReady] = useState(false);


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
                    onEnded={() => {}}
                    playbackId={playbackId}
                    autoPlay
                />
            )}
        </div>
    )
};