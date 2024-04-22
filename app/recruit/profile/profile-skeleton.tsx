import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
    return (
        <div className="h-full p-3">
            <Card className="md:w-2/5 md:mx-auto md:h-full divide-y overflow-hidden border-2">

                <CardHeader className={"flex flex-row items-end h-40 p-0 bg-gradient-to-r from-fuchsia-800 from-5% via-indigo-600 via-30% to-sky-500 to-90% bg-clip-border"}>
                    <div className="flex flex-row px-2 pb-3 justify-items-center justify-between w-full items-center">
                        <Skeleton className="w-64 h-10" />
                        <Skeleton className="w-8 h-10" />
                    </div>
                </CardHeader>

                <CardContent className="pt-2 gap-2">
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-20 w-100 mt-2" />
                        <Skeleton className="h-20 w-100" />
                        <Skeleton className="h-20 w-100" />
                        <Skeleton className="h-20 w-100" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}