import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BsPerson } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import React from "react";

export default function Page() {
    return (
        <div className="h-full p-3">
            <Card className="md:w-2/5 md:mx-auto md:h-full divide-y">
                <CardHeader className={"flex flex-row items-end h-40 p-0 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-lg"}>
                    {/*<CardTitle className="text-4xl">*/}
                    {/*    Profile*/}
                    {/*</CardTitle>*/}
                    {/*<Avatar className="h-20 w-20">*/}
                    {/*    <AvatarImage src="/avatars/01.png" alt="Avatar"/>*/}
                    {/*    <AvatarFallback className="text-3xl"></AvatarFallback>*/}
                    {/*</Avatar>*/}
                    <div className={"text-5xl font-light px-6 py-2 text-white"}>
                        Caleb Frey
                    </div>
                </CardHeader>
                <CardContent className="pt-2 gap-2">

                    <div className="flex flex-col gap-2">
                        <Alert>
                            <BsPerson className="h-4 w-4"/>
                            <AlertTitle className={""}>Role: <span className={"font-bold"}>Coordinator</span></AlertTitle>
                            <AlertDescription>
                                As as coordinator, you can:
                                <ul className="list-disc pl-6">
                                    <li>
                                        Add Recruiters
                                    </li>
                                    <li>
                                        Change Student Feedback/Status
                                    </li>
                                    <li>
                                        Create/Manage Events
                                    </li>
                                </ul>
                            </AlertDescription>
                        </Alert>
                        <Alert>
                            <CiMail className="h-4 w-4"/>
                            <AlertTitle className={""}>Email: <span
                                className={"font-bold"}>Coordinator</span></AlertTitle>

                        </Alert>
                    </div>
                </CardContent>
            </Card>

        </div>

    )
}