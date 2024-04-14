import deleteData from "@/app/api/deleteData";
import {
    Card,
    CardContent
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { EventCreateForm } from "./event-create-form";

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
    const [open, setOpen] = useState(false)
    const { toast } = useToast();
    return (
        <div className="h-full">
            <div className="text-lg font-bold pb-1">{title}</div>
            <Card className="h-full">
                <div className="md:py-2"></div>
                <CardContent className="divide-y p-2 md:p-6">
                    {
                        events.length >= 1 ?
                            events.map((event: Event, i: number) => {
                                const date = event.date!.toDateString() + " " + event.date!.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                                return (
                                    <div key={event.id}>
                                        <div className="py-2 pl-4 group hover:bg-secondary hover:rounded-lg transition-all flex justify-between">
                                            <div>
                                                <div className="text-md font-bold">{event.title}</div>
                                                <div className="text-sm text-muted-foreground">{event.location}</div>
                                                <div className="text-sm text-muted-foreground">{date}</div>
                                            </div>
                                            <div className="flex flex-row items-center my-auto mr-4 w-12 h-8 gap-4">
                                                <Dialog open={open} onOpenChange={setOpen}>
                                                    <DialogTrigger asChild>
                                                        <FaEdit className="hover:cursor-pointer" onClick={() => console.log(event)} />
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <DialogTitle>Edit Event</DialogTitle>
                                                            <DialogDescription>
                                                                Edit this event by changing the details below.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <EventCreateForm setOpen={setOpen} event={event} />
                                                    </DialogContent>
                                                </Dialog>
                                                <FaTrash className="hover:cursor-pointer" onClick={() => deleteData('events', event.id).then((response) => {
                                                    if (response.status === 200) {
                                                        setEvents((prev: any) => prev.filter((e: Event) => e.id !== event.id))
                                                        toast({
                                                            title: "Event Deleted",
                                                            description: "The event has been successfully deleted."
                                                        })
                                                    } else {
                                                        toast({
                                                            title: "Error",
                                                            description: "There was an error deleting the event."
                                                        })

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