'use client'

//This is the page that displays the coordinator or recruiter profile information

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BsPerson } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import React from "react";
import { useAuth } from "@/components/auth-provider";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";


export default function Page() {

    const auth = useAuth();
    const currentUser = auth!.currentUser;
    //boolean if logged in as coordinator or not
    const booleanCoordinator = auth!.isCoordinator;
    let role;
    if (booleanCoordinator) {
        role = "Coordinator";
    } else {
        role = "Recruiter"; 
    }

    let itemList;
    //if logged in as a coordinator display this list of permissions
    if (booleanCoordinator) {
        itemList = (
            <>
                 <div className="flex items-center">
                 <RiCheckboxCircleLine  className="mr-2 h-5 w-5 text-md text-md" />
                    <span className={"text-md text-md"}>Add Recruiters</span>
                </div>
                <div className="flex items-center">
                    <RiCheckboxCircleLine  className="mr-2 h-5 w-5" />
                    <span>Change Student Feedback</span>
                </div>
                <div className="flex items-center">
                    <RiCheckboxCircleLine  className="mr-2 h-5 w-5" />
                    <span>Change Student Status</span>
                </div>
                <div className="flex items-center">
                    <RiCheckboxCircleLine  className="mr-2 h-5 w-5" />
                    <span>Create/Manage Events</span>
                </div>                 
            </>
        );
    //if logged in as a recruiter display this list of permissions
    } else {
        itemList = (
            <>
                <div className="flex items-center">
                    <MdOutlineCancel className="mr-2 h-5 w-5 text-md text-md" />
                    <span className={"text-md text-md"}>Add Recruiters</span>
                </div>
                <div className="flex items-center">
                    <RiCheckboxCircleLine  className="mr-2 h-5 w-5" />
                    <span>Change Student Feedback</span>
                </div>
                <div className="flex items-center">
                    <MdOutlineCancel  className="mr-2 h-5 w-5" />
                    <span>Change Student Status</span>
                </div>
                <div className="flex items-center">
                    <RiCheckboxCircleLine  className="mr-2 h-5 w-5" />
                    <span>Create/Manage Events</span>
                </div>                    
            </>
        );
    }

    return (
        <div className="h-full p-3">
            <Card className="md:w-2/5 md:mx-auto md:h-full divide-y overflow-hidden border-2">
                <CardHeader className={"flex flex-row items-end h-40 p-0 bg-gradient-to-r from-fuchsia-800 from-5% via-indigo-600 via-30% to-sky-500 to-90% bg-clip-border"}>
                    <div className={"text-5xl font-bold px-6 py-2 text-white"}>
                        {auth?.currentUser?.displayName}
                    </div>              
                </CardHeader>               
                <CardContent className="pt-2 gap-2">
                    <div className="flex flex-col gap-2">
                        <Alert className="">
                            <BsPerson className="h-7 w-5"/>
                            <AlertTitle className={"text-xl font-md"}>Role: 
                            <span className={"font-bold"}> {role}</span></AlertTitle>
                            <AlertDescription>                    
                                <ul className="list-disc">
                                    {itemList}
                                </ul>
                            </AlertDescription>
                        </Alert>
                        <Alert className="">
                            <CiMail className="h-7 w-5"/>
                            <AlertTitle className={"text-xl font-md"}>Email: <span
                                className={"text-md font-light"}>{auth?.currentUser?.email}</span></AlertTitle>
                        </Alert>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}