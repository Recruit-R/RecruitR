import React, {useContext, useEffect, useState} from "react";


import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {z} from "zod";
import {feedbackSchema} from "@/app/recruiter/home/data/student-schema.ts";
import {StudentDataContext, StudentDataContextType} from "@/app/recruiter/home/components/client-component.tsx";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group.tsx";
import {StarIcon, StarFilledIcon} from "@radix-ui/react-icons";
import {cn} from "@/lib/utils.ts";
export function InitialFeedback() {
    const { currentStudent, setCurrentStudent, studentList, currRecrFeedback } = useContext(StudentDataContext) as StudentDataContextType
    const [rating, setRating] = useState(currentStudent?.feedback?.[currRecrFeedback]?.rating ?? undefined)
    const [hoveredStar, setHoveredStar] = useState(0)
    const compute = (i: number) => {
        return (hoveredStar == 0 && (i+1 <= (rating ?? 0))) || i+1 <= hoveredStar ? (
            <StarFilledIcon className={"w-12 h-12"}/>
        ) : (
            <StarIcon className={"w-12 h-12"}/>
        )
    }
    // useEffect(() => {
    //     setRating(currentStudent?.feedback?.["Karen"]?.rating ?? undefined)
    // }, [studentList]);
    // useEffect(() => {
    //     throttledRequest("text_feedback", value);
    // }, [value])
    return (
        <div onMouseLeave={() => setHoveredStar(0)}>
            <p className="font-bold text-lg">
                Initial Feedback
            </p>

            <div className={"flex flex-row"}>
                {
                    [...Array(5)].map((_, i) => {
                        return (
                            <div className="group" onMouseEnter={() => setHoveredStar(i+1)} onMouseLeave={() => setHoveredStar(0)} onClick={() => setRating((prev) => (i+1 == prev ? 0 : i+1))}>
                                {compute(i)}
                            </div>
                            // <ToggleGroupItem value={i.toString()}>
                            //     {/*{i.toString()}*/}
                            //     {/*<StarFilledIcon />*/}
                            // </ToggleGroupItem>
                        )
                    })
                }

            </div>
        </div>
    )
}