'use server'

import addData from "@/app/api/addData";
import getData from "@/app/api/getData.ts";
import { studentSchema } from "@/app/recruit/home/data/student-schema";

import * as z from 'zod';
export async function addCandidateData(student_id: string, value: object) {
    console.log(student_id)
    console.log(value)

    return await addData("users", student_id, value)
}

export async function get_candidate_data(student_id: string) {
    console.log(student_id);
    const student = await getData({collection_name: "users", document_id: student_id})
    console.log(student)
    return studentSchema.parse(student);

}