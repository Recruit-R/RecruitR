"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils"
import {    
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

//ask about this
import { create } from "@/app/recruit/events/actions"

const recruiterProfileSchema = z.object({
    firstName: z.string().min(1, {
        message: "first name must be at least 1 character",
    }),
    lastName: z.string().min(1, {
        message: "last name must be at least 1 character",
    }),
    email: z.string(),
    phoneNumber: z.string(),
    oldPassword: z.string(),
    newPassword: z.string(),
    confirmPassword: z.string(),
})

export function RecruiterProfileForm({setOpen} : {setOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
    //const { refresh } = useContext(EventDataContext) as EventDataContextType
    //make this 
    const form = useForm<z.infer<typeof recruiterProfileSchema>>({
        resolver: zodResolver(
            recruiterProfileSchema.transform((v) => ({
                FirstName: v.firstName,
                LastName: v.lastName,
                Email: v.email,
                OldPassword: v.oldPassword,
                NewPassword: v.newPassword,
                ConfirmPassword: v.confirmPassword,
            }))
        ),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    })
    function onSubmit(data: any) {
        create(JSON.stringify(data)).then(() =>
            {refresh()}
        )
        setOpen(false);
    }
    function refresh() {
        throw new Error("Function not implemented.")
    }
    
    return (
        <Form {...form}>
            <Button type="submit">Save</Button>
            <Button type="submit">Cancel</Button>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                    control={form.control}
                    name ="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First name</FormLabel>
                            <FormControl>
                                <Input className="w-1/3 p-2" placeholder="first name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last name</FormLabel>
                            <FormControl>
                                <Input className="w-1/3 p-2" placeholder="last name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                  <FormField
                    control={form.control}
                    name ="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input className="w-1/3 p-2" placeholder="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                  <FormField
                    control={form.control}
                    name ="oldPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Old Password</FormLabel>
                            <FormControl>
                                <Input className="w-1/3 p-2" placeholder="old password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name ="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input className="w-1/3 p-2" placeholder="new password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name ="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input className="w-1/3 p-2" placeholder="confirm password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />             
            </form>
        </Form>
    )
}
