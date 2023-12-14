'use client'
import {Button} from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import {EventsListCard} from "@/app/recruiter/events-demo/components/events-list-card";
import {RecruiterEvent} from "@/app/recruiter/events-demo/data/events-schema";
import {EventCreationDialog} from "@/app/recruiter/events-demo/components/event-creation-dialog";


export default function ClientComponent({events} : {events: any}) {
    return (
        <div className="flex flex-col gap-4 p-4 ">
            <div className="">
                <EventCreationDialog />
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="">
                    <EventsListCard title="Past Events" events={events}/>
                </div>
                <div className="">
                    <EventsListCard title="Home Events" events={events}/>
                </div>
            </div>
        </div>

    )
}