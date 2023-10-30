
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CourseProgressProps {
    variant?: "success" | "default";
    value: number;
    size?: "sm" | "default";
};

const colorByVaraint = {
    success: "text-emerald-700",
    default: "text-sky-700",
};
const sizeByVaraint = {
    sm: "text-sm",
    default: "text-sm",
};

export const CourseProgress = ({
    variant,
    value,
    size
}: CourseProgressProps ) => {
    return (
        <div>
            <Progress 
                value={value}
                variant={variant}
                className="h-2"
            />
            <p className={cn("mt-2 font-medium text-sky-700",
                colorByVaraint[variant || "default"],
                sizeByVaraint[size || "default"]
            )}>
                {Math.round(value)}% Complete
            </p>
        </div>
    );
}