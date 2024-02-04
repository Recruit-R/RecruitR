"use client"

import { useEffect, useState } from "react";
import * as z from 'zod';

import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
    signup: boolean;
}

export function UserAuthForm({ className, signup, ...props }: UserAuthFormProps) {
    const [authSuccessful, setAuthSuccessful] = useState<boolean>(true);
    const [authError, setAuthError] = useState<any>(null);
    const router = useRouter();
    const formSchema = z.object({
        email: z.string().email(),
        password: signup ? z.string().min(6) : z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const LoginFailure = () => {
        return (
            <div className='text-center'>
                <span>Incorrect email or password. <br />Try again or </span>
                <Link className='underline' href="/auth/signup" >
                    sign up instead
                </Link>
            </div>
        )
    }

    const SignupFailure = () => {
        return (
            <div className='text-center'>
                <span>An account with this email already exists. <br /> Please </span>
                <Link className='underline' href="/auth/login" >
                    login instead
                </Link>
            </div>
        )
    }

    const auth = useAuth();

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log('submitting', values);
        if (signup) {
            console.log('creating account');
            auth?.createAccountEmail({ email: values.email, password: values.password }).then(() => {
                console.log('logged in');
            }).catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    setAuthError(SignupFailure);
                } else {
                    setAuthError("There was an error when creating the account, please try again.");
                }
                setAuthSuccessful(false);
            });
        } else {
            auth?.loginEmail({ email: values.email, password: values.password }).then(() => {
                console.log('logged in');
            }).catch((error) => {
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                    setAuthError(LoginFailure);
                } else {
                    setAuthError("There was an error when logging in, please try again.");
                }
                setAuthSuccessful(false);
                console.log(error);
            });
        }
    }

    useEffect(() => {
        if (!auth?.isLoading && auth?.currentUser) {
            if (auth?.isCoordinator || auth?.isRecruiter) {
                router.push('/recruiter/home');
            } else {
                router.push('/candidate/home');
            }
        }
    }, [auth?.isLoading])

    return (
        <div className='grid gap-6 h-full' {...props}>

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
                                                disabled={auth?.isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                        {signup && <FormMessage className="text-center" />}

                                    </FormItem>
                                )}>
                            </FormField>

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="sr-only" htmlFor="email">
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="password"
                                                placeholder="password"
                                                type="password"
                                                autoCapitalize="none"
                                                disabled={auth?.isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                        {signup && <FormMessage className="text-center" />}

                                    </FormItem>
                                )}>
                            </FormField>

                        </div>

                        <Button disabled={auth?.isLoading}>
                            {auth?.isLoading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {signup ? 'Sign up' : 'Login'}
                        </Button>
                    </div>
                </form>
            </Form>
            {!authSuccessful && (
                <div className={cn("text-sm font-medium text-destructive")}>
                    {authError}
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

            <Button
                variant="outline"
                type="button"
                disabled={auth?.isLoading}
                onClick={() => {
                    auth?.loginGoogle().then(() => {
                        console.log('logged in');
                    }).catch((error) => {
                        console.log(error);
                    });
                }}
                className='w-full'>
                {auth?.isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Icons.google className="mr-2 h-4 w-4" />
                )}{" "}
                Google
            </Button>
        </div>
    )
}