import { Icons } from "@/components/ui/icons";

export default function Loading({ loading_name }: { loading_name?: string }) {
    return (
        <div className='h-full flex justify-center items-center'>
            <span className="text-3xl my-auto">{loading_name ? loading_name : "Loading..."}</span>
            <Icons.spinner className="h-54 w-54 animate-spin" />
        </div>
    )
}