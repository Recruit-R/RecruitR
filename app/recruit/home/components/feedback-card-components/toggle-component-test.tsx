import { Bold, Italic, Underline } from "lucide-react"

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {StarFilledIcon} from "@radix-ui/react-icons";
import {useContext} from "react";
import {StudentDataContext, StudentDataContextType} from "@/app/recruit/home/components/client-component.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";

export function ToggleGroupDemo() {
    const { currentStudent,
        setCurrentStudent, studentList,
        setCurrRecrFeedback,
        currentUserEditId} = useContext(StudentDataContext) as StudentDataContextType

    return (
        <Card className=" w-full">
            <CardHeader>
                <CardTitle>
                    Avg. Rating: &nbsp;
                    <span className="text-muted-foreground font-light">
                         {(Math.round((currentStudent?.avgRating ?? 0) * 100) / 100).toFixed(2)}
                    </span>
                </CardTitle>
                {/*<div className={"font-bold pr-3"}></div>*/}
            </CardHeader>
            <CardContent>
                <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
                <div className={"flex flex-col items-start gap-2"}>
                    {
                        currentStudent?.feedback &&
                        Object.keys(currentStudent?.feedback!).some((name) => name !== currentUserEditId) && (
                            <ToggleGroup variant={"outline"} type="single" onValueChange={(val) => {
                                console.log(val)
                                setCurrRecrFeedback(val === "" ? currentUserEditId : val)}
                            }>
                                {
                                    Object.keys(currentStudent?.feedback!).map((recruiterName) => {
                                        return recruiterName !== currentUserEditId ? (
                                            <ToggleGroupItem value={recruiterName} aria-label="Toggle bold">

                                            {currentStudent?.feedback?.[recruiterName].rating ?? "N/A"} <StarFilledIcon className="h-4 w-4 text-ring fill-current" />
                                                <span className="pl-2">{recruiterName}</span>
                                            </ToggleGroupItem>
                                        ) : <></>
                                    })
                                }
                            </ToggleGroup>
                        )
                    }

                </div>
            <ScrollBar orientation="horizontal" />
            </ScrollArea>
            </CardContent>
        </Card>

    )
}