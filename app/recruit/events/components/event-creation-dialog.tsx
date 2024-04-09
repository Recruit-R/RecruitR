import { EventCreateForm } from "@/app/recruit/events/components/event-create-form";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
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
                    <DialogTitle>Create Event</DialogTitle>
                    <DialogDescription>
                        Create a new event for students to attend
                    </DialogDescription>
                </DialogHeader>
                <EventCreateForm setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    )
}
