'use server'
import {doc, Timestamp} from "firebase/firestore";

import {z} from "zod";
import addData from "@/app/api/addData";
import getData from "@/app/api/getData.ts";
import { LucideCornerDownLeft } from "lucide-react";
import updateData from "@/app/api/updateData";
import Roles from "@/app/types/roles.ts";
import {studentSchema} from "@/app/recruit/home/data/student-schema.ts";

export async function feedbackReset(student_id: string) {
    return addData("users", student_id, {"feedback": {}})
}
export async function addFeedback(student_id: string, value: string, recruiter_id: string) {
    let obj = JSON.parse(value);
    return addData("users", student_id, {"feedback": {[recruiter_id]: obj}})
}
export async function updateAvgRating(studentId: string, value: string) {
    const avgRating = parseFloat(value);
    if (avgRating != 0) {
        return addData("users", studentId, {"avgRating": avgRating})
    }
}
export async function get_student_feedback(student_id: string) {
    getData({collection_name: "users", document_id: student_id}).then((e) => console.log(e))
}
function convert(seconds: number, nanoseconds: number) {
    // Create a Date object from the seconds and nanoseconds.
    return new Date(seconds * 1000 + nanoseconds / 1000000);
}

/*
Create a dictionary of {id: student} from the array of students received from the database
 */
function convertStudents(array: any) {
    var dict: {[key: string]: any} = {}
    array.forEach((e: any) => {
        let id = e.id as string
        dict[id] = e
    })
    return dict;
}

export async function getStudentList() {
    const students = await getData({
        collection_name: 'users', filter: {
            field: 'role',
            operator: (a: string, b: string) => a === b,
            value: Roles.CANDIDATE
        }
    })

    return z.record(studentSchema).parse(convertStudents(students))
}