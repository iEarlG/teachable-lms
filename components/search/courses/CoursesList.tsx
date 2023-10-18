import { Category, Course } from "@prisma/client";

type CourseProgressCategory = Course & {
    category: Category | null;
    chapters: { id: string; }[];
    progress: number | null;
};

interface CoursesListProps {
    items: CourseProgressCategory[];
};

export const CoursesList = ({
    items
}: CoursesListProps) => {
    return (
        <div>
            {items.map((item) => (
                <div key={item.id}>
                    {item.title}
                </div>
            ))}
        </div>
    )
};