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
import { BsGithub, BsMicrosoft } from "react-icons/bs";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
    signup: boolean;
}

export function UserAuthForm({ className, signup, ...props }: UserAuthFormProps) {
    const formSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: signup ? z.string().min(6) : z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })


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

    const AuthFormField = ({ id, type, placeholder, autoComplete, label }: { id: any, type: string, placeholder: string, autoComplete: string, label: string }) => {
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


    const auth = useAuth();

    function onSubmit(values: z.infer<typeof formSchema>) {
        // verify auth is available
        if (auth === null) {
            console.error("Auth not available");
            return;
        }

        if (signup) {
            auth.createAccountEmail({ name: values.name, email: values.email, password: values.password });
        } else {
            auth.loginEmail({ email: values.email, password: values.password });
        }
    }

    return (
        <div className='grid gap-2' {...props}>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-1">
                        <div className="grid mb-1">
                            {signup && (
                                <AuthFormField id="name" type="text" placeholder="Name" autoComplete="name" label="Name" />
                            )}
                            <AuthFormField id="email" type="email" placeholder="Email" autoComplete="email" label="Email" />
                            <AuthFormField id="password" type="password" placeholder="Password" autoComplete="current-password" label="Password" />
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

            {auth!.error && (
                <div className={cn("text-sm font-medium text-destructive")}>
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

            <OAuthButton authType={auth!.loginGoogle} authTitle="Google" Logo={Icons.google} />
            <OAuthButton authType={auth!.loginGithub} authTitle="Github" Logo={BsGithub} />
            <OAuthButton authType={auth!.loginMicrosoft} authTitle="Microsoft" Logo={BsMicrosoft} />
        </div>
    )
}