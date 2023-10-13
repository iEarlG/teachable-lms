import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

import { DataTable } from "@/components/providers/courses/data-table";
import { columns } from "@/components/providers/courses/columns";

const CoursesPage = async () => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const courses = await db.course.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return ( 
        <div className="p-6">
            <DataTable columns={columns} data={courses} />
        </div>
    );
}
 
export default CoursesPage;