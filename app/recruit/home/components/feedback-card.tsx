"use client"
import * as XLSX from 'xlsx'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {StudentInfo} from "@/app/recruit/home/components/data-table/student-info.tsx";
import {ChevronLeft, RefreshCcw} from "lucide-react";
import {Button, buttonVariants} from "@/components/ui/button";
import React, {useContext, useEffect} from "react";
import {Student} from "@/app/recruit/home/data/student-schema";
import {KnownTechFeedback} from "@/app/recruit/home/components/feedback-card-components/known-tech-feedback.tsx";
import {InitialFeedback} from "@/app/recruit/home/components/feedback-card-components/initial-feedback.tsx";
import {TextFeedback} from "@/app/recruit/home/components/feedback-card-components/text-feedback.tsx";
import {StudentDataContext, StudentDataContextType} from "@/app/recruit/home/components/dashboard.tsx";
import {Timeline} from "@/app/recruit/home/components/feedback-card-components/timeline.tsx";
import {
    RatingRecruiterFeedback
} from "@/app/recruit/home/components/feedback-card-components/rating-recruiter-feedback.tsx";
import {useAuth} from "@/components/auth-provider.tsx";
import Roles from "@/app/types/roles.ts";
import {DeleteStudent} from "@/app/recruit/home/components/feedback-card-components/delete-student.tsx";
import {cn, downloadxls} from "@/lib/utils.ts";
import {
    PossiblePlacementMultiselect
} from "@/app/recruit/home/components/feedback-card-components/possible-placement-multiselect.tsx";
import Link from "next/link";

interface FeedbackCardProps {
    feedbackFocus: boolean,
    setStudentView: React.Dispatch<React.SetStateAction<boolean>>,
    currentStudent: Student,
    setCurrentStudent: React.Dispatch<React.SetStateAction<Student>>,
    c: (classnames: string, conditionalNames: string, condition?: boolean) => string
}

function tern<Type, Type2>(arg: Type, out: Type2): Type | Type2 {
    return arg;
}
export function FeedbackCard({feedbackFocus, setStudentView, currentStudent, setCurrentStudent, c} : FeedbackCardProps) {
    const { saved, currRecrFeedback, editable, currentUserEditId } = useContext(StudentDataContext) as StudentDataContextType
    const auth = useAuth();
    return (
        <>
            <Button className="md:hidden" variant="link" onClick={() => {
                setStudentView(prevState => !prevState)
                setCurrentStudent(null)
            }}>
                <ChevronLeft className="mr-2 h-4 w-4"/> Back to Search List
            </Button>

            <Card className="min-h-full relative no-scrollbar">
                <CardHeader className={c("flex flex-col gap-2 border-b gap-4 mb-4 ", "flex flex-col xl:flex-row items-start xl:items-center border-b gap-4 mb-4 divide-x")}>
                    <div className="flex flex-1 items-center space-x-4">
                        <div className="flex flex-1 items-center space-x-4 pr-4">

                            <Avatar className="h-20 w-20">
                                <AvatarImage src="/avatars/01.png" alt="Avatar"/>
                                <AvatarFallback
                                    className="text-3xl">{currentStudent?.first_name?.[0].toUpperCase() ?? "N"}{currentStudent?.last_name?.[0]?.toUpperCase() ?? "A"}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-4xl">
                                    {(currentStudent?.first_name && currentStudent?.last_name) ?
                                        <>{currentStudent!.first_name} {currentStudent!.last_name}</>
                                        : "No Name"}
                                    {/*{currentStudent?.first_name} {currentStudent?.last_name}*/}
                                </CardTitle>
                                <CardDescription className="text-md">
                                    {currentStudent ? currentStudent!.email : "No email"}

                                </CardDescription>
                            </div>
                        </div>
                    </div>
                    <div className={c("flex flex-col sm:flex-row md:flex-col xl:flex-row gap-2", "flex w-full flex-col sm:flex-row md:flex-col lg:flex-row xl:hidden")}>

                        <Link target={"_blank"} href={currentStudent?.resumeURL ?? ""} className={cn(
                            buttonVariants({ variant: 'default' }),
                            "w-full",
                            !currentStudent?.resumeURL && 'pointer-events-none opacity-50',
                        )}>
                            {
                                currentStudent?.resumeURL ?
                                    "View Resume"
                                    :
                                    "No Resume Uploaded"
                            }
                        </Link>
                        <Button variant={"secondary"} className={"w-full"} onClick={e => {
                            downloadxls(e, [currentStudent] ?? [{data: "No Data"}])
                        }}>Download Student Info</Button>
                    </div>
                    <div className={c("hidden flex-1 ", "xl:flex items-center flex-1 pl-2 ")}>
                        <StudentInfo func={c} student={currentStudent} headerView={true}/>
                        <div className={"flex flex-col gap-2"}>
                            <Link target={"_blank"} href={currentStudent?.resumeURL ?? ""} className={cn(
                                buttonVariants({ variant: 'default' }),
                                "w-full",
                                !currentStudent?.resumeURL && 'pointer-events-none opacity-50',
                            )}>
                                {
                                    currentStudent?.resumeURL ?
                                        "View Resume"
                                        :
                                        "No Resume Uploaded"
                                }
                            </Link>
                            <Button variant={"secondary"} onClick={e => {
                                downloadxls(e, [currentStudent] ?? [{data: "No Data"}])
                            }}>Download Student Info</Button>
                        </div>
                    </div>

                </CardHeader>

                <CardContent className={"flex flex-col divide-y space-y-4"}>
                    <RatingRecruiterFeedback/>
                    <div className={c("flex flex-col flex-wrap py-4 gap-6", "xl:grid xl:grid-cols-2 xl:gap-x-4")}>
                        <div className="flex flex-col gap-6">
                            <InitialFeedback/>
                            <div className={c("flex flex-col", "xl:hidden")}>
                                <div className={"flex flex-row items-center justify-between pb-2"}>
                                <span className="text-2xl font-medium pb-1">Student Info</span>
                                </div>
                                <StudentInfo func={c} student={currentStudent} headerView={false}/>
                            </div>

                            <PossiblePlacementMultiselect/>
                            <KnownTechFeedback/>
                        </div>

                        <div className="flex flex-col gap-6">
                            <TextFeedback/>

                        </div>
                    </div>
                    <Timeline
                        c={c}
                    />
                    {
                        auth?.userRole === Roles.COORDINATOR
                        && <DeleteStudent/>
                    }

                </CardContent>
            </Card>
        </>
    )
}