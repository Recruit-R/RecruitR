'use server'

import {z} from "zod";
import addData from "@/app/api/addData";
const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})
export async function create(value: string) {
    // ...
    const obj = JSON.parse(value);
    console.log(obj)

    const res = await addData("events", "2", {"Title": "asdf", "Location": "GCC", "Time": { "seconds": 1702498664, "nanoseconds": 569000000 }})
    console.log("IT WORKED")
    console.log(res.result)

}
function convert(seconds, nanoseconds) {
    // Create a Date object from the seconds and nanoseconds.
    return new Date(seconds * 1000 + nanoseconds / 1000000);
}