import { Bold, Italic, Underline } from "lucide-react"

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {StarFilledIcon} from "@radix-ui/react-icons";
import {useContext} from "react";
import {StudentDataContext, StudentDataContextType} from "@/app/recruit/home/components/client-component.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";

export function RatingRecruiterFeedback() {
    const { currentStudent,
        setCurrentStudent, studentList,
        setCurrRecrFeedback,
        tempCurrentUser} = useContext(StudentDataContext) as StudentDataContextType

    return (

        <div className="flex flex-row items-center gap-6">
            <div>
                <span className="text-2xl font-medium leading-none tracking-tight">Average Rating:</span> &nbsp;
                <span className="text-2xl text-muted-foreground font-light">
             {(Math.round((currentStudent?.avgRating ?? 0) * 100) / 100).toFixed(2)}
            </span>
            </div>
            {/*<span className="font-light text-muted-foreground">Other recruiter feedback:</span>*/}
            <div>
                {
                    currentStudent?.feedback &&
                    Object.keys(currentStudent?.feedback!).some((name) => name !== tempCurrentUser) && (
                        <ToggleGroup variant={"outline"} type="single" onValueChange={(val) => {
                            console.log(val)
                            setCurrRecrFeedback(val === "" ? tempCurrentUser : val)
                        }
                        }>
                            {
                                Object.keys(currentStudent?.feedback!).map((recruiterName) => {
                                    return recruiterName !== tempCurrentUser ? (
                                        <ToggleGroupItem value={recruiterName} aria-label="Toggle bold">

                                            {currentStudent?.feedback?.[recruiterName].rating ?? "N/A"} <StarFilledIcon
                                            className="h-4 w-4 text-ring fill-current"/>
                                            <span className="pl-2">{recruiterName}</span>
                                        </ToggleGroupItem>
                                    ) : <></>
                                })
                            }
                        </ToggleGroup>
                    )
                }

            </div>
        </div>

    )
}