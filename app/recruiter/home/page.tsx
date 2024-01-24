import ClientComponent from "@/app/recruiter/home/components/client-component";
import { studentSchema } from "@/app/recruiter/home/data/student-schema";
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import getData from "../../api/getData";
import updateData from "@/app/api/updateData";
import addData from "@/app/api/addData";




async function getStudents() {
    const data = await fs.readFile(
        path.join(process.cwd(), "app/recruiter/home/data/student_data.json")
    )

    const tasks = JSON.parse(data.toString())

    return z.array(studentSchema).parse(tasks)
}

export default async function Page() {
    // const students = await getStudents()

    const new_students = await getData({ collection_name: 'users' })
    // const res = await addData("users", "kvXYrrCRZnyrkHpnmHc5", {"feedback": {"Karen": {"initial_feedback": 1}}})
    // console.log(res)

    // console.log(new_students);
    return (
        <ClientComponent students={new_students} />
    )
}