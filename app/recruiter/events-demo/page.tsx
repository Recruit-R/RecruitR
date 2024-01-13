'use server'
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import getData from "../../api/getData";
import ClientComponent from "@/app/recruiter/events-demo/components/client-component";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

export default async function Page() {
    // const students = await getStudents()
    const events = await getData({ collection_name: 'events', schemaName: 'eventSchema' })
    console.log(events);


    return (
        <ClientComponent events={events} />
        // <div>
        //
        // </div>
    )
}