import { updateStatus } from "@/app/recruit/home/actions.ts";
import { StudentDataContext, StudentDataContextType } from "@/app/recruit/home/components/dashboard.tsx";
import Roles from "@/app/types/roles";
import { useAuth } from "@/components/auth-provider.tsx";
import { Progress } from "@/components/ui/progress.tsx";
import { TimelineCheckbox } from "@/components/ui/timeline-checkbox.tsx";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useThrottle } from "@/hooks/useThrottle.ts";
import React, { useContext, useEffect, useState } from "react";

interface TimelineProps {
    c: (classnames: string, conditionalNames: string, condition?: boolean) => string
}

export function Timeline({ c }: TimelineProps) {
    const { currentStudent,
        studentList,
        currRecrFeedback,
        setSaved,
        setCurrentStudent,
        changedStudent,
        editable
    } = useContext(StudentDataContext) as StudentDataContextType
    const year_statuses_mapping: Record<string, string[]> = {
        "Rising Sophomore": ["Career Fair", "Interview 1", "Accepted"],
        "Rising Junior": ["Career Fair", "Interview 1", "Interview 2", "Accepted"],
        "Rising Senior": ["Career Fair", "Interview 1", "Interview 2", "Accepted"]

    }
    const student_year = currentStudent?.year ?? ""
    const statuses = year_statuses_mapping[student_year] || ["Career Fair", "Interview 1", "Interview 2", "Accepted"]

    const getFeedback = () => currentStudent?.curr_status ?? "Career Fair"

    const [currStatus, setCurrStatus] = useState(getFeedback())
    const [progress, setProgress] = useState(statuses.indexOf(getFeedback()))
    const [progressBar, setProgressBar] = useState<number>(0)

    useEffect(() => {
        setCurrStatus(getFeedback)
    }, [changedStudent, currRecrFeedback]);

    const throttledRequest = useThrottle(() => {
        // send request to the backend
        // access to latest state here
        if (editable()) {

            updateStatus(currentStudent!.id,
                JSON.stringify(currStatus)).then(e => (setSaved(true)))

            setCurrentStudent((prevState: any) => ({ ...prevState, curr_status: currStatus }))
        }
    })
    useEffect(() => {
        setSaved(false)
        throttledRequest()
    }, [currStatus]);

    useEffect(() => {
        setProgress(statuses.indexOf(currStatus))
    }, [currStatus]);

    const user = useAuth();
    function handleCheckedChange(idx: number) {
        setCurrStatus(statuses[idx])
        setProgress(idx)
    }
    useEffect(() => {
        setProgressBar(100 / (statuses.length - 1) * progress)
    }, [progress])


    function addToolTip(content: string, component: React.JSX.Element) {
        return (<TooltipProvider>
            <Tooltip>
                <TooltipTrigger className={"flex"} >{component}</TooltipTrigger>
                <TooltipContent>
                    {content}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>)
    }
    return (
        <div>
            <p className="font-bold py-2 text-lg">
                Progress
            </p>
            <div className={"relative flex items-center py-8"}>
                <Progress value={progressBar} className={"absolute"}>
                </Progress>
                <div className={"absolute flex justify-between w-full"}>

                    {
                        statuses.map((e, idx) => {
                            return (
                                addToolTip(e as string,
                                    <div className={"relative flex flex-col "} key={idx}>
                                        <div className={`absolute -translate-y-6 
                                    ${idx !== progress && c("hidden", "lg:block max-lg:hidden")}
                                    ${idx === 0 ? "left-0" : idx == statuses.length - 1 ? "right-0" : "left-1/2 -translate-x-1/2"}
                                    `}>
                                            <label htmlFor={e as string} className={"whitespace-nowrap"}>
                                                {e}
                                            </label>
                                        </div>
                                        <TimelineCheckbox className={`w-6 h-6 border-secondary bg-secondary`}
                                            id={e as string}
                                            key={idx}
                                            checked={idx <= progress}
                                            onCheckedChange={() => handleCheckedChange(idx)}
                                            disabled={user?.userRole !== Roles.COORDINATOR}
                                        />
                                    </div>
                                )
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )

}