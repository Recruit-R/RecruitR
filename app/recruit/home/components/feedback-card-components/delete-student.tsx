import {Button} from "@/components/ui/button.tsx";
import {TrashIcon} from "@radix-ui/react-icons";

export function DeleteStudent() {
    return (
        <Button
            className="w-64"
            variant="destructive">
            <TrashIcon className="h-4 w-4"/> Delete Student
        </Button>
    )
}