"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export function AboutMeForm(form: any, { className }: React.ComponentProps<"form">) {
    return (
      // <form className={cn("grid items-start gap-4", className)}>
      //   <div className="grid gap-2">
      //     <Textarea className="resize-y"></Textarea>
      //   </div>
        
      // </form>

      // <FormField control={form.control} name = "AboutMe" 
      //   render = {({field}) => (

      //       <>
      //           <FormItem>
      //           <FormLabel></FormLabel>
      //           <FormControl>
      //             <Input id= "aboutme" placeholder=""
      //               autoCapitalize="none"
      //               {...field}></Input>
      //           </FormControl>
      //       </FormItem>
      //       </>
            
      //   )}></FormField>
      <FormField control={form.control} name = "about_me" 
        render = {({field}) => (

            <>
                <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                    <Textarea id="about_me"
                    placeholder=""
                    autoCapitalize="none"
                    {...field}/>
                </FormControl>
            </FormItem>
            </>
            
        )}></FormField>
    )
  }
  