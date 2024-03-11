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
import { Textarea } from "@/components/ui/textarea"

export function AboutMeDrawerDialog() {
  const isDesktop = useScreenWidth()

  if (isDesktop && isDesktop >= 768) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div className="cursor-pointer pb-3 absolute inset-0 bg-secondary rounded-lg -m-3 opacity-50" onClick={(e) => console.log("CLICK!")} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit &apos;About Me&apos;</DialogTitle>
            <DialogDescription>
              Make changes to your &apos;About Me&apos; here. Click save when you&apos;re done.
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
        <div className="cursor-pointer pb-3 absolute inset-0 bg-secondary rounded-lg -m-3 opacity-50" onClick={(e) => console.log("CLICK!")} />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you&apos;re done.
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
        <Label htmlFor="email">About Me</Label>
        <Textarea className="resize-y"></Textarea>
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  )
}
