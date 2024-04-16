import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const CandidateSkeleton = () => {
    return (
        <div className="flex flex-col md:flex-row md:h-full p-1">

            <div className="md:w-3/4 bg-background overflow-y-auto overscroll-auto md:overflow-y-scroll md:overscroll-contain md:p-1 md:no-scrollbar pb-4">
                {/* <StudentInfoCard
                    canData={canData}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    setCanData={setCanData}
                /> */}
                <Card className="min-h-full">
                    <CardHeader className="flex flex-row border-b mb-4">
                        <div className={`flex flex-row pr-3 items-center space-x-4 relative rounded-lg`}>

                            <Avatar className="h-20 w-20">
                                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                            </Avatar>
                        </div>

                        <div className={`flex flex-row ml-auto pl-3 justify-items-center`}>
                            <Button
                                variant={"outline"}
                                className="w-32"
                            >
                                <Skeleton />
                            </Button>


                        </div>

                    </CardHeader>
                    <CardContent className={"flex flex-col flex-wrap xl:grid xl:grid-cols-2 xl:gap-x-4"}>
                        {/*    Initial feedback */}
                        <div className="flex flex-col gap-6">
                            <p className="font-bold text-lg">
                                Personal Info
                            </p>
                            <div className="grid flex-1 items-center h-full grid-cols-1 xl:grid-cols-2">
                                <p>
                                    <span className="font-bold">
                                        Year:
                                    </span>&nbsp;
                                </p>
                                <Skeleton />
                                <p>
                                    <span className="font-bold">
                                        Major:
                                    </span>&nbsp;
                                </p>
                                <Skeleton />
                                <p>
                                    <span className="font-bold">
                                        University:
                                    </span>&nbsp;
                                </p>
                                <Skeleton />
                                <p>
                                    <span className="font-bold">
                                        GPA:
                                    </span>&nbsp;

                                </p>
                                <Skeleton />
                                <p>
                                    <span className="font-bold">
                                        Email:
                                    </span>&nbsp;

                                </p>
                                <Skeleton />

                            </div>


                            <div className="space-y-1 ">
                                <p className="font-bold text-lg col-start-2">
                                    Resume
                                </p>
                            </div>
                            <Skeleton className="h-10 w-full" />
                        </div>

                    </CardContent>

                </Card>
            </div>
            <div className={"h-full w-full md:w-1/4 overflow-y-auto overscroll-auto bg-background md:overflow-y-scroll md:overscroll-contain md:p-1"}>
                {/* <EventCard eventIds={canData?.events ?? []} /> */}

            </div>

        </div>
    )
}

export default CandidateSkeleton;