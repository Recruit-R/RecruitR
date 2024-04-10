'use server'

import addData from "@/app/api/addData";
import getData from "@/app/api/getData.ts";
import { studentSchema } from "@/app/recruit/home/data/student-schema";

import * as z from 'zod';
export async function addCandidateData(student_id: string, value: object) {


    return await addData("users", student_id, value)
}

export async function get_candidate_data(student_id: string) {
    const student = await getData({collection_name: "users", document_id: student_id})
    return studentSchema.parse(student);

}

//export async function get_event_data()