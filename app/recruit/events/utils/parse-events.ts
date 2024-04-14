import { parseISO } from "date-fns";
import { Event } from "@/app/types/event";

export function parseEvents(eventsToParse: Event[]) {
    return eventsToParse.map((recEvent: Event) => {
        const parsedDate = recEvent.date instanceof Date ? recEvent.date : parseISO(recEvent.date);
        return { ...recEvent, date: parsedDate }
    });
}