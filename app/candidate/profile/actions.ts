'use server'

import addData from "@/app/api/addData";
import getData from "@/app/api/getData.ts";
import { studentSchema } from "@/app/recruit/home/data/student-schema";

export async function addCandidateData(student_id: string, value: object) {
    return await addData("users", student_id, value)
}

export async function getCandidateData(student_id: string) {
    const student = await getData({ collection_name: "users", document_id: student_id })
    // filter out feedback before candidate receives it
    if (student.feedback !== undefined) delete student.feedback
    return studentSchema.parse(student);

}

//export async function get_event_data()