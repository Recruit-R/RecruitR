import { Bold, Italic, Underline } from "lucide-react"

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {StarFilledIcon} from "@radix-ui/react-icons";
import {useContext} from "react";
import {StudentDataContext, StudentDataContextType} from "@/app/recruit/home/components/client-component.tsx";

export function ToggleGroupDemo() {
    const { currentStudent,
        setCurrentStudent, studentList,
        setCurrRecrFeedback,
        tempCurrentUser} = useContext(StudentDataContext) as StudentDataContextType

    return (
        <div className={"flex flex-row items-center"}>
            <div className={"font-bold pr-3"}>Avg. Rating: {(Math.round((currentStudent?.avgRating ?? 0) * 100) / 100).toFixed(2)}</div>
            {
                currentStudent?.feedback &&
                Object.keys(currentStudent?.feedback!).some((name) => name !== tempCurrentUser) && (
                    <ToggleGroup variant={"outline"} type="single" onValueChange={(val) => {
                        console.log(val)
                        setCurrRecrFeedback(val === "" ? tempCurrentUser : val)}
                    }>
                        {
                            Object.keys(currentStudent?.feedback!).map((recruiterName) => {
                                return recruiterName !== tempCurrentUser ? (
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

    )
}