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
    let itemList;
    if (booleanCoordinator) {
        itemList = (
            <>
                 <div className="flex items-center">
                 <RiCheckboxCircleLine  className="mr-2 h-5 w-5 text-md text-md" />
                    <span className={"text-md text-md"}>Add Recruiters</span>
                </div>
                <div className="flex items-center">
                <MdOutlineCancel  className="mr-2 h-5 w-5" />
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
                 <MdOutlineCancel className="mr-2" />
                    <span>Add Recruiters</span>
                </div>
                <div className="flex items-center">
                    <IoCheckboxOutline className="mr-2" />
                    <span>Change Student Feedback</span>
                </div>
                <div className="flex items-center">
                    <IoCheckboxOutline className="mr-2" />
                    <span>Change Student Status</span>
                </div>
                <div className="flex items-center">
                    <MdOutlineCancel className="mr-2" />
                    <span>Create/Manage Events</span>
                </div>
                        
            </>
        );
    }


    return (
        <div className="flex h-full">
           <div className=" w-1/4 h-full bg-gradient-to-r from-fuchsia-800 from-5% via-indigo-600 via-30% to-sky-500 to-90%">
               hi
                
           </div>
           <div className= " w-3/4 h-full bg-stone-400"> 
            <h1 className= "text-2xl font-bold p-10  ">Information</h1>
           </div>
            
        </div>

    )
}