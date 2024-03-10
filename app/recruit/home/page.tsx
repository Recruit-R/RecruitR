import ClientComponent from "@/app/recruit/home/components/client-component";
import { StudentList, studentSchema } from "@/app/recruit/home/data/student-schema";
import Roles from "@/app/types/roles";
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

    const students = await getData({
        collection_name: 'users', filter: {
            field: 'role',
            operator: (a: string, b: string) => a === b,
            value: Roles.CANDIDATE
        }
    })

    const zodStudents = z.array(studentSchema).parse(students)

    // console.log(new_students);
    // const res = await addData("users", "kvXYrrCRZnyrkHpnmHc5", {"feedback": {"Karen": {"initial_feedback": 1}}})
    // console.log(res)

    // console.log(new_students);
    return (
        // <div>
        //     testing
        // </div>
        <ClientComponent students={zodStudents as unknown as StudentList} />
    )
}