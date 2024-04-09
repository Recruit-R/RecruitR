import deleteData from "@/app/api/deleteData";
import {
    Card,
    CardContent
} from "@/components/ui/card";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

type Event = {
    title: string,
    date: Date,
    location: string
    id: string
}

interface EventsListCardProps {
    title: string,
    events: Array<Event>,
    setEvents: React.Dispatch<React.SetStateAction<any>>,
    empty_message: string
}

export function EventsListCard({ title, events, setEvents, empty_message }: EventsListCardProps) {

    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const handleSelectedEvent = (event: Event) => {
        setSelectedEvent(event);
    };
    const handleDeselectEvent = () => {
        setSelectedEvent(null);
    }
    return (
        <div className="h-full">
            <div className="text-lg font-bold pb-1">{title}</div>
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
                                        <div className="py-2 pl-4 group hover:bg-secondary hover:rounded-lg transition-all flex justify-between">
                                            <div>
                                                <div className="text-md font-bold">{event.title}</div>
                                                <div className="text-sm text-muted-foreground">{event.location}</div>
                                                <div className="text-sm text-muted-foreground">{date}</div>
                                            </div>
                                            <div className="flex flex-row items-center my-auto mr-4 w-12 h-8 gap-4">
                                                <FaEdit className="hover:cursor-pointer" onClick={() => console.log(event)} />
                                                <FaTrash className="hover:cursor-pointer" onClick={() => deleteData('events', event.id).then((response) => {
                                                    if (response.status === 200) {
                                                        setEvents((prev: any) => prev.filter((e: Event) => e.id !== event.id))
                                                    }
                                                })} />
                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                            : <span>{empty_message}</span>
                    }
                </CardContent>
            </Card>
        </div>
    )
}