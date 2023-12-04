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
import {FeedbackCard} from "@/app/recruiter/home/components/feedback-card";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {studentColumns} from "@/app/recruiter/home/components/student-columns";
import {DataTable} from "@/app/recruiter/home/components/data-table";
import {Student} from "@/app/recruiter/home/data/student-schema";
import {ChevronLeftIcon, ChevronRightIcon} from "lucide-react";


export default function ClientComponent({students} : {students : any}) {
    const [feedbackFocus, setFeedbackFocus] = useState<boolean>(true)
    const [studentView, setStudentView] = useState<boolean>(true)
    const [currentStudent, setCurrentStudent] = useState<Student>(null)

    const c = (classnames: string, conditionalNames: string, condition:boolean=true) => {
        return cn(classnames, (feedbackFocus === condition) && conditionalNames)
    }

    function studentClick(name: string) {
        setStudentView(prevState => !prevState)
    }

    return (
        // <div className="">
        <div className="flex flex-row h-full">
            <div className={cn("h-full w-full bg-background p-1", studentView ? "max-md:hidden" : "", feedbackFocus ? "md:w-2/5 xl:w-1/4" : "md:w-3/5")}>
                <DataTable
                    setCurrentStudent={setCurrentStudent}
                    setStudentView={setStudentView}
                    data={students}
                    columns={studentColumns(feedbackFocus)}
                    c={c}
                />
            </div>
            <div className="self-center">
                <Button
                    variant="outline"
                    className="max-md:hidden px-1 py-1"
                    onClick={() => setFeedbackFocus(prevState => !prevState)}>
                    {feedbackFocus ?
                        <ChevronRightIcon className="w-4"/>
                        : <ChevronLeftIcon className="w-4"/>}
                </Button>
            </div>
            {
                currentStudent ? (
                    <div className={cn("bg-background overflow-y-scroll overscroll-contain p-1", !studentView ? "max-md:hidden" : "", feedbackFocus ? "md:w-3/5 xl:w-3/4" : "md:w-2/5")}>
                        <FeedbackCard
                            feedbackFocus={feedbackFocus}
                            setStudentView={setStudentView}
                            currentStudent={currentStudent}
                            c={c}
                        />
                    </div>
                ) : (
                    <div className={cn("bg-background overflow-y-scroll overscroll-contain p-1", !studentView ? "max-md:hidden" : "", feedbackFocus ? "md:w-3/5 xl:w-3/4" : "md:w-2/5")}>
                        <Card className="min-h-full flex items-center justify-center">
                        <CardContent className="flex flex-col gap-2 items-center justify-center p-0">
                            <p className="font-bold">
                                No Student Selected.
                            </p>
                            <p>
                                Select a student to view.
                            </p>
                        </CardContent>
                        </Card>
                    </div>

                )
            }
        </div>
        // </div>
    )
}