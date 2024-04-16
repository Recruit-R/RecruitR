"use client"

import addData from '@/app/api/addData'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Calendar as CalendarIcon } from "lucide-react"
import React, { useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { EventDataContext, EventDataContextType } from "./client-component"

import { Event } from "@/app/types/event"
import { TimePicker } from "@/components/ui/time-picker"
import { format } from 'date-fns'

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Event title must be at least 2 characters.",
    }),
    date: z.date(),
    location: z.string().min(2, {
        message: "location name must be at least 2 characters.",
    }),
    id: z.string().optional()
})

export function EventManagementForm({ event, isCreating, setOpen }: { event?: Event, isCreating: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { events, setEvents } = useContext(EventDataContext) as EventDataContextType
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(
            formSchema.transform((v) => ({
                title: v.title,
                date: v.date,
                location: v.location,
                id: event?.id
            }))
        ),
        defaultValues: {
            title: "",
            location: "",
            id: event?.id,
        },
    })

    function onSubmit(alteredEvent: Event) {
        addData("events", alteredEvent?.id ? alteredEvent?.id : Date.now().toString(), { ...alteredEvent, date: alteredEvent.date.toISOString() })
            .then(() => {
                if (isCreating) {
                    setEvents([...events, alteredEvent])
                } else {
                    setEvents(events.map((e: Event) => e.id === event?.id ? alteredEvent : e));
                }
            })
        setOpen(false);
    }

    useEffect(() => {
        if (event) {
            form.setValue('title', event.title)
            form.setValue('date', event.date)
            form.setValue('location', event.location)
        }
    }, [event])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name of Event</FormLabel>
                            <FormControl>
                                <Input placeholder={"Title of Event"} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date<br /></FormLabel>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >

                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}

                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }: { field: any }) => (
                        <FormItem>
                            <FormLabel>Time<br /></FormLabel>
                            <FormControl>
                                <TimePicker date={field.value ?? new Date()} setDate={field.onChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input placeholder="Location" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='flex justify-center'>
                    <Button type="submit" className='w-full'>Submit</Button>
                </div>
            </form>
        </Form >

    )
}
