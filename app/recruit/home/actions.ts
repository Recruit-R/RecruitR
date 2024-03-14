'use server'
import {doc, Timestamp} from "firebase/firestore";

import {z} from "zod";
import addData from "@/app/api/addData";
import getData from "@/app/api/getData.ts";
import { LucideCornerDownLeft } from "lucide-react";
import updateData from "@/app/api/updateData";

export async function feedbackReset(student_id: string) {
    return addData("users", student_id, {"feedback": {}})
}
export async function addFeedback(student_id: string, value: string, recruiter_id: string) {
    // ...
    let obj = JSON.parse(value);
    // obj.Time = Timestamp.fromDate(new Date(obj.Time))
    console.log("being called")
    console.log("pushed")

    console.log(recruiter_id)
    console.log(student_id)
    console.log(value)

    return addData("users", student_id, {"feedback": {[recruiter_id]: obj}})
    // console.log("IT WORKED")
    // console.log(res)
}
export async function updateAvgRating(studentId: string, value: string) {
    const avgRating = parseFloat(value);
    if (avgRating != 0) {
        return addData("users", studentId, {"avgRating": avgRating})
    }


}
export async function get_student_feedback(student_id: string) {
    // console.log(student_id);
    getData({collection_name: "users", document_id: student_id}).then((e) => console.log(e))

}
function convert(seconds: number, nanoseconds: number) {
    // Create a Date object from the seconds and nanoseconds.
    return new Date(seconds * 1000 + nanoseconds / 1000000);
}