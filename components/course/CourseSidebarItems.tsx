"use client"

import { usePathname, useRouter } from "next/navigation";

import { Check, Lock, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseSidebarItemsProps {
    id: string;
    courseId: string;
    label: string;
    isCompleted: boolean;
    isLocked: boolean;
};

export const CourseSidebarItems = ({
    id,
    courseId,
    label,
    isCompleted,
    isLocked
}: CourseSidebarItemsProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const isActive = pathname?.includes(id);
    const Icon = isLocked ? Lock : (isCompleted ? Check : Play);

    const onClick = () => {
        router.push(`/courses/${courseId}/chapters/${id}`);
    };

    return (
        <button 
            onClick={onClick}
            type="button" 
            className={cn("flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
                isActive && "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
                isCompleted && "text-green-700 hover:text-gray-700",
                isCompleted && isActive && "bg-emerald-200"
            )}>
            <div className="flex items-center gap-x-2 py-4">
                <Icon size={22} className={cn("text-slate-500",
                        isActive && "text-slate-700",
                        isCompleted && "text-green-700"
                    )}
                />
                {label}
            </div>
            <div className={cn("h-full ml-auto opacity-0 border-2 border-slate-200 transition-all",
                    isActive && "opacity-100",
                    isCompleted && "border-green-700"
                )} 
            />
        </button>
    )
};