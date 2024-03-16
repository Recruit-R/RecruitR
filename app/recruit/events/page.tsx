'use server'

import { z } from "zod";
import getData from "../../api/getData";
import ClientComponent from "@/app/recruit/events/components/client-component";
import {eventSchema} from "@/app/recruit/events/data/events-schema.ts";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

export default async function Page() {

    const events = await getData({ collection_name: 'events', schemaName: 'eventSchema' })

    const zodEvents = z.array(eventSchema).parse(events);

    return (
        <ClientComponent e={zodEvents} />
    )
}