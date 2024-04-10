import deleteData from "@/app/api/deleteData";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent
} from "@/components/ui/card";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { EventManagementForm } from "./event-management-form";
import { PopupDialog } from "./popup-dialog";

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
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
    const [editOpen, setEditOpen] = useState<boolean>(false);

    const DeleteConfirmationForm = ({ event }: { event: Event }) => {
        return (
            <div className="flex items-center">
                <Button variant="destructive" onClick={() => deleteData('events', event.id)}>
                    Delete Event
                </Button>
            </div>
        )
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
                                    <div key={`event_${i}`}>
                                        <div className="py-2 pl-4 group hover:bg-secondary hover:rounded-lg transition-all flex justify-between">
                                            <div>
                                                <div className="text-md font-bold">{event.title}</div>
                                                <div className="text-sm text-muted-foreground">{event.location}</div>
                                                <div className="text-sm text-muted-foreground">{date}</div>
                                            </div>
                                            <div className="flex flex-row items-center my-auto mr-4 w-12 h-8 gap-4">
                                                <PopupDialog
                                                    popupButton={<div><FaEdit className="hover:cursor-pointer" /></div>}
                                                    title="Edit Event" description="Edit the event details below."
                                                    dialogContent={<EventManagementForm event={event} setOpen={setDeleteOpen} />}
                                                    open={deleteOpen}
                                                    setOpen={setDeleteOpen}
                                                />
                                                <PopupDialog
                                                    popupButton={<div><FaTrash className="hover:cursor-pointer hover:fill-destructive" /></div>}
                                                    title="Delete Event"
                                                    description="Are you sure you want to delete this event?"
                                                    dialogContent={<DeleteConfirmationForm event={event} />}
                                                    open={editOpen}
                                                    setOpen={setEditOpen}
                                                />
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