'use client'

//manage recruiter page that allows you to add or remove recruiters if a coordinator

import { useAuth } from '@/components/auth-provider';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from '@/components/ui/use-toast';
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaTrash } from 'react-icons/fa';
import { MdOutlineMarkEmailRead, MdOutlineMarkEmailUnread } from 'react-icons/md';
import * as z from 'zod';
import { PopupDialog } from '../events/components/popup-dialog';

const AddRecruiterBar = ({ form, onSubmit, authError }: { form: any, onSubmit: any, authError: any }) => {
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-2" >
                        <div className="grid gap-1 w-1/2 mb-2"  >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="sr-only" htmlFor="email">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="email"
                                                placeholder="name@example.com"
                                                type="email"
                                                autoCapitalize="none"
                                                autoComplete="email"
                                                autoCorrect="off"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}>
                            </FormField>

                        </div>
                    </div>
                    {authError && (
                        <div className={cn("text-sm font-medium text-destructive")}>
                            {authError}
                        </div>
                    )}
                    <div className="flex">
                        <div className=" w-1/4">
                            <Button className="w-full" variant="outline" >Submit</Button>
                        </div>
                    </div>

                </form>
            </Form>
        </div>
    )
}


export default function Page() {
    const [authError, setAuthError] = useState<any>(null);
    const [recruiters, setRecruiters] = useState<any[]>([]);
    const auth = useAuth();

    const formSchema = z.object({
        email: z.string().email(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    //fetch emails from firebase whitelist
    useEffect(() => {
        const fetchrecruiterEmails = async () => {
            const response = await fetch('/api/whitelist');
            if (response.ok) {
                const data = await response.json();
                setRecruiters(data);
                console.log(data);
            }
        }
        fetchrecruiterEmails();

    }, []);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // check if recruiter exists
        const response = await fetch('/api/whitelist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth?.getAuthToken()}`,
            },
            body: JSON.stringify({ email: values.email })
        })
        if (response.ok) {
            setAuthError(null);
            toast({
                title: "Recruiter Invite Sent",
                description: "Recruiter will be added when signing up with the invite link.",
            })
            setRecruiters([...recruiters, { email: values.email }]);
            form.reset();
        } else if (response.status == 403) {
            setAuthError('Email already exists');
        } else {
            console.log('error', response);
        }
    }
    const deleteRecruiter = async (email: string) => {
        const response = await fetch('/api/whitelist', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth?.getAuthToken()}`,
            },
            body: JSON.stringify({ email: email })
        })
        if (response.ok) {
            setRecruiters(recruiters.filter((recruiter) => recruiter.email !== email));
        } else {
            console.log('error', response);
        }
    }



    const DeleteConfirmationForm = ({ recruiter, setDeleteOpen }: { recruiter: any, setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
        return (
            <div className="flex items-center justify-center">
                <Button variant="destructive" onClick={() => {
                    deleteRecruiter(recruiter.email)
                    setDeleteOpen(false);
                }}>
                    Delete Recruiter
                </Button>
            </div>
        )
    }

    const RecruiterBox = ({ recruiter }: { recruiter: any }) => {
        const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
        return (
            <div className="flex items-center justify-between hover:bg-secondary rounded-lg p-3" >
                <li className="h-10 flex flex-row gap-2 justify-between items-center w-full ">
                    <div className="flex flex-row gap-2 items-center">
                        <div>
                            <p className="text-muted-foreground text-md">{recruiter.email}</p>
                        </div>
                        {recruiter.joined ? (
                            <ToolTip content="Joined" component={<MdOutlineMarkEmailRead className='cursor-default h-5 w-5' />} />
                        ) : (
                            <ToolTip content="Not Joined" component={<MdOutlineMarkEmailUnread className='cursor-default h-5 w-5' />} />
                        )}

                    </div>
                    <PopupDialog
                        popupButton={<div><FaTrash className="hover:cursor-pointer hover:fill-destructive h-5 w-4" /></div>}
                        title={`Delete Event (${recruiter.email})`}
                        description="Are you sure you want to delete this event?"
                        dialogContent={<DeleteConfirmationForm recruiter={recruiter} setDeleteOpen={setDeleteOpen} />}
                        open={deleteOpen}
                        setOpen={setDeleteOpen}
                    />
                </li>
            </div>
        )
    }

    const ToolTip = ({ content, component }: { content: string, component: React.JSX.Element }) => {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger className={"flex"} >{component}</TooltipTrigger>
                    <TooltipContent>
                        {content}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )
    }


    return (
        <div className="flex flex-col gap-4 p-4 h-full overflow-y-scroll">
            <b>Add Recruiter</b>
            <AddRecruiterBar form={form} onSubmit={onSubmit} authError={authError} />
            <b>Recruiter List</b>
            <div>
                <div className="py-2 pl-3 w-3/4 group border rounded-lg transition-all ">
                    {recruiters.length > 0 &&
                        <>
                            {
                                recruiters.map((recruiter: any, i: number) => {
                                    return (
                                        <RecruiterBox recruiter={recruiter} key={i} />
                                    )
                                })
                            }
                        </>
                    }
                </div>
            </div>
        </div>
    )
}