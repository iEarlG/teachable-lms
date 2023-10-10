"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";

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
    return (
        <div className="flex items-center gap-x-2">
            <Button
                variant="outline"
                size="sm"
                onClick={() => {}}
                disabled={disabled}
            >
                {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <Button size="sm">
                <Trash className="h-4 w-4" />
            </Button>
        </div>
    );
};