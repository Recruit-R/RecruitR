'use client'
import { useState } from "react";
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

    async function onSubmit(values: z.infer<typeof formSchema>) {
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
            form.reset();
        } else if (response.status == 403) {
            setAuthError('Email already exists');
        } else {
            console.log('error', response);
        }
    }

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