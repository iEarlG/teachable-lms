
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { DollarSign, FileUp, LayoutDashboard, ListChecks } from "lucide-react";

import { db } from "@/lib/db";

import { IconBadge } from "@/components/ui/IconBadge";

import { TitleForm } from "@/components/courses/TitleForm";
import { DescriptionForm } from "@/components/courses/DescriptionForm";
import { ImageForm } from "@/components/courses/ImageForm";
import { CategoryForm } from "@/components/courses/CategoryForm";
import { PriceForm } from "@/components/courses/PriceForm";
import { AttachmentsForm } from "@/components/courses/AttachmentsForm";

const CourseIdPage = async ({ 
    params 
}: {
    params: {courseId: string}
}) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId
        },
        include: {
            attachments: {
                orderBy: {
                    createdAt: "desc"
                }
            }
        }
    });

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    });

    if (!course) {
        return redirect("/");
    }

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const percentComplete = `(${completedFields}/${totalFields})`;

    return ( 
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">Course Setup</h1>
                    <span className="text-xs text-slate-700">Complete all the fields {percentComplete} to continue</span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard} size="md" />
                        <h2 className="text-xl">Customize your course</h2>
                    </div>
                    <TitleForm 
                        initialData={course}
                        courseId={course.id}
                    />
                    <DescriptionForm
                        initialData={course}
                        courseId={course.id}
                    />
                    <ImageForm
                        initialData={course}
                        courseId={course.id}
                    />
                    <CategoryForm
                        initialData={course}
                        courseId={course.id}
                        options={categories.map((category) => ({
                            label: category.name,
                            value: category.id
                        }))}
                    />
                </div>
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={ListChecks} size="md" />
                            <h2 className="text-xl">Course Chapters</h2>
                        </div>
                        <div>TODO: LIST CHAPTER</div>
                    </div>
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={DollarSign} size="md" />
                            <h2 className="text-xl">Sell Courses</h2>
                        </div>
                        <PriceForm 
                            initialData={course}
                            courseId={course.id}
                        />
                    </div>
                    <div>
                        <div className="flex items-center gap-x-2">
                             <IconBadge icon={FileUp} size="md" />
                            <h2 className="text-xl">Resourcement & Attachments</h2>
                        </div>
                        <AttachmentsForm
                            initialData={course}
                            courseId={course.id}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default CourseIdPage;