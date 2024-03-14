import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Progress} from "@/components/ui/progress.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import React, {useEffect, useState} from "react";
import {useAuth} from "@/components/auth-provider.tsx";
import {TimelineCheckbox} from "@/components/ui/timeline-checkbox.tsx";

interface TimelineProps {
    events: Array<String>
    currEvent: string
    editable: boolean
    c: (classnames: string, conditionalNames: string, condition?: boolean) => string
}
export function Timeline({events, currEvent, editable, c}: TimelineProps) {
    const [progress, setProgress] = useState(events.indexOf(currEvent))
    const [progressBar, setProgressBar] = useState<number>(0)
    const user = useAuth();
    function handleCheckedChange(idx: number){
        currEvent = events[idx] as string
        setProgress(events.indexOf(currEvent))
    }
    useEffect(() => {
        setProgressBar(100/(events.length-1) * progress)
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
                        events.map((e, idx) => {
                            return (
                                addToolTip(e as string,
                                    <div className={"relative flex flex-col "} key={idx}>
                                        <div className={`absolute -translate-y-6 
                                    ${idx !== progress && c("hidden", "lg:block max-lg:hidden")}
                                    ${idx === 0 ? "left-0" : idx == events.length - 1 ? "right-0" : "left-1/2 -translate-x-1/2"}
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
                                                  disabled={!user?.isCoordinator}
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