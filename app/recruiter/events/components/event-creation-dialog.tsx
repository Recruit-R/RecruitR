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
import {PlusIcon} from "lucide-react";
import {EventCreateForm} from "@/app/recruiter/events/components/event-create-form";


export function EventCreationDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"><PlusIcon />Create Event</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <EventCreateForm />
                {/*<DialogFooter>*/}
                {/*    <Button type="submit">Save changes</Button>*/}
                {/*</DialogFooter>*/}
            </DialogContent>
        </Dialog>
    )
}
