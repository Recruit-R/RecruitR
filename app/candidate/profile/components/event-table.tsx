
"use client"
import React, {useEffect} from "react";
import { EventBox } from "./event-box"

export function EventTable(){
    return (
        <div className="h-full w-full bg-background">
            <EventBox eventName = {"GCC Career Fair"}
                eventDate="Oct 6"
                eventTime="1-5pm">
            </EventBox>
        </div>
    )
}