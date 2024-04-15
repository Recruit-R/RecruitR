'use client'
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export async function LoadingTable() {
    return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <Skeleton className="h-8 w-60" />
                <Skeleton className="h-8 w-24" />
            </div>
            <div className="rounded-md border">
                <div className="grid grid-cols-5 border-b px-10 py-3">
                    <Skeleton className="h-4 w-14 rounded-sm" />
                    <Skeleton className="h-4 w-14 rounded-sm" />
                    <Skeleton className="h-4 w-14 rounded-sm" />
                    <Skeleton className="h-4 w-14 rounded-sm" />
                    <Skeleton className="h-4 w-14 rounded-sm" />
                </div>

                {Array.from(Array(20).keys()).map((i) => {
                    return (
                        <div className="grid grid-cols-5 border-b px-10 py-6">
                            <Skeleton className="h-4 max-md:w-14 md:w-36 rounded-sm" />
                            <Skeleton className="h-4 max-md:w-14 md:w-36 rounded-sm" />
                            <Skeleton className="h-4 max-md:w-14 md:w-36 rounded-sm" />
                            <Skeleton className="h-4 max-md:w-14 md:w-36 rounded-sm" />
                            <Skeleton className="h-4 max-md:w-14 md:w-36 rounded-sm" />
                        </div>
                    )
                })}
                <div className="grid grid-cols-5 px-10 py-6">
                    <Skeleton className="h-4 max-md:w-14 md:w-36 rounded-sm" />
                    <Skeleton className="h-4 max-md:w-14 md:w-36 rounded-sm" />
                    <Skeleton className="h-4 max-md:w-14 md:w-36 rounded-sm" />
                    <Skeleton className="h-4 max-md:w-14 md:w-36 rounded-sm" />
                    <Skeleton className="h-4 max-md:w-14 md:w-36 rounded-sm" />
                </div>
            </div>
        </div>
    )
}
const DashboardSkeleton = () => {
    return (
        <div className="flex flex-row h-full relative">

            <div className={cn("h-full w-full bg-background p-1 md:w-3/5")}>
                <LoadingTable />
            </div>

            <div
                className={cn("no-scrollbar bg-background overflow-y-scroll overscroll-contain p-1 w-full md:w-2/5")}>
                <Card className="min-h-full flex items-center justify-center">
                    <CardContent className="flex flex-col gap-2 items-center justify-center p-0">
                        <p className="font-bold">
                            No Student Selected.
                        </p>
                        <p>
                            Loading students...
                        </p>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}

export default DashboardSkeleton