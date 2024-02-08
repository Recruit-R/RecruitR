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

interface TimelineProps {
    events: Array<String>
    currEvent: string
    editable: boolean
}
export function Timeline({events, currEvent, editable}: TimelineProps) {
    const [progress, setProgress] = useState(events.indexOf(currEvent))
    const [progressBar, setProgressBar] = useState<number>(0)
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
        <div className={"relative flex items-center py-5"}>

            <Progress value={progressBar} className={"absolute"}>
            </Progress>
            <div className={"absolute flex  justify-between w-full"}>
                {/*{addToolTip("Interview 1", <Checkbox className={"w-6 h-6 "}/>)}*/}
                {/*<TooltipProvider>*/}
                {/*    <Tooltip>*/}
                {/*        <TooltipTrigger>Hover</TooltipTrigger>*/}
                {/*        <TooltipContent>*/}
                {/*            <Checkbox className={"w-6 h-6"}/>*/}
                {/*        </TooltipContent>*/}
                {/*    </Tooltip>*/}
                {/*</TooltipProvider>*/}
                {
                    events.map((e, idx) => {
                        return (
                            addToolTip(e as string,
                                <Checkbox className={`w-6 h-6 border-secondary bg-secondary`}
                                          id={e as string}
                                          checked={idx <= progress}
                                          onCheckedChange={() => handleCheckedChange(idx)}
                                />
                            )
                        )
                    })
                }
                {/*<Checkbox className={"w-6 h-6"}/>*/}
                {/*<Checkbox className={`w-6 h-6 border-secondary bg-secondary`}/>*/}
                {/*<Checkbox className={`w-6 h-6 border-secondary bg-secondary`}/>*/}
                {/*<Checkbox className={"w-6 h-6 border-secondary bg-secondary"}/>*/}

            </div>
        </div>
    )

}