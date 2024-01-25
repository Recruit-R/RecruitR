'use server'
import { Timestamp } from "firebase/firestore";

import {z} from "zod";
import addData from "@/app/api/addData";
import { eventSchema } from "./data/events-schema";
import { LucideCornerDownLeft } from "lucide-react";
const formSchema = z.object({
    eventName: z.string().min(2, {
        message: "event name must be at least 2 characters.",
    }),
})
export async function create(value: string) {
    // ...
    let obj = JSON.parse(value);
    obj.Time = Timestamp.fromDate(new Date(obj.Time))

    const res = await addData("events", Date.now().toString(), obj)
    console.log("IT WORKED")
    console.log(JSON.stringify(res))
}
function convert(seconds: number, nanoseconds: number) {
    // Create a Date object from the seconds and nanoseconds.
    return new Date(seconds * 1000 + nanoseconds / 1000000);
}