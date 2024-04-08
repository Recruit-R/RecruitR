import {
    Card,
    CardContent
} from "@/components/ui/card";
import { useState } from "react";

type Event = {
    title: string,
    date: Date,
    location: string
}

interface EventsListCardProps {
    title: string,
    events: Array<Event>,
    empty_message: string
}

export function EventsListCard({ title, events, empty_message }: EventsListCardProps) {

    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const handleSelectedEvent = (event: Event) => {
        setSelectedEvent(event);
    };
    const handleDeselectEvent = () => {
        setSelectedEvent(null);
    }
    return (
        <><div className="text-lg font-bold pb-1">{title}</div>
            <Card className="h-full">
                <div className="py-2"></div>
                <CardContent className="divide-y">
                    {
                        events.length >= 1 ?
                            events.map((event: Event, i: number) => {
                                const date = event.date!.toDateString() + " " + event.date!.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                                return (
                                    <div
                                        key={i}
                                        onMouseEnter={() => handleSelectedEvent(event)}
                                        onMouseLeave={handleDeselectEvent}
                                    >
                                        <div className="py-2 pl-3 group hover:bg-secondary hover:rounded-lg transition-all">
                                            <div className="text-md font-bold">{event.title}</div>
                                            <div className="text-sm text-muted-foreground">{event.location}</div>
                                            <div className="text-sm text-muted-foreground">{date}</div>
                                        </div>

                                    </div>
                                )
                            })
                            : <span>{empty_message}</span>
                    }
                </CardContent>
            </Card>
        </>
    )
}