import { Bold, Italic, Underline } from "lucide-react"

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {StarFilledIcon} from "@radix-ui/react-icons";
import {useContext} from "react";
import {StudentDataContext, StudentDataContextType} from "@/app/recruiter/home/components/client-component.tsx";

export function ToggleGroupDemo() {
    const { currentStudent, setCurrentStudent, studentList } = useContext(StudentDataContext) as StudentDataContextType
    return (
        <div className={"flex flex-row items-center"}>
            <div className={"font-bold pr-3"}>Avg. Rating: 4.3</div>
            <ToggleGroup variant={"outline"} type="single">
                {
                    // Object.keys(currentStudent?.feedback ?? {}).map((recruiterName) => {
                    //     return (
                    //         <ToggleGroupItem value={recruiterName} aria-label="Toggle bold">
                    //             <span>
                    //                 {currentStudent?.feedback?.[recruiterName].rating ?? "N/A"} <StarFilledIcon className="h-4 w-4" color={"#FFD27D"} />
                    //             </span>
                    //             {recruiterName}
                    //         </ToggleGroupItem>
                    //     )
                    // })
                }
                <ToggleGroupItem value="bold" aria-label="Toggle bold">
                    4.0<StarFilledIcon className="h-4 w-4" color={"#FFD27D"} /> John
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic">
                    <Italic className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Toggle underline">
                    <Underline className="h-4 w-4" />
                </ToggleGroupItem>
            </ToggleGroup>
        </div>

    )
}