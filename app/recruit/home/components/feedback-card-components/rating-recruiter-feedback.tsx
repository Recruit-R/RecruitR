import { Bold, Italic, Underline } from "lucide-react"

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { StarFilledIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { StudentDataContext, StudentDataContextType } from "@/app/recruit/home/components/dashboard.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { useAuth } from "@/components/auth-provider.tsx";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area.tsx";
import {ViewOtherRecruiterFeedback} from "@/app/recruit/home/components/feedback-card-components/view-other-recruiter-feedback.tsx";

export function RatingRecruiterFeedback() {
    const auth = useAuth()
    const { currentStudent,
        setCurrentStudent, studentList,
        setCurrRecrFeedback,
        currentUserEditId } = useContext(StudentDataContext) as StudentDataContextType

    return (
        <div className="flex flex-row">
            <div className="flex flex-col flex-wrap items-start md:flex-row md:items-center gap-2 md:gap-6 w-full">
                <div className={"text-nowrap"}>
                    <span className="text-2xl font-medium leading-none tracking-tight">Average Rating:</span> &nbsp;
                    <span className="text-2xl text-muted-foreground font-light">
                        {
                            currentStudent?.avgRating ?
                                (Math.round((currentStudent?.avgRating ?? 0) * 100) / 100).toFixed(2)
                                :
                                "None"
                        }
                    </span>
                </div>
                <div className="flex">
                    {
                        Object.keys(currentStudent?.feedback ?? {}).filter(e => e !== currentUserEditId).length > 0 &&
                        <ViewOtherRecruiterFeedback />
                        // Object.keys(currentStudent?.feedback!).some((name) => name !== currentUserEditId) && (
                        //     <ToggleGroup variant={"outline"} type="single"
                        //         className={"flex flex-row flex-wrap items-start place-content-start place-items-start justify-items-start"}
                        //         onValueChange={(val) => {
                        //             setCurrRecrFeedback(val === "" ? currentUserEditId : val)
                        //         }
                        //         }>
                        //         {
                        //             Object.keys(currentStudent?.feedback!).map((recruiterName) => {
                        //                 return recruiterName !== currentUserEditId ? (
                        //                     <ToggleGroupItem key={recruiterName} value={recruiterName} className="bg-background" aria-label="Toggle bold">
                        //                         {currentStudent?.feedback?.[recruiterName].rating ?? "N/A"} <StarFilledIcon
                        //                             className="h-4 w-4 text-ring fill-current" />
                        //                         <span className="pl-2">{recruiterName}</span>
                        //                     </ToggleGroupItem>
                        //                 ) : <></>
                        //             })
                        //         }
                        //     </ToggleGroup>
                        // )
                    }
                </div>
            </div>
        </div>
    )
}