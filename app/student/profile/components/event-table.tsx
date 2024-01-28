
"use client"
import React, {useEffect} from "react";
import { EventBox } from "./event-box"

export function EventTable(){
    return (
        <div className="h-full w-full bg-background p-1">
            <EventBox></EventBox>
            <EventBox></EventBox>
        </div>
    )
}