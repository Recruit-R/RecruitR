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
import {set} from "yaml/dist/schema/yaml-1.1/set";
import {PossiblePlacement} from "@/app/recruiter/home/components/possible-placement";
import {Textarea} from "@/components/ui/textarea";
import {cn} from "@/lib/utils";
import {Student} from "@/app/recruiter/home/data/student-schema";
import {useAmp} from "next/amp";

interface FeedbackCardProps {
    feedbackFocus: boolean,
    setStudentView: React.Dispatch<React.SetStateAction<boolean>>,
    currentStudent: Student
    c: (classnames: string, conditionalNames: string, condition?: boolean) => string
}

export function FeedbackCard({feedbackFocus, setStudentView, currentStudent, c} : FeedbackCardProps) {
    const languages: Array<String> = ["Python", "Java", "Kotlin", "R", "Angular", ".NET", "Canva", "Adobe Photoshop", "Agile Philosophy", "Power BI", "Azure DevOps", "Waterfall Methodologies"]

    useEffect(() => {console.log(currentStudent)})

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
                {/*    Initial feedback */}
                    <div className="flex flex-col gap-6">
                        <div className={c("flex","xl:hidden")}>
                            <StudentInfo func={c} student={currentStudent}/>
                        </div>
                        <div>
                            <p className="font-bold text-lg">
                                Initial Feedback
                            </p>
                            <div>
                                Images here
                            </div>
                        </div>
                        <PossiblePlacement/>
                        <div className="space-y-1">
                            <p className="font-bold text-lg">
                                Known Tech
                            </p>
                            <div className="flex flex-wrap gap-2">
                            {
                                languages.map((language) => (
                                    <div className="flex items-center space-x-2 bg-muted pl-2 rounded-full" key={language}>
                                        <Checkbox id={language}/>
                                        <label
                                            htmlFor={language}
                                            className="text-sm py-2 pr-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {language}
                                        </label>
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <p className="font-bold pb-2 text-lg">
                            Text Feedback
                        </p>
                        <Textarea className="h-96"/>
                    </div>
                    {/*<PossiblePlacement/>*/}

                </CardContent>
            </Card>
        </>
    )
}