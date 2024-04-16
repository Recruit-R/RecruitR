"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import React, { useEffect, useState } from "react";
//import {set} from "yaml/dist/schema/yaml-1.1/set";
import { PossiblePlacement } from "@/app/candidate/profile/components/personal-info-comps/possible-placement";
import { StudentInfo } from "./personal-info-comps/student-info";
import { ResumeButton } from "./personal-info-forms/resume-file";
//import { ShowSkills } from "./beta-comps/show-skills";
import { useAuth } from "@/components/auth-provider";
import { Form } from '@/components/ui/form';
import { Icons } from "@/components/ui/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { addCandidateData, getCandidateData } from "../actions";
import { StatusBar } from "./personal-info-comps/status-bar";
import { HeaderForm } from "./personal-info-forms/header-form";
import { PersonalForm } from "./personal-info-forms/personal-info-form";
import { ElementTitle } from "./element-title";


interface StudentInfoCardProps {
    editMode: boolean,
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
    loadedCanData: any,
}

export function StudentInfoCard({ editMode, setEditMode, loadedCanData }: StudentInfoCardProps) {
    /*const languages: Array<String> = ["Python", "Java", "Kotlin", "R", "Angular", ".NET", "Canva", "Adobe Photoshop", "Agile Philosophy", "Power BI", "Azure DevOps", "Waterfall Methodologies"]*/
    const [canData, setCanData] = useState<any>(loadedCanData);
    const [isParsing, setIsParsing] = useState<boolean>(false);
    const auth = useAuth();
    const formSchema = z.object({
        first_name: z.string(),
        last_name: z.string(),
        //about_me: z.string(),
        year: z.string(),
        major: z.string().optional(),
        university: z.string().optional(),
        gpa: z.coerce.number().multipleOf(0.01).optional(),
        resumeURL: z.string().optional(),

    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: canData && canData.first_name,
            last_name: canData ? canData.last_name : "",
            year: canData ? canData.major : "",
            major: canData ? canData.major : "",
            university: canData && canData.university,
            gpa: canData ? canData.gpa : 0.00,
            resumeURL: canData ? canData.resumeURL : "",
        },
    })

    useEffect(() => {
        form.reset({ ...form.formState.defaultValues, ...canData })
    }, [canData])


    async function onSubmit(values: z.infer<typeof formSchema>) {

        if (auth!.currentUser) {
            await addCandidateData(auth!.currentUser!.uid, values)
            setCanData(await getCandidateData(auth!.currentUser!.uid))
        }

        //router.refresh()
        window.location.reload()
    }


    return (
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
                                                <CardTitle className="sm:text-4l md:text-4xl">
                                                    {canData.first_name} {canData.last_name}
                                                </CardTitle>
                                                <CardDescription className="text-md">
                                                    {canData.major}
                                                </CardDescription>
                                            </>
                                            :
                                            <>
                                                <CardTitle className="sm:text-4l md:text-4xl">
                                                    <Icons.spinner className="mr-2 h-6 w-6 animate-spin" />
                                                </CardTitle>
                                                
                                            </>
                                        }

                                </div>
                            }
                        </div>

                        <div className={`flex flex-row ml-auto pt-3 pl-3 justify-items-center`}>
                            <Button className={`mr-2 ${!editMode && "hidden"}`} type="submit">Save</Button>
                            <Button disabled={canData === undefined} type="button" onClick={() => setEditMode(prevState => !prevState)}
                                variant={"outline"}
                                className="w-32"
                            >
                                {editMode ? "Cancel" : "Edit Profile"}
                            </Button>
                        </div>

                        </CardHeader>
                        <CardContent className={"flex flex-col flex-wrap xl:gap-x-4"}>
                            {/*    Initial feedback */}
                            <div className="flex flex-col gap-5 space-y-1">
                                <ElementTitle title = {"Personal Info"}/>
                                {editMode ? <PersonalForm form={form} canData={canData}></PersonalForm> : <StudentInfo canData={canData}></StudentInfo>}


                                {/* <PossiblePlacement canData={canData} /> */}
                                <ElementTitle title = {"Intership Process Status"}/>
                                <StatusBar canData={canData}></StatusBar>
                                {/* <div className="space-y-1">
                            <p className="font-bold text-lg">
                                Skills
                            </p>
                            {<ShowSkills/>}
                            
                        </div> */}       
                                <ElementTitle title = {"Resume"}/>
                                    {editMode &&
                                    <div className={`pt-0.01`}>
                                        <ResumeButton form={form} canData={canData} />
                                    </div>}

                                    {!canData && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                                    {canData && (canData.resumeURL ? (<div>
                                    <Button type="button" asChild variant={"link"} className={`${editMode && 'hidden'}`}>
                                        <Link href={`${canData.resumeURL && canData.resumeURL}`} target="_blank">Download My Resume</Link>
                                    </Button>
                                    </div>) : <span className={`pl-4 ${editMode && 'hidden'}`}> No resume uploaded. Edit profile to upload a resume. </span>)}
                                

                        </div>

                    </CardContent>

                </Card>
            </form>
        </Form>

    )
}