import ClientComponent from "@/app/recruit/home/components/client-component";
import { StudentList, studentSchema } from "@/app/recruit/home/data/student-schema";
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import getData from "../../api/getData";




async function getStudents() {
    const data = await fs.readFile(
        path.join(process.cwd(), "app/recruit/home/data/student_data.json")
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
        // <div>
        <ClientComponent students={new_students as StudentList} />
        // </div>
    )
}