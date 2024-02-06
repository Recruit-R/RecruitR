'use client'
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FeedbackCard } from "@/app/student/profile/components/feedback-card";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRight, ChevronRightIcon } from "lucide-react";
import { EventTable } from "./event-table";
import { EventCard } from "./event-card";


export default function ClientComponent() {


    return (
        // <div className="">
        <div className="flex flex-col md:flex-row md:h-full p-1">

            <div className="md:w-3/4 bg-background overflow-y-auto overscroll-auto md:overflow-y-scroll md:overscroll-contain md:p-1 md:no-scrollbar pb-4">
                {/* <div>         */}
                <FeedbackCard />
            </div>
            <div className={"h-full w-full md:w-1/4 overflow-y-auto overscroll-auto bg-background md:overflow-y-scroll md:overscroll-contain md:p-1"}>
                <EventCard />

            </div>

        </div>
        // </div>
    )
}