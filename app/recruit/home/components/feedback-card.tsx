"use client"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import {StudentInfo} from "@/app/recruit/home/components/student-info";
import Link from "next/link";
import {Bold, ChevronLeft, Italic, Underline, Loader2, RefreshCcw} from "lucide-react";
import {Button} from "@/components/ui/button";
import React, {useContext, useEffect} from "react";
import {PossiblePlacement} from "@/app/recruit/home/components/feedback-card-components/possible-placement.tsx";
import {Textarea} from "@/components/ui/textarea";
import {cn} from "@/lib/utils";
import {Feedback, Student} from "@/app/recruit/home/data/student-schema";
import {useAmp} from "next/amp";
import {json} from "node:stream/consumers";
import {KnownTech} from "@/app/recruit/home/components/feedback-card-components/known-tech.tsx";
import {InitialFeedback} from "@/app/recruit/home/components/feedback-card-components/initial-feedback.tsx";
import getData from "@/app/api/getData.ts";
import {get_student_feedback} from "@/app/recruit/home/actions.ts";
import {TextFeedback} from "@/app/recruit/home/components/feedback-card-components/text-feedback.tsx";
import {ToggleGroup, ToggleGroupItem} from "@radix-ui/react-toggle-group";
import {ToggleGroupDemo} from "@/app/recruit/home/components/feedback-card-components/toggle-component-test.tsx";
import {StudentDataContext, StudentDataContextType} from "@/app/recruit/home/components/client-component.tsx";
import {BsCloudCheck, BsEye} from "react-icons/bs";
import {ComboboxDemo} from "@/app/recruit/home/components/dev-components/ComboboxDemo.tsx";
import {HomeTimeline, Timeline} from "@/app/recruit/home/components/feedback-card-components/timeline.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {
    RatingRecruiterFeedback
} from "@/app/recruit/home/components/feedback-card-components/rating-recruiter-feedback.tsx";
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
    const csf = currentStudent.feedback ? (currentStudent.feedback["Karen"] ? currentStudent.feedback["Karen"] : null ) : null
    const { saved, currRecrFeedback, editable } = useContext(StudentDataContext) as StudentDataContextType
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
    return (
        <>
            <Button className="md:hidden" variant="link" onClick={() => setStudentView(prevState => !prevState)}>
                <ChevronLeft className="mr-2 h-4 w-4"/> Back to Search List
            </Button>

            <Card className="min-h-full relative">
                <div className={"absolute top-0 right-0 p-4"}>
                    {
                        !editable()
                            ? <BsEye className={"w-6 h-6 stroke-{.5} fill-ring"} />
                            : saved
                                ? <BsCloudCheck className={"w-6 h-6 stroke-{.5} fill-ring"} />
                                : <RefreshCcw className={"w-6 h-6 animate-reverse-spin stroke-ring stroke-1"}/>
                    }
                </div>
                <CardHeader className="flex flex-row items-center border-b mb-4 divide-x">
                    <div className="flex flex-1 items-center space-x-4 pr-4 ">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src="/avatars/01.png" alt="Avatar"/>
                            <AvatarFallback className="text-3xl">{currentStudent.first_name[0] ?? "N"}{currentStudent.last_name[0] ?? "A"}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-4xl">
                                {currentStudent.first_name} {currentStudent.last_name}
                            </CardTitle>
                            <CardDescription className="text-md">
                                He/him {currRecrFeedback}
                            </CardDescription>
                        </div>
                    </div>
                    <div className={c("hidden flex-1 ", "xl:flex flex-1 pl-2 ")}>
                        <StudentInfo func={c} student={currentStudent} headerView={true}/>
                    </div>
                </CardHeader>

                <CardContent className={"flex flex-col"}>

                    <div className={c("flex flex-col flex-wrap pb-4", "xl:grid xl:grid-cols-2 xl:gap-x-4")}>
                        <div className="flex flex-col gap-6">
                            <div className={"flex-row flex"}>
                                <RatingRecruiterFeedback/>
                                {/*<ComboboxDemo />*/}
                            </div>
                            <div className={c("flex flex-col", "xl:hidden")}>
                                <span className="text-2xl font-medium pb-2">Student Info</span>
                                <StudentInfo func={c} student={currentStudent} headerView={false}/>
                            </div>

                            <InitialFeedback/>
                            <PossiblePlacement possiblePlacement={defaultFeedback.possiblePlacement}/>
                            <KnownTech/>

                        </div>
                        <div className="">
                            <TextFeedback/>
                        </div>
                    </div>
                    <Separator />
                    <Timeline
                        events={["Career Fair", "Interview 1", "Interview 2", "Interview 3", "Success"]}
                        currEvent={"Interview 3"}
                        editable={false}
                        c={c}
                    />
                    {/*<PossiblePlacement/>*/}

                </CardContent>
            </Card>
        </>
    )
}