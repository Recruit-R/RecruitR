import { Bold, Italic, Underline } from "lucide-react"

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {StarFilledIcon} from "@radix-ui/react-icons";
import {useContext} from "react";
import {StudentDataContext, StudentDataContextType} from "@/app/recruit/home/components/client-component.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useAuth} from "@/components/auth-provider.tsx";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.tsx";

export function RatingRecruiterFeedback() {
    const auth = useAuth()
    const { currentStudent,
        setCurrentStudent, studentList,
        setCurrRecrFeedback,
        currentUserEditId} = useContext(StudentDataContext) as StudentDataContextType

    return (

        <div className="flex flex-row items-center gap-6 w-full">
            <div className={"text-nowrap"}>
                <span className="text-2xl font-medium leading-none tracking-tight">Average Rating:</span> &nbsp;
                <span className="text-2xl text-muted-foreground font-light">
             {(Math.round((currentStudent?.avgRating ?? 0) * 100) / 100).toFixed(2)}
            </span>
            </div>
            {/*<span className="font-light text-muted-foreground">Other recruiter feedback:</span>*/}
            <div>
                {
                    currentStudent?.feedback &&
                    Object.keys(currentStudent?.feedback!).some((name) => name !== currentUserEditId) && (
                        <ToggleGroup variant={"outline"} type="single"
                                     className={"flex flex-row flex-wrap items-start"}
                                     onValueChange={(val) => {
                            console.log(val)
                            setCurrRecrFeedback(val === "" ? currentUserEditId : val)
                        }
                        }>
                            {/*<div className={"gap-2"}>*/}
                            {
                                Object.keys(currentStudent?.feedback!).map((recruiterName) => {
                                    return recruiterName !== currentUserEditId ? (
                                        <ToggleGroupItem value={recruiterName} className="bg-background" aria-label="Toggle bold">

                                            {currentStudent?.feedback?.[recruiterName].rating ?? "N/A"} <StarFilledIcon
                                            className="h-4 w-4 text-ring fill-current"/>
                                            <span className="pl-2">{recruiterName}</span>
                                        </ToggleGroupItem>
                                    ) : <></>
                                })
                            }
                            {/*</div>*/}

                        </ToggleGroup>
                    )
                }
            </div>
        </div>

    )
}