import { LucideIcon } from "lucide-react";

import { IconBadge } from "@/components/ui/IconBadge";

interface StudentInfoCardProps {
    icon: LucideIcon;
    label: string;
    numberOfItems: number;
    variant?: "default" | "success";
}

export const StudentInfoCard = ({ 
    icon: Icon,
    label, 
    numberOfItems,
    variant
}: StudentInfoCardProps) => {
    return (
        <div className="flex items-center border rounded-md gap-x-2 p-3">
            <IconBadge 
                variant={variant}
                icon={Icon}
                size="md"
            />
            <div>
                <p className="font-medium">{label}</p>
                <p className="text-gray-500 text-sm">{numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}</p>
            </div>
        </div>
    )
}