'use client'

//client component that orders all components in events page

import { EventCreationDialog } from "@/app/recruit/events/components/event-creation-dialog";
import { EventsListCard } from "@/app/recruit/events/components/events-list-card";
import { parseISO } from "date-fns";
import { createContext, useEffect, useState } from "react";
import { getEventData } from "../actions";

export interface EventDataContextType {
    events: any,
    refresh: () => void
}

//define context to provide event data and refresh function to child components
export const EventDataContext = createContext<EventDataContextType | null>(null);

export default function ClientComponent({ eventList }: { eventList: any }) {
    const [events, setEvents] = useState(eventList);
    const [pastEvents, setSortedPastEvents] = useState<any>([]);
    const [futureEvents, setSortedFutureEvents] = useState<any>([]);

    function refresh() {
        getEventData().then((events) => {
            setEvents(events);
        })
    }
    useEffect(() => {
        const currentDate = new Date();
        const parsedEvents = events.map((recEvent: any) => {
            return { ...recEvent, date: parseISO(recEvent.date) }
        });
        const pastEvents = parsedEvents
            // sort and filter past events by UTC time
            .filter((event: any) => event.date < currentDate)
            .sort((a: any, b: any) => b.date.getTime() - a.date.getTime());

        // sort and filter future events by UTC time
        const futureEvents = parsedEvents
            .filter((event: any) => event.date >= currentDate)
            .sort((a: any, b: any) => a.date.getTime() - b.date.getTime());

        // Update state with sorted events
        setSortedPastEvents(pastEvents);
        setSortedFutureEvents(futureEvents);

        // Re-run if events change 
    }, [events]);

    //pass sorted events into two event list cards
    //one card for future events and one card for past events
    return (
        <EventDataContext.Provider
            value={{
                events,
                refresh
            }} >
            <div className="flex flex-col gap-4 p-4 h-4/5">
                <div className="">
                    <EventCreationDialog />
                </div>
                <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 h-full">
                    <div className="">
                        <EventsListCard
                            title="Past Events"
                            events={pastEvents}
                            setEvents={setEvents}
                            empty_message="No Previous Events" />
                    </div>
                    <div className="">
                        <EventsListCard
                            title="Future Events"
                            events={futureEvents}
                            setEvents={setEvents}
                            empty_message="No Upcoming Events"
                        />

                    </div>
                </div>
            </div>
        </EventDataContext.Provider>
    )
}