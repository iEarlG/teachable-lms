import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { getDashboardCourses } from "@/actions/getDashboardCourses";

import { CoursesList } from "@/components/search/courses/CoursesList";
import { Check, Clock } from "lucide-react";
import { StudentInfoCard } from "@/components/dashboard/StudentInfoCard";

export default async function StudentDashboard() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { completedCourses, inProgressCourses } = await getDashboardCourses(userId);

  return (
    <div className="space-y-4 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <StudentInfoCard 
          icon={Clock}
          label="In Progress"
          numberOfItems={inProgressCourses.length}
        />
        <StudentInfoCard 
          icon={Check}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
        />
      </div>
      <CoursesList 
        items={[...inProgressCourses, ...completedCourses]}
      />
    </div>
  )
};
