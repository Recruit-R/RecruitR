'use client'

//manage recruiter page that allows you to add or remove recruiters if a coordinator

import { useEffect, useState } from "react";
import * as z from 'zod';
import { useAuth } from '@/components/auth-provider';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function Page() {
    const [authError, setAuthError] = useState<any>(null);
    const [recruiterEmails, setRecruiterEmails] = useState<any[]>([]);
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
                setRecruiterEmails(data);
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
            setRecruiterEmails([...recruiterEmails, values.email]);
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
            setRecruiterEmails(recruiterEmails.filter((recruiterEmail) => recruiterEmail !== email));
        } else {
            console.log('error', response);
        }
    }

    const AddRecruiterBar = () => {
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


    return (
        <>
            <div className="flex flex-col gap-4 p-4 ">
                <b>Add Recruiter</b>
                <AddRecruiterBar />
                <b>Recruiter List</b>
                <div className="h-full">
                    <div className="py-2 pl-3 w-3/4 group border rounded-lg transition-all">
                        {recruiterEmails.length > 0 &&
                            <ul className="h-full">
                                {
                                    recruiterEmails.map((recruiter, i) => {
                                        return (
                                            <div key={i} className="flex items-center justify-between hover:bg-secondary rounded-lg p-3" >
                                                <li className="h-10 flex flex-row gap-2 justify-between items-center w-full " key={recruiter + i}>
                                                    <div className="group transition-all">
                                                        <p className="font-bold">Recruiter Name</p>
                                                        <p className="text-muted-foreground">{recruiter}</p>
                                                    </div>
                                                    <Button onClick={() => deleteRecruiter(recruiter)} variant="ghost" className="hover:bg-destructive">
                                                        <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                                                    </Button>
                                                </li>
                                            </div>
                                        )
                                    })
                                }
                            </ul>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}