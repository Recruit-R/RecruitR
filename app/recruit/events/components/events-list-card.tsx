import deleteData from "@/app/api/deleteData";
import { Event } from "@/app/types/event";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent
} from "@/components/ui/card";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdOutlineQrCode2 } from "react-icons/md";
import { EventDataContext, EventDataContextType } from "./client-component";
import { EventManagementForm } from "./event-management-form";
import { PopupDialog } from "./popup-dialog";


interface EventsListCardProps {
    title: string,
    empty_message: string,
    partialEvents: Event[]
}



export function EventsListCard({ partialEvents, title, empty_message }: EventsListCardProps) {

    const { events, setEvents } = useContext(EventDataContext) as EventDataContextType

    const DeleteConfirmationForm = ({ event, setDeleteOpen }: { event: Event, setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
        return (
            <div className="flex items-center justify-center">
                <Button variant="destructive" onClick={() => {
                    deleteData('events', event?.id ?? '')
                        .then((e) => {
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

    const EventCard = ({ event }: { event: Event }) => {
        const date = event.date.toDateString() + " " + event.date!.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
        const [editOpen, setEditOpen] = useState<boolean>(false);
        return (
            <div className="py-2 pl-4 group hover:bg-secondary hover:rounded-lg transition-all flex justify-between items-center">
                <div className={"truncate"}>
                    <div className="text-md font-bold">{event.title}</div>
                    <div className="text-sm text-muted-foreground ">{event.location}</div>
                    <div className="text-sm text-muted-foreground">{date}</div>
                </div>
                <div className="flex flex-row items-center my-auto mr-8 h-8 gap-4 mr-4">
                    <Link href={`events-qr/${event.id}`}>
                        <MdOutlineQrCode2 className="hover:cursor-pointer h-6 w-6" />
                    </Link>
                    <PopupDialog
                        popupButton={<div><FaEdit className="hover:cursor-pointer h-5 w-5" /></div>}
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
                        popupButton={<div><FaTrash className="hover:cursor-pointer hover:fill-destructive h-5 w-4" /></div>}
                        title={`Delete Event (${event.title})`}
                        description="Are you sure you want to delete this event?"
                        dialogContent={<DeleteConfirmationForm event={event} setDeleteOpen={setDeleteOpen} />}
                        open={deleteOpen}
                        setOpen={setDeleteOpen}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="h-full">
            <div className={`${title === "Past Events" ? " text-lg text-gray-500" : "text-lg font-bold "} pb-1`}>{title}</div>
            <Card className="h-full">
                <div className="md:py-2"></div>
                <CardContent className="divide-y p-2 md:p-2">
                    {
                        partialEvents.length ?
                            partialEvents.map((event: Event, i: number) => {
                                return (
                                    <EventCard key={`event_${i}`} event={event} />
                                )
                            })
                            : <span>{empty_message}</span>
                    }
                </CardContent>
            </Card>
        </div>
    )
}