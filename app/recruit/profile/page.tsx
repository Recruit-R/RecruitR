'use client'

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BsPerson } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { IoCheckboxOutline } from "react-icons/io5";
import React from "react";
import { useAuth } from "@/components/auth-provider";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";
//import { getCurrentUser } from "@/components/auth-provider"; // Import the function to get the current user
import { refresh } from "@/components/auth-provider"; 

export default function Page() {

    const auth = useAuth();
    const currentUser = auth!.currentUser;
    const booleanCoordinator = auth!.isCoordinator;
    let role;
    if (booleanCoordinator) {
        role = "Coordinator";
    } else {
        role = "Recruiter"; 
    }

    
    // Define the list of items based on the booleanCoordinator flag
    //MdOutlineCancel
    let itemList;
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
                    {/*<CardTitle className="text-4xl">*/}
                    {/*    Profile*/}
                    {/*</CardTitle>*/}
                    {/*<Avatar className="h-20 w-20">*/}
                    {/*    <AvatarImage src="/avatars/01.png" alt="Avatar"/>*/}
                    {/*    <AvatarFallback className="text-3xl"></AvatarFallback>*/}
                    {/*</Avatar>*/}
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