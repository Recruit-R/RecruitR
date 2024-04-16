'use server'

import ClientComponent from "@/app/recruit/events/components/client-component";
import { Suspense } from "react";
import { getEventData } from "./actions";
import { parseEvents } from "./utils/parse-events";

async function EventListLoader() {
    const events = await getEventData();
    return <ClientComponent eventList={parseEvents(events)} />
}

async function EventListWithSuspense({
    events,
}: {
    events?: any;
}) {
    if (events) {
        return <ClientComponent eventList={parseEvents(events)} />
    }

    return (
        <Suspense fallback={<div>working on it</div>}>
            <EventListLoader />
        </Suspense>
    )
}

export default async function Page() {

    const events = await getEventData();



    return (
        <EventListWithSuspense events={events} />
    )
}
