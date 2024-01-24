'use server'
import {doc, Timestamp} from "firebase/firestore";

import {z} from "zod";
import addData from "@/app/api/addData";
import { LucideCornerDownLeft } from "lucide-react";
import updateData from "@/app/api/updateData";

export async function create(value: string) {
    // ...
    let obj = JSON.parse(value);
    obj.Time = Timestamp.fromDate(new Date(obj.Time))

    const res = await updateData("users", "kvXYrrCRZnyrkHpnmHc5", {"feedback": {"Karen": {"Recommended Placement": "Data Analyst"}}})
    // console.log("IT WORKED")
    // console.log(JSON.stringify(res))
}
export async function get_student_feedback(student_id: string) {

}
function convert(seconds: number, nanoseconds: number) {
    // Create a Date object from the seconds and nanoseconds.
    return new Date(seconds * 1000 + nanoseconds / 1000000);
}x