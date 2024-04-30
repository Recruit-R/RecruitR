"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input";

export function HeaderForm({form, isParsing}:{form: any, isParsing: boolean}) {
    

    return (
        // <Form {...form}>
        // <form className={cn("grid items-start gap-4", className)} onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col sm:flex-row pt-2 sm:pt-0 space-y-2 sm:space-y-0 sm:space-x-4'>
        <FormField disabled= {isParsing} control={form.control} name = "first_name" 
        render = {({field}) => (

            <>
            <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                    <Input id="first_name"
                    placeholder=""
                    autoCapitalize="none"
                    autoComplete='given_name'
                    {...field}/>
                </FormControl>
                {!isParsing && <FormMessage className="text-center" />}
            </FormItem>
            </>
            
        )}></FormField>
        
        <FormField disabled={isParsing} control={form.control} name = "last_name" 
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
                {!isParsing && <FormMessage className="text-center" />}
            </FormItem>
            </>
            
        )}></FormField>
        </div>

   )
}