"use client"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import Link from "next/link";
import {ChevronLeft} from "lucide-react";
import {Button} from "@/components/ui/button";
import React, {useEffect, useState} from "react";
//import {set} from "yaml/dist/schema/yaml-1.1/set";
import {PossiblePlacement} from "@/app/candidate/profile/components/possible-placement";
import {Textarea} from "@/components/ui/textarea";
import {cn} from "@/lib/utils";
import {useAmp} from "next/amp";
import { StudentInfo } from "./student-info";
import { ResumeButton } from "./resume-file";
import { ShowSkills } from "./show-skills";
import { StatusBar } from "./status-bar";
import { Dialog } from "@radix-ui/react-dialog";
import { AboutMeDrawerDialog } from "./about-me-edit";
import { DialogDemo } from "./about-me-dialog";
import { PersonalDrawerDialog } from "./personal-edit";
import { HeaderDrawerDialog } from "./header-edit";

interface StudentInfoCardProps {
    editMode: boolean,
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>
    c: (classnames: string, conditionalNames: string, condition?: boolean) => string
}

export function StudentInfoCard({editMode, setEditMode, c} : StudentInfoCardProps) {
    /*const languages: Array<String> = ["Python", "Java", "Kotlin", "R", "Angular", ".NET", "Canva", "Adobe Photoshop", "Agile Philosophy", "Power BI", "Azure DevOps", "Waterfall Methodologies"]*/
    // useEffect(() => {console.log(`RAHHH`)})
    return (
        <>
            <Card className="min-h-full ">
                <CardHeader className="flex flex-row border-b mb-4">
                    <div className={`flex flex-row pr-3 items-center space-x-4 relative ${editMode && "animate-pulse"} rounded-lg`}>
                            {
                                editMode && 
                                <HeaderDrawerDialog></HeaderDrawerDialog>
                            }
                            <Avatar className="h-20 w-20">
                                <AvatarImage src="/avatars/01.png" alt="Avatar"/>
                                <AvatarFallback className="text-3xl">JM</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-4xl">
                                    Joe Schrieber
                                </CardTitle>
                                <CardDescription className="text-md">
                                    Exercise Science Major
                                </CardDescription>

                            </div>
                    </div>
                    <div className={`flex flex-col pl-3 ml-auto items-center`}>
                        <Button asChild variant={"link"}>
                            <Link href="https://www.ppg.com/en-US" target="_blank">Check out PPG!</Link>
                        </Button>
                        <Button onClick={() => setEditMode(prevState => !prevState)}
                            variant={"outline"}
                            className="w-32"
                            >
                            {editMode ? "Cancel": "Edit Profile"}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className={c("flex flex-col flex-wrap", "xl:grid xl:grid-cols-2 xl:gap-x-4")}>
                {/*    Initial feedback */}
                    <div className="flex flex-col gap-6">
                        <div className={`relative ${editMode && "animate-pulse"} rounded-lg`}>

                            {
                                editMode && 
                                <AboutMeDrawerDialog></AboutMeDrawerDialog>
                            }
                            
                            <p className="font-bold text-lg">
                                About Me
                            </p>
                            <p>I am a Grove City College student.</p>
                        </div>
                        <div className={`relative ${editMode && "animate-pulse"} rounded-lg`}>
                            {
                                editMode && 
                                <PersonalDrawerDialog></PersonalDrawerDialog>
                            }
                            
                            <p className="font-bold text-lg">
                                Personal Info
                            </p>
                            <StudentInfo func={c}></StudentInfo>
                        </div>
                        
                        

                        <PossiblePlacement/>
                        <StatusBar></StatusBar>
                        {/* <div className="space-y-1">
                            <p className="font-bold text-lg">
                                Skills
                            </p>
                            {<ShowSkills/>}
                            
                        </div> */}
                        <div className="space-y-1 ">
                            <p className="font-bold text-lg col-start-2">
                                Resume
                            </p>
                        </div>
                        <div className="pt-0.01">
                            <ResumeButton />
                        </div>
                    </div>
                    
                </CardContent>
                
            </Card>
            
        </>

    )
}