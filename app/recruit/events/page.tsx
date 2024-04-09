'use server'

import ClientComponent from "@/app/recruit/events/components/client-component";
import { eventSchema } from "@/app/recruit/events/data/events-schema.ts";
import { z } from "zod";
import { getEventData } from "./actions";

export default async function Page() {

    const events = await getEventData();

    const zodEvents = z.array(eventSchema).parse(events);

    return (
        <ClientComponent eventList={zodEvents} />
    )
}