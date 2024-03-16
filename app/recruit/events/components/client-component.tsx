'use client'

//client component that orders all components in events page

import {EventsListCard} from "@/app/recruit/events/components/events-list-card";
import {RecruiterEvent} from "@/app/recruit/events/data/events-schema";
import {EventCreationDialog} from "@/app/recruit/events/components/event-creation-dialog";
import { useContext, useEffect, createContext } from "react";
import { useState } from "react";
import { getEventData } from "../actions";

export interface EventDataContextType {
    events: any,
    refresh: () => void
}

//define context to provide event data and refresh function to child components
export const EventDataContext = createContext<EventDataContextType | null>(null);

export default function ClientComponent({e} : {e: any}) {
    const [events, setEvents] = useState(e); 
    const [pastEvents, setSortedPastEvents] = useState<any>([]);
    const [futureEvents, setSortedFutureEvents] = useState<any>([]);
    
    function refresh() {
        getEventData().then((e) => {setEvents(e)})
    }
    useEffect(() => {
      const currentDate = new Date();
      const pastEvents = events
      // sort and filter past events by UTC time
      .filter((RecruiterEvent: { Time: Date }) => new Date(RecruiterEvent.Time).toUTCString() < currentDate.toUTCString())
      .sort((a: { Time: Date }, b: { Time: Date }) => new Date(b.Time).getTime() - new Date(a.Time).getTime());
      
      // sort and filter future events by UTC time
      const futureEvents = events
      .filter((RecruiterEvent: { Time: Date }) => new Date(RecruiterEvent.Time) >= currentDate)
      .sort((a: { Time: Date }, b: { Time: Date }) => new Date(a.Time).getTime() - new Date(b.Time).getTime());
  
      // Update state with sorted events
      setSortedPastEvents(pastEvents);
      setSortedFutureEvents(futureEvents);

    // Re-run if events change 
    }, [events]); 

    return (
        <EventDataContext.Provider 
        value={{
            events,
            refresh
        }} >      
        <div className="flex flex-col gap-4 p-4 ">
            <div className="">
                <EventCreationDialog />
            </div>
            <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2">
                <div className="">
                    <EventsListCard title="Past Events" events={pastEvents}/>
                </div>
                <div className="">
                <EventsListCard title="Future Events" events={futureEvents}/>
                </div>
            </div>
        </div>
        </EventDataContext.Provider>
    )
}