
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

import { AlertOctagon, Check } from "lucide-react";

const bannerVaraints = cva(
    "flex items-center w-full border text-center p-4 text-sm",
    {
        variants: {
            variant: {
                warning: "bg-yellow-200/80 border-yellow-30 text-primary",
                success: "bg-emerald-700 border-emerald-800 text-secondary",
            }
        },
        defaultVariants: {
            variant: "warning"
        }
    }
);

interface BannerProps extends VariantProps<typeof bannerVaraints> {
    label: string;
};

const iconMap = {
    warning: AlertOctagon,
    success: Check
};

export const Banner = ({
    label,
    variant
}: BannerProps) => {
    const Icon = iconMap[variant || "warning"];

    return (
        <div className={cn(bannerVaraints({ variant }))}>
            <Icon className="h-4 w-4 mr-2" />
            {label}
        </div>
    )
};