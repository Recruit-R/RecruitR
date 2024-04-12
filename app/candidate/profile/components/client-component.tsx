'use client'

import { StudentInfoCard } from "@/app/candidate/profile/components/studentinfo-card";
import React, { useState } from "react";
import { EventCard } from "./event-box-comps/event-card";


export default function ClientComponent() {
    const [editMode, setEditMode] = useState<boolean>(false)

    return (
        // <div className="">
        <div className="flex flex-col md:flex-row md:h-full p-1">

            <div className="md:w-3/4 bg-background overflow-y-auto overscroll-auto md:overflow-y-scroll md:overscroll-contain md:p-1 md:no-scrollbar pb-4">
                {/* <div>         */}
                <StudentInfoCard
                    editMode={editMode}
                    setEditMode={setEditMode}
                />
            </div>
            <div className={"h-full w-full md:w-1/4 overflow-y-auto overscroll-auto bg-background md:overflow-y-scroll md:overscroll-contain md:p-1"}>
                <EventCard />

            </div>

        </div>
        // </div>
    )
}