"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
//import {set} from "yaml/dist/schema/yaml-1.1/set";
import { PossiblePlacement } from "@/app/candidate/profile/components/personal-info-comps/possible-placement";
import { StudentInfo } from "./personal-info-comps/student-info";
import { ResumeButton } from "./personal-info-forms/resume-file";
//import { ShowSkills } from "./beta-comps/show-skills";
import { StatusBar } from "./personal-info-comps/status-bar";
import { AboutMeForm } from "./about-me-comps/about-me-form";
import { PersonalForm } from "./personal-info-forms/personal-info-form";
import { HeaderForm } from "./personal-info-forms/header-form";
import { ProfPicEdit } from "./personal-info-forms/prof-pic-form";
import { useRef } from 'react';
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from '@/components/ui/form';
import { useAuth } from "@/components/auth-provider";
import { addCandidateData, get_candidate_data } from "../actions";
import { useRouter } from "next/navigation";


interface StudentInfoCardProps {
    editMode: boolean,
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>

}

export function StudentInfoCard({ editMode, setEditMode }: StudentInfoCardProps) {
    /*const languages: Array<String> = ["Python", "Java", "Kotlin", "R", "Angular", ".NET", "Canva", "Adobe Photoshop", "Agile Philosophy", "Power BI", "Azure DevOps", "Waterfall Methodologies"]*/

    const auth = useAuth()
    const [canData, setCanData] = useState<any>()
    async function getUsersData() {
        const usersVals = await get_candidate_data(auth!.currentUser!.uid)
        return usersVals
    }
    async function addCanData(uid: string, values: object) {
        const newCanData = await addCandidateData(uid, values)
    }

    useEffect(() => {
        if (auth!.currentUser)
            getUsersData().then(e => setCanData(e))
    }, [auth!.currentUser])


    const formSchema = z.object({
        first_name: z.string(),
        last_name: z.string(),
        //about_me: z.string(),
        year: z.string(),
        major: z.string(),
        university: z.string(),
        gpa: z.coerce.number().multipleOf(0.01),
        resumeURL: z.string(),

    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: canData && canData.first_name,
            last_name: canData ? canData.last_name : "",
            //about_me: "",
            year: canData ? canData.major : "",
            major: canData ? canData.major : "",
            university: canData && canData.university,
            gpa: canData ? canData.gpa : 0.00,
            resumeURL: canData ? canData.resumeURL : "",
        },
    })

    useEffect(() => {
        form.reset(canData)
    }, [canData])


    const router = useRouter()

    function onSubmit(values: z.infer<typeof formSchema>) {

        if (auth!.currentUser) {
            addCanData(auth!.currentUser!.uid, values)
            setCanData(getUsersData())
        }

        //router.refresh()
        window.location.reload()
    }


    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Card className="min-h-full">
                        <CardHeader className="flex flex-row border-b mb-4">
                            <div className={`flex flex-row pr-3 items-center space-x-4 relative rounded-lg`}>

                                <Avatar className="h-20 w-20">
                                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                                    <AvatarFallback className={`text-3x`}>
                                        {/* {editMode ? 
                                            <ProfPicEdit></ProfPicEdit>
                                            :
                                            <>NA</>
                                        } */}
                                        {canData ? <div className="font-bold text-3xl">{canData.first_name && canData.first_name[0]}{canData.last_name && canData.last_name[0]}</div> : <>NA</>}

                                    </AvatarFallback>
                                </Avatar>
                                {editMode ? <HeaderForm form={form}></HeaderForm> :
                                    <div>
                                        {canData ?
                                            <>
                                                <CardTitle className="text-4xl">
                                                    {canData.firstName} {canData.lastName}
                                                </CardTitle>
                                                <CardDescription className="text-md">
                                                    {canData.major}
                                                </CardDescription>
                                            </>
                                            :
                                            <>
                                                <CardTitle className="text-4xl">
                                                    Loading...
                                                </CardTitle>
                                                <CardDescription className="text-md">
                                                    Loading...
                                                </CardDescription>
                                            </>
                                        }

                                    </div>
                                }
                            </div>
                            <div className={`flex flex-row ml-auto pl-3 justify-items-center`}>
                                <Button className={`mr-2 ${!editMode && "hidden"}`} type="submit">Save</Button>
                                <Button type="button" onClick={() => setEditMode(prevState => !prevState)}
                                    variant={"outline"}
                                    className="w-32"
                                >
                                    {editMode ? "Cancel" : "Edit Profile"}
                                </Button>


                            </div>

                        </CardHeader>
                        <CardContent className={"flex flex-col flex-wrap xl:grid xl:grid-cols-2 xl:gap-x-4"}>
                            {/*    Initial feedback */}
                            <div className="flex flex-col gap-6">
                                <p className="font-bold text-lg">
                                    Personal Info
                                </p>
                                {editMode ? <PersonalForm form={form} canData={canData}></PersonalForm> : <StudentInfo canData={canData}></StudentInfo>}


                                <PossiblePlacement canData={canData} />
                                <StatusBar canData={canData}></StatusBar>
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
                                <div className={`${!editMode && 'hidden'} pt-0.01`}>
                                    <ResumeButton form={form} />
                                </div>
                                {!canData && "Loading..."}
                                {canData && (canData.resumeURL ? (<div>
                                    <Button type="button" asChild variant={"link"} className={`${editMode && 'hidden'}`}>
                                        <Link href={`${canData.resumeURL && canData.resumeURL}`} target="_blank">Download My Resume</Link>
                                    </Button>
                                </div>) : <span className={`${editMode && 'hidden'}`}> No resume uploaded. Edit profile to upload a resume. </span>)}

                            </div>

                        </CardContent>

                    </Card>
                </form>
            </Form>
        </>

    )
}