import Dashboard from "@/app/recruit/home/components/dashboard.tsx";
import { StudentList, studentSchema } from "@/app/recruit/home/data/student-schema";
import Roles from "@/app/types/roles";
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import getData from "../../api/getData";
import {getStudentList} from "@/app/recruit/home/actions.ts";
import {Suspense} from "react";
import {headers} from "next/headers";


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
        <Suspense fallback={"Testing Loader"}>
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