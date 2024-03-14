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

export function HeaderDrawerDialog() {
  const isDesktop = useScreenWidth()

  if (isDesktop && isDesktop >= 768) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div className="cursor-pointer pb-3 absolute inset-0 bg-secondary rounded-lg -m-3 opacity-50" onClick={(e) => console.log("CLICK!")} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done.
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
            Make changes to your personal info here. Click save when you&apos;re done.
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
  const fileRef = React.useRef<HTMLInputElement | null>(null);
  let [file, setFile] = React.useState();
  const handleChange = (event: any) => {
    setFile(event.target.files[0]);
  };
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label>First Name</Label>
        <Input id="year" defaultValue="" />
      </div>

      <div className="grid gap-2">
        <Label>Last Name</Label>
        <Input id="year" defaultValue="" />
      </div>

      <div className="grid gap-2">
        <Label>Major</Label>
        <Input id="major" defaultValue="Major" />
      </div>

      <div className="grid gap-2">
        <Label>Profile Image</Label>
        <Input className="cursor-pointer" id="profile_pic" name="p_pic" type="file" ref={fileRef} hidden
          onChange={handleChange} />
      </div>



      <Button type="submit">Save changes</Button>
    </form>
  )
}
