'use server'

import {z} from "zod";
import addData from "@/app/api/addData";
const formSchema = z.object({
    eventName: z.string().min(2, {
        message: "event name must be at least 2 characters.",
    }),
})
export async function create(value: string) {
    // ...
    const obj = JSON.parse(value);
    console.log("test")
    const res = await addData("events", "2", {"Title": "asdf", "Location": "GCC", "Time": { "seconds": 1702498664, "nanoseconds": 569000000 }})
    console.log("IT WORKED")
    console.log(res.result)

}