"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { create } from "@/app/recruit/events/actions"
import { DatePicker } from "@/components/ui/date-picker"
import { DialogClose } from "@/components/ui/dialog"
import { useContext } from "react"
import { EventDataContext, EventDataContextType } from "./client-component"

const formSchema = z.object({
    eventName: z.string().min(2, {
        message: "Event name must be at least 2 characters.",
    }),
    date: z.date(),
    location: z.string().min(2, {
        message: "Location name must be at least 2 characters.",
    }),

})

export function EventCreateForm({setOpen} : {setOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
    const { refresh } = useContext(EventDataContext) as EventDataContextType
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(
            formSchema.transform((v) => ({
                Title: v.eventName,
                Time: v.date,
                Location: v.location
            }))
        ),
        defaultValues: {
            eventName: "",
            location: "",
        },
    })

    function onSubmit(data: any) {
        create(JSON.stringify(data)).then((e) =>
            {refresh()}
        )
        setOpen(false);
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
                            <FormLabel>Date<br></br></FormLabel>
                            
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                        "w-[240px] pl-3 text-left font-normal",
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
                            
                            <FormDescription>
                                Enter a date for the event.
                            </FormDescription>
                            <FormMessage />
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
                            <FormDescription>
                                This is where the event will take place.
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
