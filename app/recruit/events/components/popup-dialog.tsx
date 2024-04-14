import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function PopupDialog({ popupButton, dialogContent, title, description, open, setOpen }:
    { popupButton: React.ReactNode, dialogContent: React.ReactNode, title: string, description: string, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {popupButton}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className='text-center'>
                    <DialogTitle className="text-center">
                        {title}
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                {dialogContent}
            </DialogContent>
        </Dialog>
    )
}
