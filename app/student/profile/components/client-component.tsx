'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Textarea} from "@/components/ui/textarea";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {FeedbackCard} from "@/app/student/profile/components/feedback-card";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {ChevronLeftIcon, ChevronRight, ChevronRightIcon} from "lucide-react";
import { EventTable } from "./event-table";


export default function ClientComponent({students} : {students : any}) {
    const [feedbackFocus, setFeedbackFocus] = useState<boolean>(true)
    const [studentView, setStudentView] = useState<boolean>(true)

    const c = (classnames: string, conditionalNames: string, condition:boolean=true) => {
        return cn(classnames, (feedbackFocus === condition) && conditionalNames)
    }

    function studentClick(name: string) {
        setStudentView(prevState => !prevState)
    }

    return (
        // <div className="">
        <div className="flex flex-row h-full">
            
                
            <div className={cn("bg-background overflow-y-scroll overscroll-contain p-1", !studentView ? "max-md:hidden" : "", feedbackFocus ? "md:w-3/5 xl:w-3/4" : "md:w-2/5")}>
                <FeedbackCard
                            feedbackFocus={feedbackFocus}
                            setStudentView={setStudentView}
                            c={c}
                        />
            </div>
            
            <div className={cn("h-full w-full bg-background p-1", studentView ? "max-md:hidden" : "", feedbackFocus ? "md:w-2/5 xl:w-1/4" : "md:w-3/5")}>
            <Button className="md:hidden" variant="link" onClick={() => setStudentView(prevState => !prevState)}>
                <ChevronRight className="mr-2 h-4 w-4 align-right"/> Back to User Info
            </Button>
                <p className = "font-bold text-lg">Recent Events
                    
                </p>
                <EventTable></EventTable>
            </div>
        </div>
        // </div>
    )
}