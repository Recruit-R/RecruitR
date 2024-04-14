'use server'

import ClientComponent from "@/app/recruit/events/components/client-component";
import { eventSchema } from "@/app/recruit/events/data/events-schema.ts";
import { z } from "zod";
import { getEventData } from "./actions";
import { parseISO } from "date-fns";
import { parseEvents } from "./utils/parse-events";

export default async function Page() {

    const events = await getEventData();



    return (
        <ClientComponent eventList={parseEvents(events)} />
    )
}