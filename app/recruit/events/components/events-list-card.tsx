import deleteData from "@/app/api/deleteData";
import { Event } from "@/app/types/event";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent
} from "@/components/ui/card";
import { useContext, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { EventDataContext, EventDataContextType } from "./client-component";
import { EventManagementForm } from "./event-management-form";
import { PopupDialog } from "./popup-dialog";


interface EventsListCardProps {
    title: string,
    empty_message: string,
    partialEvents: Event[]
}

export function EventsListCard({ partialEvents, title, empty_message }: EventsListCardProps) {
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const { events, setEvents } = useContext(EventDataContext) as EventDataContextType

    const DeleteConfirmationForm = ({ event }: { event: Event }) => {
        return (
            <div className="flex items-center justify-center">
                <Button variant="destructive" onClick={() => {
                    deleteData('events', event?.id ?? '')
                        .then((e) => {
                            console.log('deleted event', e, event)
                            setEvents(events.filter((e: Event) => e.id !== event.id))
                        })
                        .then(() => {
                            setDeleteOpen(false)
                        })
                }}
                >
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
                        partialEvents.length ?
                            partialEvents.map((event: Event, i: number) => {
                                const date = event.date.toDateString() + " " + event.date!.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                                return (
                                    <div key={`event_${i}`}>
                                        <div className="py-2 pl-4 group hover:bg-secondary hover:rounded-lg transition-all flex justify-between items-center">
                                            <div>
                                                <div className="text-md font-bold">{event.title}</div>
                                                <div className="text-sm text-muted-foreground">{event.location}</div>
                                                <div className="text-sm text-muted-foreground">{date}</div>
                                            </div>
                                            <div className="flex flex-row items-center my-auto mr-4 w-12 h-8 gap-4">
                                                <PopupDialog
                                                    popupButton={<div><FaEdit className="hover:cursor-pointer" /></div>}
                                                    title="Edit Event" description="Edit the event details below."
                                                    dialogContent={
                                                        <EventManagementForm
                                                            isCreating={false}
                                                            event={event}
                                                            setOpen={setEditOpen}
                                                        />
                                                    }
                                                    open={editOpen}
                                                    setOpen={setEditOpen}
                                                />
                                                <PopupDialog
                                                    popupButton={<div><FaTrash className="hover:cursor-pointer hover:fill-destructive" /></div>}
                                                    title="Delete Event"
                                                    description="Are you sure you want to delete this event?"
                                                    dialogContent={<DeleteConfirmationForm event={event} />}
                                                    open={deleteOpen}
                                                    setOpen={setDeleteOpen}
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