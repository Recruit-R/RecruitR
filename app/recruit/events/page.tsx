'use server'

import ClientComponent from "@/app/recruit/events/components/client-component";
import { eventSchema } from "@/app/recruit/events/data/events-schema.ts";
import { z } from "zod";
import getData from "../../api/getData";

export default async function Page() {

    const events = await getData({ collection_name: 'events' })

    const zodEvents = z.array(eventSchema).parse(events);

    return (
        <ClientComponent eventList={zodEvents} />
    )
}