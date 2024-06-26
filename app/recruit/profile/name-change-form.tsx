"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input";

export function NameChForm(form: any, { className }: React.ComponentProps<"form">) {
    

    return (
        // <Form {...form}>
        // <form className={cn("grid items-start gap-4", className)} onSubmit={form.handleSubmit(onSubmit)}>
        <div className='pl-3 pb-3 flex flex-row gap-3'>
        <FormField control={form.control} name = "first_name" 
        render = {({field}) => (
            <>
            <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                    <Input id="first_name"
                    placeholder=""
                    autoCapitalize="none"
                    {...field}/>
                </FormControl>
                <FormMessage/>
            </FormItem>
            </>
        )}></FormField>
        
        <FormField control={form.control} name = "last_name" 
        render = {({field}) => (
            <>
            <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                    <Input id="last_name"
                    placeholder=""
                    autoCapitalize="none"
                    {...field}/>
                </FormControl>
                <FormMessage/>
            </FormItem>
            </>
            
        )}></FormField>
        </div>

   )
}