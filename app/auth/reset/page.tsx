"use client"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from 'zod';


const ResetPage = () => {
    const router = useRouter();
    const formSchema = z.object({
        email: z.string().email(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <div className="flex justify-center items-center h-full">
            <div className='grid gap-6 md:w-1/5'>
                <h1 className='text-center text-5xl'>Reset Password</h1>
                <p className='text-center text-muted-foreground -mb-4'>Enter your email below to reset your password</p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-2">
                            <div className="grid gap-10">
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
                            <div className='flex justify-center'>
                                <Button className="w-2/3 mt-2">
                                    Send Password Reset Email
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
                <Link href="/auth/login" className='text-center -mt-2'>
                    <span className="text-sm opacity-80 hover:opacity-90 text-primary ease-in-out duration-100">Back to login</span>
                </Link>
            </div>
        </div>
    )
}

export default ResetPage