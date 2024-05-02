'use client'

//This is the page that displays the coordinator or recruiter profile information

import Roles from "@/app/types/roles";
import { useAuth } from "@/components/auth-provider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "firebase/auth";
import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsPerson } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { RiCheckboxCircleLine } from "react-icons/ri";
import * as z from 'zod';
import { addRecruiterData, getRecruiterData } from "./actions";
import { NameChForm } from "./name-change-form";


export default function ClientComponent({ useData }: { useData: any }) {
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

    const [editMode, setEditMode] = useState<boolean>();
    const [userData, setUData] = useState<any>(useData);

    const formSchema = z.object({
        first_name: z.string().max(40, "Max length of 40 characters"),
        last_name: z.string().max(40, "Max length of 40 characters"),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: userData && userData.first_name,
            last_name: userData && userData.last_name,
        },
    })

    useEffect(() => {
        form.reset({ ...form.formState.defaultValues, ...userData })
    }, [userData])

    async function onSubmit(values: z.infer<typeof formSchema>) {

        if (auth!.currentUser) {
            await addRecruiterData(auth!.currentUser!.uid, values)
            updateProfile(auth!.currentUser!, { displayName: `${values.first_name} ${values.last_name}` })
            setUData(await getRecruiterData(auth!.currentUser!.uid))

        }

        //router.refresh()
        window.location.reload()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="h-full p-3 overflow-y-scroll">
                    <Card className="md:w-2/5 md:mx-auto md:h-full divide-y overflow-hidden border-2">

                        <CardHeader className={"flex flex-row items-end min-h-40 p-0 bg-gradient-to-r from-fuchsia-800 from-5% via-indigo-600 via-30% to-sky-500 to-90% bg-clip-border"}>

                            {(!editMode) ?
                                <>
                                    <div className={"px-6 py-3 w-full"}>
                                        <p className={"break-all text-5xl mr-3 font-bold text-white"}>{userData.first_name}</p>

                                        <p className={"break-all text-5xl font-bold text-blue-100"}>{userData.last_name}</p>
                                    </div>
                                </>
                                :
                                <>
                                    <div className={"flex flex-row"}>
                                        <NameChForm form={form}></NameChForm>
                                    </div>
                                </>

                            }
                            <div className={`flex flex-row px-2 pb-3 justify-items-center`}>
                                <Button className={`mr-2 ${!editMode && "hidden"}`} variant="ghost" type="submit">
                                    <IoMdCheckmark className="w-6 h-6" />
                                </Button>
                                <Button disabled={userData === undefined} variant="ghost" type="button" onClick={() => setEditMode(prevState => !prevState)}>
                                    {editMode ? <XIcon className={"w-6 h-6"} /> : <FaRegEdit className="h-6 w-6" />}
                                </Button>
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
                        </CardContent>
                    </Card>
                </div>
            </form>
        </Form>
    )
}