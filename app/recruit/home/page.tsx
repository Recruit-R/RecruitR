import { getStudentList } from "@/app/recruit/home/actions.ts";
import Dashboard from "@/app/recruit/home/components/dashboard.tsx";
import { StudentList } from "@/app/recruit/home/data/student-schema";
import { headers } from "next/headers";
import { Suspense } from "react";
import DashboardSkeleton from "./components/dashboard-skeleton";


async function StudentListLoader() {
    const students = await getStudentList();
    return <Dashboard studentData={students} />
}

async function StudentListWithSuspense({
    students,
}: {
    students?: StudentList;
}) {
    if (students) {
        return <Dashboard studentData={students} />
    }

    return (
        <Suspense fallback={<DashboardSkeleton />}>
            <StudentListLoader />
        </Suspense>
    )
}
export default async function Page() {

    let students: StudentList | undefined;
    if (headers().get("accept")?.includes("text/html")) {
        students = await getStudentList();
    }
    return (
        <StudentListWithSuspense students={students} />
    )
}