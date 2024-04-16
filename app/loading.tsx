import { Icons } from "@/components/ui/icons";

export default function Loading() {
    return (
        <div className='h-full flex justify-center items-center'>
            <Icons.spinner className="h-54 w-54 animate-spin" />
        </div>
    )
}