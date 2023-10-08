"use client";

import { useEffect, useState } from "react";

import { Chapter } from "@prisma/client";
import { Grip, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { Badge } from "@/components/ui/badge";


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
    const [isMounted, setIsMounted] = useState(false);
    const [chapters, setChapters] = useState(items);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    useEffect(() => {
      setChapters(items);
    }, [items]);
    
    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const items = Array.from(chapters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        const startIndex = Math.min(result.source.index, result.destination.index);
        const endIndex = Math.max(result.source.index, result.destination.index);

        const updatedChapters = items.slice(startIndex, endIndex + 1);

        setChapters(items);

        const bulkUpdateData = updatedChapters.map((chapter) => ({
            id: chapter.id,
            position: items.findIndex((item) => item.id === chapter.id)
        }));

        onReorder(bulkUpdateData);
    };

    if (!isMounted) {
        return null;
    }
    
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="chapters">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {chapters.map((chapter, i) => (
                            <Draggable 
                                key={chapter.id}
                                index={i}
                                draggableId={chapter.id}
                            >
                                {(provided) => (
                                    <div className={cn("flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                                        chapter.isPublished && "bg-green-100 border-green-200 text-green-700"
                                    )}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    >
                                        <div className={cn("px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                                            chapter.isPublished && "border-r-green-200 hover:bg-green-200"
                                        )}
                                        {...provided.dragHandleProps}
                                        >
                                            <Grip className="h-5 w-5" />
                                        </div>
                                        {chapter.title}
                                        <div className="ml-auto flex items-center gap-x-2 pr-2">
                                            {chapter.isFree && (
                                                <Badge>
                                                    Free
                                                </Badge>
                                            )}
                                            <Badge className={cn("bg-slate-500",
                                                chapter.isPublished && "bg-green-700",
                                            )}>
                                                {chapter.isPublished ? "Published" : "Draft"}
                                            </Badge>
                                            <Pencil className="w-4 h-4 cursor-pointer hover:opacity-75 transition" onClick={() => onEdit(chapter.id)} />
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
};