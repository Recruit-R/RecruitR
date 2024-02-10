import * as React from "react"

import { cn } from "@/lib/utils"
import useScreenWidth from "@/hooks/use-screen-width"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PersonalDrawerDialog() {
  const isDesktop = useScreenWidth()

  if (isDesktop >= 768) {
    return (
      <Dialog>
        <DialogTrigger asChild>
            <div className="cursor-pointer pb-3 absolute inset-0 bg-secondary rounded-lg -m-3 opacity-50" onClick={(e) => console.log("CLICK!")}/>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
      <div className="cursor-pointer pb-3 absolute inset-0 bg-secondary rounded-lg -m-3 opacity-50" onClick={(e) => console.log("CLICK!")}/>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
        <div className="grid gap-2">
            <Label>Year</Label>
            <Input id="year" defaultValue="Year" />
        </div>

        <div className="grid gap-2">
            <Label>Major</Label>
            <Input id="major" defaultValue="Major" />
        </div>

        <div className="grid gap-2">
            <Label>University</Label>
            <Input id="uni" defaultValue="University" />
        </div>

        <div className="grid gap-2">
            <Label>GPA</Label>
            <Input id="gpa" defaultValue="No Value" />
        </div>
        
        <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" defaultValue="email@domain" />
        </div>
        
        <Button type="submit">Save changes</Button>
    </form>
  )
}
