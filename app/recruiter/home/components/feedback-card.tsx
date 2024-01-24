"use client"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import {StudentInfo} from "@/app/recruiter/home/components/student-info";
import Link from "next/link";
import {ChevronLeft} from "lucide-react";
import {Button} from "@/components/ui/button";
import React, {useEffect} from "react";
import {PossiblePlacement} from "@/app/recruiter/home/components/feedback-card-components/possible-placement.tsx";
import {Textarea} from "@/components/ui/textarea";
import {cn} from "@/lib/utils";
import {Feedback, Student} from "@/app/recruiter/home/data/student-schema";
import {useAmp} from "next/amp";
import {json} from "node:stream/consumers";
import {KnownTech} from "@/app/recruiter/home/components/feedback-card-components/known-tech.tsx";
import {InitialFeedback} from "@/app/recruiter/home/components/feedback-card-components/initial-feedback.tsx";

interface FeedbackCardProps {
    feedbackFocus: boolean,
    setStudentView: React.Dispatch<React.SetStateAction<boolean>>,
    currentStudent: Student
    c: (classnames: string, conditionalNames: string, condition?: boolean) => string
}

function tern<Type, Type2>(arg: Type, out: Type2): Type | Type2 {
    return arg;
}
export function FeedbackCard({feedbackFocus, setStudentView, currentStudent, c} : FeedbackCardProps) {
    const csf = currentStudent.feedback ? (currentStudent.feedback["Karen"] ? currentStudent.feedback["Karen"] : null ) : null

    const defaultFeedback = csf ? {
        initialFeedback: csf.initial_feedback,
        possiblePlacement: csf.possible_placement,
        knownTech: csf.known_tech ? csf.known_tech! : [],
        textFeedback: csf.text_feedback
    } : {
        initialFeedback: undefined,
        possiblePlacement: undefined,
        knownTech: [],
        textFeedback: undefined
    }

    useEffect(() => {console.log(currentStudent.feedback ?? currentStudent.feedback)}, [currentStudent])
    return (
        <>
            <Button className="md:hidden" variant="link" onClick={() => setStudentView(prevState => !prevState)}>
                <ChevronLeft className="mr-2 h-4 w-4"/> Back to Search List
            </Button>
            <Card className="min-h-full">

                <CardHeader className="flex flex-row items-center divide-x border-b mb-4">
                    <div className="flex flex-1 items-center space-x-4 pr-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src="/avatars/01.png" alt="Avatar"/>
                            <AvatarFallback className="text-3xl">RG</AvatarFallback>
                        </Avatar>
                            <div>
                                <CardTitle className="text-4xl">
                                    {currentStudent.first_name} {currentStudent.last_name}
                                </CardTitle>
                                <CardDescription className="text-md">
                                    He/him
                                </CardDescription>
                            </div>
                    </div>
                    <div className={c("hidden flex-1", "xl:flex")}>
                        <StudentInfo func={c} student={currentStudent}/>
                    </div>
                </CardHeader>

                <CardContent className={c("flex flex-col flex-wrap", "xl:grid xl:grid-cols-2 xl:gap-x-4")}>
                    <div className="flex flex-col gap-6">
                        <div className={c("flex","xl:hidden")}>
                            <StudentInfo func={c} student={currentStudent}/>
                        </div>

                        <InitialFeedback initialFeedback={defaultFeedback.initialFeedback}/>
                        <PossiblePlacement possiblePlacement={defaultFeedback.possiblePlacement}/>
                        <KnownTech knownTech={defaultFeedback.knownTech}/>

                    </div>
                    <div className="">
                        <p className="font-bold pb-2 text-lg">
                            Text Feedback
                        </p>
                        <Textarea className="h-96" value={JSON.stringify(currentStudent.feedback)}/>
                    </div>
                    {/*<PossiblePlacement/>*/}

                </CardContent>
            </Card>
        </>
    )
}