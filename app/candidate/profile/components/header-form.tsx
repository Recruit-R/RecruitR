"use client"

import { useEffect, useState } from "react";


import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function HeaderForm(form: any, { className }: React.ComponentProps<"form">) {
    

    return (
        // <Form {...form}>
        // <form className={cn("grid items-start gap-4", className)} onSubmit={form.handleSubmit(onSubmit)}>
        <>
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
            </FormItem>
            </>
            
        )}></FormField>
        </>

   )
}