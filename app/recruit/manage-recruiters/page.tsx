'use client'
import { useEffect, useState } from "react";
import * as z from 'zod';

//recruit manager-recruiter

import { useAuth } from '@/components/auth-provider';
import { Button } from "@/components/ui/button";
import {
    Card
} from "@/components/ui/card";
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
        console.log(values);
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
            console.log('success');
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
            console.log('success');
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

                    <div className="py-2 pl-3 w-3/4 group hover:rounded border border-gray-200 bg-gray-white rounded-lg transition-all">
                        {recruiterEmails.length > 0 &&
                            <ul className="h-full">
                                {
                                    recruiterEmails.map((recruiter, i) => {
                                        return (
                                            <Card key={i} className="flex items-center justify-between hover:bg-secondary mb-2 mt-2 mr-3" >
                                                <li className="h-10 flex flex-row gap-2  justify-between w-full " key={recruiter + i}>
                                                    <div className="py-2 pl-3 group hover:rounded-lg transition-all">
                                                        <p>{recruiter}</p>
                                                    </div>
                                                    <div>
                                                        <Button onClick={() => deleteRecruiter(recruiter)} style={{ backgroundColor: 'transparent ' }}>
                                                            <FontAwesomeIcon icon={faTrash} style={{ color: 'black' }} />
                                                        </Button>
                                                    </div>
                                                </li>
                                            </Card>
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