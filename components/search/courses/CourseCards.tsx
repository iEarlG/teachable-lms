import Link from "next/link";


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
            <div className="group h-full shadow-sm transition overflow-hidden border rounded-lg p-3">
                
            </div>
        </Link>
    )
}