'use client'
import { useEffect, useState } from "react";
import * as z from 'zod';

import { useAuth } from '@/components/auth-provider';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
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
                        <div className="grid gap-2">
                            <div className="grid gap-1">
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
                            {authError && (
                                <div className={cn("text-sm font-medium text-destructive")}>
                                    {authError}
                                </div>
                            )}

                            <Button>
                                Add
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        )
    }


    return (
        <>
            <AddRecruiterBar />
            <div className="h-full">
                <h1>recruiterEmails</h1>
                {recruiterEmails.length > 0 &&
                    <ul className="h-full">
                        {
                            recruiterEmails.map((recruiter, i) => {
                                return (
                                    <li className="h-10 flex flex-row gap-2" key={recruiter + i}>
                                        <p>{recruiter}</p>
                                        <Button onClick={() => deleteRecruiter(recruiter)}>Delete</Button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                }
            </div>
        </>
    )
}