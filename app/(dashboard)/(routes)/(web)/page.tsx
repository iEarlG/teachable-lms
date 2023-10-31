import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { getDashboardCourses } from "@/actions/getDashboardCourses";

import { CoursesList } from "@/components/search/courses/CoursesList";
import { Clock } from "lucide-react";
import { StudentInfoCard } from "@/components/dashboard/StudentInfoCard";

export default async function StudentDashboard() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { completedCourses, inProgressCourses } = await getDashboardCourses(userId);

  return (
    <div className="p-6 space-y-4">
      <div className="gird grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <StudentInfoCard 
            icon={Clock}
            label="In Progress"
            numberOfItems={inProgressCourses.length}
          />
        </div>
      </div>
      <CoursesList 
        items={[...inProgressCourses, ...completedCourses]}
      />
    </div>
  )
};
