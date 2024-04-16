'use client'

//client component that orders all components in events page

import { EventsListCard } from "@/app/recruit/events/components/events-list-card";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { createContext, useEffect, useState } from "react";
import { getEventData } from "../actions";
import { parseEvents } from "../utils/parse-events";
import { EventManagementForm } from "./event-management-form";
import { PopupDialog } from "./popup-dialog";

export interface EventDataContextType {
    events: any,
    refresh: () => void,
    setEvents: React.Dispatch<React.SetStateAction<any>>
}

//define context to provide event data and refresh function to child components
export const EventDataContext = createContext<EventDataContextType | null>(null);

export default function ClientComponent({ eventList }: { eventList: any }) {
    const [events, setEvents] = useState(eventList);
    const [pastEvents, setSortedPastEvents] = useState<any>([]);
    const [futureEvents, setSortedFutureEvents] = useState<any>([]);
    const [open, setOpen] = useState<boolean>(false);

    function refresh() {
        getEventData().then((events) => {
            setEvents(parseEvents(events));
        })
    }

    useEffect(() => {
        const currentDate = new Date();
        console.log('new events', events);
        const pastEvents = events
            // sort and filter past events by UTC time
            .filter((event: any) => event.date < currentDate)
            .sort((a: any, b: any) => b.date.getTime() - a.date.getTime());

        // sort and filter future events by UTC time
        const futureEvents = events
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
                refresh,
                setEvents
            }} >
            <div className="flex flex-col gap-4 p-4 h-4/5">
                <div className="">
                    <PopupDialog
                        popupButton={
                            <Button variant="outline">
                                <PlusIcon />
                                Create Event
                            </Button>
                        }
                        title="Create Event"
                        description="Create a new event by filling out the details below."
                        dialogContent={
                            <EventManagementForm isCreating={true} setOpen={setOpen} />
                        }
                        open={open}
                        setOpen={setOpen}
                    />
                </div>
                <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 h-full">
                    <div className="">
                        <EventsListCard
                            title="Past Events"
                            empty_message="No Previous Events"
                            partialEvents={pastEvents}
                        />

                    </div>
                    <div className="">
                        <EventsListCard
                            title="Future Events"
                            empty_message="No Upcoming Events"
                            partialEvents={futureEvents}
                        />

                    </div>
                </div>
            </div>
        </EventDataContext.Provider>
    )
}