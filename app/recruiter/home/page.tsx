import ClientComponent from "@/app/recruiter/home/components/client-component";
import { promises as fs } from "fs"
import path from "path";
import {z} from "zod";
import {studentSchema} from "@/app/recruiter/home/data/student-schema";
import {studentColumns} from "@/app/recruiter/home/components/student-columns";
import {DataTable} from "@/app/recruiter/home/components/data-table";



async function getStudents() {
    const data = await fs.readFile(
        path.join(process.cwd(), "app/recruiter/home/data/student_data.json")
    )

    const tasks = JSON.parse(data.toString())

    return z.array(studentSchema).parse(tasks)
}

export default async function Page() {
    const students = await getStudents()
    return (
        <ClientComponent students={students}/>
    )
}