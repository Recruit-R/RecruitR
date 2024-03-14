import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusIcon } from "lucide-react";
import { EventCreateForm } from "@/app/recruit/events/components/event-create-form";
import { useState } from "react";

export function EventCreationDialog() {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline"><PlusIcon />Create Event</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <EventCreateForm setOpen={setOpen} />
                {/*<DialogFooter>*/}
                {/*    <Button type="submit">Save changes</Button>*/}
                {/*</DialogFooter>*/}
            </DialogContent>
        </Dialog>
    )
}
