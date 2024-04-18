import getData from "@/app/api/getData";
import { Event } from "@/app/types/event";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { parseISO } from "date-fns";
import { useEffect, useState } from "react";

export function EventCard({ eventIds }: { eventIds: string[] }) {
    const [events, setEvents] = useState<Event[]>([])
    const [loading, isLoading] = useState<boolean>(true)


    useEffect(() => {
        console.log(eventIds);
        async function fetchEvents() {
            const parsedEvents = await Promise.all(eventIds.map(async (id) => {
                const unparsedEvent = await getData({ collection_name: "events", document_id: id });
                if (!unparsedEvent) return null;
                unparsedEvent.date = parseISO(unparsedEvent.date);
                return unparsedEvent
            }))
            setEvents(parsedEvents.filter((event) => event !== null) as Event[])
        }
        fetchEvents().then(() => isLoading(false));

    }, [])

    return (
        <Card className="min-h-full ">
            <CardHeader className="flex flex-row items-center divide-x border-b mb-4">
                <p className="font-bold text-lg">
                    Recent Events
                </p>
            </CardHeader>
            <CardContent className="flex flex-col flex-wrap gap-2">
                {loading ? <>{[0, 1, 2, 3].map((i) => <Skeleton key={`skeleton_${i}`} className="h-20 w-full rounded-xl" />)}</> : (
                    <>
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
                    </>
                )}
                {events.length === 0 && !loading && <p>No events to display</p>}
            </CardContent>

        </Card>

    )
}