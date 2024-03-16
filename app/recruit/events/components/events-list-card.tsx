import { RecruiterEvent } from "@/app/recruit/events/data/events-schema";
import {
    Card,
    CardContent
} from "@/components/ui/card";
import { useState } from "react";

interface EventsListCardProps {
    title: string,
    events: Array<RecruiterEvent>,
}

export function EventsListCard({ title, events }: EventsListCardProps) {

    const [selectedEvent, setSelectedEvent] = useState<RecruiterEvent | null>(null);
    const handleSelectedEvent = (event: RecruiterEvent) => {
        setSelectedEvent(event);
    };
    const handleDeselectEvent = () => {
        setSelectedEvent(null);
    }

    return (
        <><div className="text-lg font-bold pb-1">{title}</div>
            <Card className="">
                <div className="py-2"></div>
                <CardContent className="divide-y">
                    {events.map((event, i) => (
                        <div
                            key={i}
                            onMouseEnter={() => handleSelectedEvent(event)}
                            onMouseLeave={handleDeselectEvent}
                        >
                            <div className="py-2 pl-3 group hover:bg-gray-100 hover:rounded-lg transition-all">
                                <div className="text-md font-bold">{event.Title}</div>
                                <div className="text-sm text-muted-foreground">{event.Location}</div>
                                <div className="text-sm text-muted-foreground">{event.Time!.toString()}</div>
                            </div>
                            {selectedEvent === event && (
                                <div className="absolute z-10 bg-white p-4 border rounded-md shadow-md">
                                    <div>{event.Title}</div>
                                </div>
                            )}
                        </div>
                    ))}
                </CardContent>
            </Card>
        </>
    )
}