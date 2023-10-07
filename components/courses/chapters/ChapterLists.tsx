"use client";

import { Chapter } from "@prisma/client";

interface ChapterListsProps {
    onEdit: (id: string) => void;
    onReorder: (updateData: {id: string; position: number}[]) => void;
    items: Chapter[];   
};

export const ChapterLists = ({
    onEdit,
    onReorder,
    items
}: ChapterListsProps) => {
    return (
        <div>
            ChapterLists
        </div>
    )
};