"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ComboboxYear } from "../combo-box-years"

export function PersonalForm(form: any, {can_data}: {can_data: any}) {
    console.log(can_data)
    return (
    //   <form className={cn("grid items-start gap-4", className)}>
    //     <div className="grid gap-2">
    //         <Label>Year</Label>
    //         <Input id="year" defaultValue="Year" />
    //     </div>

    //     <div className="grid gap-2">
    //         <Label>Major</Label>
    //         <Input id="major" defaultValue="Major" />
    //     </div>

    //     <div className="grid gap-2">
    //         <Label>University</Label>
    //         <Input id="uni" defaultValue="University" />
    //     </div>

    //     <div className="grid gap-2">
    //         <Label>GPA</Label>
    //         <Input id="gpa" defaultValue="No Value" />
    //     </div>
        
    //     <div className="grid gap-2">
    //         <Label htmlFor="email">Email</Label>
    //         <Input type="email" id="email" defaultValue="email@domain" />
    //     </div>
        
    //   </form>
    <>
        <FormField control={form.control} name = "year" 
        render = {({field}) => (

            <>
            <FormItem>
                <FormLabel>Year</FormLabel>
                <br/>
                <ComboboxYear form = {form} field = {field}/>
            </FormItem>
            </>
            
        )}></FormField>

        <FormField control={form.control} name = "major" 
        render = {({field}) => (
            <>
                <FormItem>
                <FormLabel>Major</FormLabel>
                <FormControl>
                    <Input id="major"
                    placeholder={can_data ? can_data.major : ""}
                    autoCapitalize="none"
                    {...field}/>
                </FormControl>
            </FormItem>
            </>
            
        )}></FormField>

        <FormField control={form.control} name = "university" 
        render = {({field}) => (
            <>
                <FormItem>
                <FormLabel>University</FormLabel>
                <FormControl>
                    <Input id="university"
                    placeholder={can_data ? can_data.university : ""}
                    autoCapitalize="none"
                    {...field}/>
                </FormControl>
            </FormItem>
            </>
            
        )}></FormField>

        <FormField control={form.control} name = "gpa" 
        render = {({field}) => (
            <>
                <FormItem>
                <FormLabel>GPA</FormLabel>
                <FormControl>
                    <Input id="gpa"
                    placeholder={can_data ? can_data.gpa : 0}
                    {...field}/>
                </FormControl>
            </FormItem>
            </>
            
        )}></FormField>

        {/* <FormField control={form.control} name = "email" 
        render = {({field}) => (
            <>
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input id="email"
                    placeholder=""
                    typeof="email"
                    autoCapitalize="none"
                    {...field}/>
                </FormControl>
            </FormItem>
            </>
            
        )}></FormField> */}
        </>
    )
  }
  