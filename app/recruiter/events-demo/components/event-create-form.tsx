"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {    
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { create } from "@/app/recruiter/events-demo/actions"
import { DatePicker } from "@/components/ui/date-picker"

const formSchema = z.object({
    eventName: z.string().min(2, {
        message: "Event name must be at least 2 characters.",
    }),
    date: z.date(),

})

export function EventCreateForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(
            formSchema.transform((v) => ({
                eventName: v.eventName
            }))
        ),
        defaultValues: {
            eventName: "",
        },
    })

    // 2. Define a submit handler.

    function onSubmit(data: any) {
        create(JSON.stringify(data))
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="eventName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name of Event</FormLabel>
                            <FormControl>
                                <Input placeholder="Name of Event" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the name of the event.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                                <DatePicker>
                                </DatePicker>
                            </FormControl>
                            <FormDescription>
                                Enter a date for the event.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
