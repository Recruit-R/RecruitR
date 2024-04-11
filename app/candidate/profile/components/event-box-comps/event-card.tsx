import getData from "@/app/api/getData";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { EventBox } from "./event-box";

export function EventCard({ eventIds }: { eventIds: string[] }) {
    const [events, setEvents] = useState<any[]>([])

    useEffect(() => {
        async function fetchEvents() {
            const parsedEvents = await Promise.all(eventIds.map(async (id) => {
                return await getData({ collection_name: "events", document_id: id })
            }))
            setEvents(parsedEvents as any[])
        }
        fetchEvents()
    }, [eventIds])
    return (
        <Card className="min-h-full ">
            <CardHeader className="flex flex-row items-center divide-x border-b mb-4">
                <p className="font-bold text-lg">
                    Recent Events
                </p>
            </CardHeader>
            <CardContent className="flex flex-col flex-wrap">

                {events.map((event, index) => {
                    return (
                        <EventBox event={event} />
                    )
                })}
            </CardContent>
        </Card>
    )
}