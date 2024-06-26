'use server'

import addData from "@/app/api/addData";
import getData from "@/app/api/getData.ts";
import { studentSchema } from "@/app/recruit/home/data/student-schema";

export async function addRecruiterData(student_id: string, value: object) {
    return await addData("users", student_id, value)
}

export async function getRecruiterData(student_id: string) {
    const recruiter = await getData({ collection_name: "users", document_id: student_id })
    return recruiter;
}