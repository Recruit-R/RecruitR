'use client'

import { Button } from "@/components/ui/button";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster"
import * as z from 'zod';
import { useToast } from "@/components/ui/use-toast";



const Reset = () => {
    const formSchema = z.object({
        email: z.string().email(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        fetch('/api/reset_email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
    }

    const { toast } = useToast()

    return (
        <>
            <div className="relative flex items-center justify-center align-center h-screen">
                <Link
                    href="/auth/signup"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute right-4 top-4 md:right-8 md:top-8"
                    )}
                >
                    Sign Up
                </Link>
                <div className="lg:p-8 w-full flex align-center">
                    <div className="m-auto flex md:w-1/4 flex-col justify-center space-y-6">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Reset Password
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email to receive a password reset link
                            </p>
                        </div>
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

                                    <Button 
                                        onClick={()=>{
                                            toast({
                                                title: "Email sent!",
                                                description: "Please check your inbox to reset your password.",
                                            })
                                        }}>
                                        {/* <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> */}
                                        Send Reset Email
                                    </Button>
                                </div>
                            </form>
                        </Form>
                        
                    </div>
                </div>
            </div>
        </>
        
    )
}

export default Reset;