import getData from "@/app/api/getData";
import { Event } from "@/app/types/event";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { parseISO } from "date-fns";
import { useEffect, useState } from "react";

export function EventCard({ eventIds }: { eventIds: string[] }) {
    const [events, setEvents] = useState<Event[]>([])


    useEffect(() => {
        async function fetchEvents() {
            const parsedEvents = await Promise.all(eventIds.map(async (id) => {
                const unparsedEvent = await getData({ collection_name: "events", document_id: id });
                if (!unparsedEvent) return null;
                unparsedEvent.date = parseISO(unparsedEvent.date);
                return unparsedEvent
            }))
            setEvents(parsedEvents.filter((event) => event !== null) as Event[])
        }
        fetchEvents()

    }, [])

    return (
        <Card className="min-h-full ">
            <CardHeader className="flex flex-row items-center divide-x border-b mb-4">
                <p className="font-bold text-lg">
                    Recent Events
                </p>
            </CardHeader>
            <CardContent className="flex flex-col flex-wrap gap-2">

                {events.map((event, index) => {
                    return (
                        <Card key={`event_${index}`} className="min-h-full w-full">
                            <CardContent className="flex flex-col flex-wrap w-full pt-4">
                                <p className="font-bold text-lg">{event.title}</p>
                                <p className="text-sm">{event.date.toDateString()}</p>
                            </CardContent>
                        </Card>
                    )
                })}
            </CardContent>
        </Card>
    )
}