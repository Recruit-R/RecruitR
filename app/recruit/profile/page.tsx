'use client'

import addData from "@/app/api/addData";
//This is the page that displays the coordinator or recruiter profile information

import getData from "@/app/api/getData";
import Roles from "@/app/types/roles";
import { useAuth } from "@/components/auth-provider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { BsPerson } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import { RiCheckboxCircleLine } from "react-icons/ri";


export default function Page() {
    const [field, setField] = useState<string>("");

    const auth = useAuth();


    let itemList;
    //if logged in as a coordinator display this list of permissions
    if (auth?.userRole === Roles.COORDINATOR) {
        itemList = (
            <>
                <div className="flex items-center">
                    <RiCheckboxCircleLine className="mr-2 h-5 w-5 text-md text-md" />
                    <span className={"text-md text-md"}>Add Recruiters</span>
                </div>
                <div className="flex items-center">
                    <RiCheckboxCircleLine className="mr-2 h-5 w-5" />
                    <span>Change Student Feedback</span>
                </div>
                <div className="flex items-center">
                    <RiCheckboxCircleLine className="mr-2 h-5 w-5" />
                    <span>Change Student Status</span>
                </div>
                <div className="flex items-center">
                    <RiCheckboxCircleLine className="mr-2 h-5 w-5" />
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
                    <RiCheckboxCircleLine className="mr-2 h-5 w-5" />
                    <span>Change Student Feedback</span>
                </div>
                <div className="flex items-center">
                    <MdOutlineCancel className="mr-2 h-5 w-5" />
                    <span>Change Student Status</span>
                </div>
                <div className="flex items-center">
                    <RiCheckboxCircleLine className="mr-2 h-5 w-5" />
                    <span>Create/Manage Events</span>
                </div>
            </>
        );
    }

    async function deleteFieldFromAllStudents() {
        const students = await getData({
            collection_name: 'users', filter: {
                field: 'role',
                operator: (a: string, b: string) => a === b,
                value: Roles.CANDIDATE
            }
        })
        for (let student of students) {
            const feedback = student.feedback;
            const newFeedback: { [k: string]: any } = {};
            for (let key in feedback) {
                const recruiterfeedback = feedback[key];
                recruiterfeedback[field] = null;
                newFeedback[key] = recruiterfeedback;
            }
            addData("users", student.id, { feedback: newFeedback })
        }
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
                            <BsPerson className="h-7 w-5" />
                            <AlertTitle className={"text-xl font-md"}>Role:
                                <span className={"font-bold"}> {auth?.userRole}</span></AlertTitle>
                            <AlertDescription>
                                <ul className="list-disc">
                                    {itemList}
                                </ul>
                            </AlertDescription>
                        </Alert>
                        <Alert className="">
                            <CiMail className="h-7 w-5" />
                            <AlertTitle className={"text-xl font-md"}>Email: <span
                                className={"text-md font-light"}>{auth?.currentUser?.email}</span></AlertTitle>
                        </Alert>
                    </div>
                    <Input placeholder="field to delete" onChange={(e) => setField(e.target.value)} />

                    <Button onClick={() => deleteFieldFromAllStudents()}>
                        delete {field} from all students
                    </Button>
                </CardContent>
            </Card>

        </div>
    )
}