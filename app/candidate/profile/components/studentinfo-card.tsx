"use client"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import Link from "next/link";
import {ChevronLeft, Edit2Icon} from "lucide-react";
import {Button} from "@/components/ui/button";
import React, {useEffect, useState} from "react";
//import {set} from "yaml/dist/schema/yaml-1.1/set";
import {PossiblePlacement} from "@/app/candidate/profile/components/possible-placement";
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
import { AboutMeForm } from "./about-me-form";
import { PersonalForm } from "./personal-info-form";
import { HeaderForm } from "./header-form";
import { ProfPicEdit } from "./prof-pic-form";
import {useRef} from 'react';
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from "@/components/auth-provider";
import addData from "@/app/api/addData";
import { addCandidateData, get_candidate_data } from "../actions";


interface StudentInfoCardProps {
    editMode: boolean,
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>
    
}

export function StudentInfoCard({editMode, setEditMode} : StudentInfoCardProps) {
    /*const languages: Array<String> = ["Python", "Java", "Kotlin", "R", "Angular", ".NET", "Canva", "Adobe Photoshop", "Agile Philosophy", "Power BI", "Azure DevOps", "Waterfall Methodologies"]*/
    // useEffect(() => {console.log(`RAHHH`)})
    const auth = useAuth()
    console.log(auth)
    const [can_data, setCanData] = useState<any>()
    async function getusersData() {
        const usersVals = await get_candidate_data(auth!.currentUser!.uid)
        return usersVals
    }
    useEffect(() => {
        //console.log(can_data)
    }, [can_data])

    useEffect(() => 
    {   
        if (auth!.currentUser)
            setCanData(getusersData())
    }, [auth!.currentUser])
    

    const formSchema = z.object({
        first_name: z.string(),
        last_name: z.string(),
        about_me: z.string(),
        year: z.string(),
        major: z.string(),
        university: z.string(),
        gpa: z.coerce.number().multipleOf(0.01),
        email: z.string()

    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            about_me: "",
            year: "(ex. Sophomore)",
            major: "",
            university: "",
            gpa: 0.00,
            email: ""
        },
    })

    

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("in on submit SHOULD NOT BE CALLING")
        console.log(values)
        addCandidateData(auth!.currentUser!.uid, values)
        // setEditMode(prevState => !prevState)
        if (auth!.currentUser)
            setCanData(getusersData())
    }


    return (
        <>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="min-h-full ">
                <CardHeader className="flex flex-row border-b mb-4">
                    <div className={`flex flex-row pr-3 items-center space-x-4 relative rounded-lg`}>
                            {/* ${editMode && "animate-pulse outline"}{
                                editMode && 
                                <HeaderDrawerDialog></HeaderDrawerDialog>
                            } */}
                            <Avatar className="h-20 w-20">
                                <AvatarImage src="/avatars/01.png" alt="Avatar"/>
                                <AvatarFallback className={`text-3x`}>
                                    {editMode ? 
                                            <ProfPicEdit></ProfPicEdit>
                                            :
                                            <>NA</>
                                        }
                                </AvatarFallback>
                            </Avatar>
                            {editMode ? <HeaderForm form = {form}></HeaderForm> :
                            <div>
                                {can_data ?
                                <>
                                <CardTitle className="text-4xl">
                                    {can_data.first_name} {can_data.last_name}
                                </CardTitle>
                                <CardDescription className="text-md">
                                    {can_data.major}
                                </CardDescription>
                                </>
                                :
                                <>
                                <CardTitle className="text-4xl">
                                    Full Name
                                </CardTitle>
                                <CardDescription className="text-md">
                                    No Major
                                </CardDescription>
                                </>
                                }

                            </div>
                            }
                    </div>
                    <div className={`flex flex-col ml-auto pl-3 items-center`}>
                        <Button asChild variant={"link"}>
                            <Link href="https://www.ppg.com/en-US" target="_blank">Check out PPG!</Link>
                        </Button>
                        {editMode && <Button type="submit" onClick={() => setEditMode(prevState => !prevState)}>Save</Button>}
                        <Button onClick={() => setEditMode(prevState => !prevState)}
                            variant={"outline"}
                            className="w-32"
                            >
                            {editMode ? "Cancel": "Edit Profile"}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className={"flex flex-col flex-wrap xl:grid xl:grid-cols-2 xl:gap-x-4"}>
                {/*    Initial feedback */}
                    <div className="flex flex-col gap-6">
                        <div className={`relativerounded-lg`}>

                            {/* ${editMode && "outline animate-pulse"} 
                            {
                                editMode && 

                                <AboutMeDrawerDialog></AboutMeDrawerDialog>
                            } */}
                            
                            <p className="font-bold text-lg">
                                About Me
                            </p>
                            {editMode ? <AboutMeForm form = {form}></AboutMeForm> : 
                            <div>
                                {can_data ?
                                <p>{can_data.about_me}</p> : <p>About Me</p>}
                            </div>
                            }
                            
                        </div>
                        {/* <div className={`relative ${editMode && "outline animate-pulse"} rounded-lg`}>
                            {
                                editMode && 
                                <PersonalDrawerDialog></PersonalDrawerDialog>
                            } */}
                            
                            <p className="font-bold text-lg">
                                Personal Info
                            </p>
                            {editMode ? <PersonalForm form = {form}></PersonalForm> : <StudentInfo can_data={can_data}></StudentInfo>}                        
                        

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
            </form>
            </Form>
        </>

    )
}