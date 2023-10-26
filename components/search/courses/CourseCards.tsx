import Image from "next/image";
import Link from "next/link";

import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/priceformat";

import { IconBadge } from "@/components/ui/IconBadge";
import { CourseProgress } from "@/components/course/chapters/CourseProgress";
interface CourseCardsProps {
    id: string;
    title: string;
    imageUrl: string;
    chaptersLength: number;
    price: number;
    progress: number | null;
    category: string;
};

export const CourseCards = ({
    id,
    title,
    imageUrl,
    chaptersLength,
    price,
    progress,
    category
}: CourseCardsProps) => {
    return (
        <Link href={`/courses/${id}`}>
            <div className="group h-full hover:shadow-sm transition overflow-hidden border rounded-lg p-3 pb-0 mt-3">
                <div className="w-full relative aspect-video rounded-md overflow-hidden">
                    <Image 
                        alt="course image"
                        src={imageUrl}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex flex-col pt-2">
                    <div className="text-lg md:text-base font-medium group-hover:text-gray-700 line-clamp-2">
                        {title}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {category}
                    </p>
                    <div className="flex items-center gap-x-2 my-3 text-sm md:text-xs">
                        <div className="flex items-center gap-x-1 text-slate-500">
                            <IconBadge size="sm" icon={BookOpen} />
                            <span>
                                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
                            </span>
                        </div>
                    </div>
                    {progress !== null ? (
                        <CourseProgress 
                            size="sm"
                            value={progress}
                            variant={progress === 100 ? "success" : "default"}
                        />
                    ): (
                        <p className="text-md md:text-sm font-medium text-slate-700">
                            {formatPrice(price)}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    )
}