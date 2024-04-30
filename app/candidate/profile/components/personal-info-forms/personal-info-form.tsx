"use client"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ComboboxYear } from "../combo-box-years"

export function PersonalForm({form, canData, isParsing}: {form:any, canData: any, isParsing: boolean}) {

    return (

    <>
        <FormField disabled={isParsing} control={form.control} name = "year" 
            render = {({field}) => (

            <>
            <FormItem>
                <FormLabel>Year</FormLabel>
                    <br/>
                <FormControl id='year'>
                    <ComboboxYear form = {form} field = {field} isParsing = {isParsing}/>
                </FormControl>
                {!isParsing && <FormMessage className="text-center" />}
            </FormItem>
            </>
            
        )}></FormField>

        <FormField disabled={isParsing} control={form.control} name = "major" 
        render = {({field}) => (
            <>
                <FormItem>
                <FormLabel>Major</FormLabel>
                <FormControl>
                    <Input id="major"
                    placeholder={canData && canData.major}
                    autoCapitalize="none"
                    {...field}/>
                </FormControl>
                {!isParsing && <FormMessage className="text-center" />}
            </FormItem>
            
            </>
            
        )}></FormField>

        <FormField disabled={isParsing} control={form.control} name = "university" 
        render = {({field}) => (
            <>
                <FormItem>
                <FormLabel>University</FormLabel>
                <FormControl>
                    <Input id="university"
                    placeholder={canData && canData.university}
                    autoCapitalize="none"
                    {...field}/>
                </FormControl>
                {!isParsing && <FormMessage className="text-center" />}
            </FormItem>
            </>
            
        )}></FormField>

        <FormField disabled={isParsing} control={form.control} name = "gpa" 
        render = {({field}) => (
            <>
                <FormItem>
                <FormLabel>GPA</FormLabel>
                <FormControl>
                    <Input id="gpa"
                    placeholder={canData && (canData.gpa ? canData.gpa : 0)}
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
  