import React, {useContext, useEffect, useState} from "react";


import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {z} from "zod";
import {feedbackSchema} from "@/app/recruit/home/data/student-schema.ts";
import {StudentDataContext, StudentDataContextType} from "@/app/recruit/home/components/client-component.tsx";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group.tsx";
import {StarIcon, StarFilledIcon} from "@radix-ui/react-icons";
import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {XIcon} from "lucide-react";
import {useThrottle} from "@/app/hooks/useThrottle.ts";
import _ from "lodash";
import {addFeedback, updateAvgRating} from "@/app/recruit/home/actions.ts";
import addData from "@/app/api/addData.ts";
export function InitialFeedback() {
    const { currentStudent,
        setCurrentStudent, studentList,
        currRecrFeedback ,
        tempCurrentUser,
        setSaved,
        setStudentList
    } = useContext(StudentDataContext) as StudentDataContextType
    const [rating, setRating] = useState(currentStudent?.feedback?.[currRecrFeedback]?.rating ?? 0)
    const [hoveredStar, setHoveredStar] = useState(0)
    const getFeedback = () => currentStudent?.feedback?.[currRecrFeedback]?.rating ?? 0

    const compute = (i: number) => {
        return (hoveredStar == 0 && (i+1 <= (rating ?? 0))) || i+1 <= hoveredStar ? (
            <StarFilledIcon className={"w-12 h-12 text-ring fill-current"}/>
        ) : (
            <StarIcon className={"w-12 h-12 text-ring fill-current"}/>
        )
    }
    useEffect(() => {
        setRating(getFeedback())
    }, [studentList, currRecrFeedback]);

    const throttledRequest = useThrottle(() => {
        // send request to the backend
        // access to latest state here
        if (currRecrFeedback === tempCurrentUser) {
            const mergedObject = _.merge({}, currentStudent!.feedback, {[tempCurrentUser]: {"rating": rating} });
            let ratings = Object.keys(mergedObject).map((name) => {
                return mergedObject[name].rating ?? undefined
            }).filter(Number)
            let avgRating: number | undefined = undefined;
            if (ratings.length > 0) {
                avgRating = ratings.reduce((a, b) => a + b) / ratings.length

            }
            console.log(avgRating)
            addFeedback(currentStudent!.id, JSON.stringify({"rating": rating}), tempCurrentUser)
                .then(e => updateAvgRating(currentStudent!.id, JSON.stringify(avgRating)))
                .then(r => setSaved(true))

            setCurrentStudent((prevState) => ({...prevState, "feedback": mergedObject, avgRating: avgRating ?? undefined}))
        }

    });
    useEffect(() => {
        setSaved(false)
        throttledRequest();
    }, [rating]);

    return (
        <div onMouseLeave={() => setHoveredStar(0)}>
            <p className="font-bold text-lg">
                Initial Feedback
            </p>

            <div className={"flex flex-row items-center justify-between"}>
                <div className={"flex flex-row items-center"}>
                    {
                        [...Array(5)].map((_, i) => {
                            return (
                                <div className="group" onMouseEnter={() => setHoveredStar(i+1)} onMouseLeave={() => setHoveredStar(0)} onClick={() => setRating((prev) => (i+1 == prev ? 0 : i+1))}>
                                    {compute(i)}
                                </div>
                            )
                        })
                    }
                </div>
                <Button variant={"ghost"} className={"justify-center items-center" } onClick={() => setRating(0)} disabled={rating === 0}>
                    <XIcon className={"w-4 h-4 mr-1"}/> Clear
                </Button>


            </div>
        </div>
    )
}