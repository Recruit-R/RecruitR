"use client"

import * as z from 'zod';

import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import microsoft icon
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsGithub, BsMicrosoft } from "react-icons/bs";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
    signup: boolean;
}

export const AuthFormField = ({ id, type, placeholder, autoComplete, label, form, signup, auth }: { id: any, type: string, placeholder: string, autoComplete: string, label: string, form: any, signup: any, auth: any }) => {
    return (
        <FormField
            control={form.control}
            name={id}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="sr-only" htmlFor={id}>
                        {label}
                    </FormLabel>
                    <FormControl>
                        <Input
                            id={id}
                            placeholder={placeholder}
                            type={type}
                            autoCapitalize="none"
                            autoComplete={autoComplete}
                            autoCorrect="off"
                            disabled={auth?.isLoading}
                            {...field}
                        />
                    </FormControl>
                    {signup && <FormMessage className="text-center" />}

                </FormItem>
            )}>
        </FormField>
    )
}

export function UserAuthForm({ className, signup, ...props }: UserAuthFormProps) {
    const [recruitLogin, setRecruitLogin] = useState<boolean>(false);
    const auth = useAuth();
    const formSchema = z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        password: signup ? z.string().min(6) : z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
    })

    useEffect(() => {
        if (auth?.error) {
            auth.setError(null);
        }
    }, [])


    const OAuthButton = ({ authType, authTitle, Logo }: { authType: () => Promise<void>, authTitle: string, Logo: React.ElementType }) => {
        return (
            <Button
                variant="outline"
                type="button"
                disabled={auth?.isLoading}
                onClick={() => authType()}
                className='w-full'
            >
                {auth?.isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Logo className="mr-2 h-4 w-4" />
                )}{" "}
                {authTitle}
            </Button>
        )
    }



    function onSubmit(values: z.infer<typeof formSchema>) {
        // verify auth is available
        if (auth === null) {
            console.error("Auth not available");
            return;
        }

        if (signup) {
            auth.createAccountEmail({ firstName: values.firstName, lastName: values.lastName, email: values.email, password: values.password });
        } else {
            auth.loginEmail({ email: values.email, password: values.password });
        }
    }

    return (
        <>
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    {recruitLogin ? "Recruiter" : "Student"} Sign {signup ? "Up" : "In"}
                </h1>
                {
                    !recruitLogin && (
                        <p className="text-sm text-muted-foreground">
                            Enter an email and password below to {signup ? "create an account" : "login"}.
                        </p>
                    )
                }
            </div>
            <div className='grid gap-2' {...props}>

                {!recruitLogin && (
                    <>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="grid gap-1">
                                    <div className="grid mb-1">
                                        {signup && (
                                            <>
                                                <AuthFormField id="firstName" type="text" placeholder="First Name" autoComplete="given-name" label="First Name" form={form} signup={signup} auth={auth} />
                                                <AuthFormField id="lastName" type="text" placeholder="Last Name" autoComplete="family-name" label="Last Name" form={form} signup={signup} auth={auth} />
                                            </>
                                        )}
                                        <AuthFormField id="email" type="email" placeholder="Email" autoComplete="email" label="Email" form={form} signup={signup} auth={auth} />
                                        <AuthFormField id="password" type="password" placeholder="Password" autoComplete="current-password" label="Password" form={form} signup={signup} auth={auth} />
                                    </div>

                                    <Button disabled={auth?.isLoading}>
                                        {auth?.isLoading && (
                                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        {signup ? 'Sign up' : 'Login'}
                                    </Button>
                                    {!signup && (
                                        <div className="flex flex-col">
                                            <Button asChild variant={"link"}>
                                                <Link href="/auth/reset" target="_blank">Forgot password?</Link>
                                            </Button>
                                        </div>
                                    )
                                    }
                                </div>
                            </form>
                        </Form>

                        {auth!.error && (
                            <div className={cn("text-sm font-medium text-destructive text-center")}>
                                {auth!.error}
                            </div>
                        )}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                    </>
                )}



                {recruitLogin ? (
                    <OAuthButton authType={auth!.loginMicrosoft} authTitle="Microsoft" Logo={BsMicrosoft} />
                ) : (
                    <>
                        <OAuthButton authType={auth!.loginGoogle} authTitle="Google" Logo={Icons.google} />
                        <OAuthButton authType={auth!.loginGithub} authTitle="Github" Logo={BsGithub} />
                    </>
                )}

                {recruitLogin && auth!.error && (
                    <div className={cn("text-sm font-medium text-destructive text-center")}>
                        {auth!.error}
                    </div>
                )}

                <div className="flex flex-row justify-center items-center">
                    <span className="text-sm -mr-2">
                        Not a {recruitLogin ? "recruiter" : "student"}?
                    </span>
                    <Button asChild variant={"link"} onClick={() => setRecruitLogin(!recruitLogin)}>
                        <Link href="#">Sign {signup ? "up" : "in"} as a {recruitLogin ? "student" : "recruiter"}</Link>
                    </Button>
                </div>
            </div >


        </>


    )
}