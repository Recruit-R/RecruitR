import { useContext, useEffect, useState } from "react";
import * as _ from 'lodash';
import { useThrottle } from "@/app/hooks/useThrottle.ts";
import { StudentDataContext, StudentDataContextType } from "@/app/recruit/home/components/client-component.tsx";
import { Button } from "@/components/ui/button.tsx";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { XIcon } from "lucide-react";
import {ElementTitle} from "@/app/recruit/home/components/feedback-card-components/element-title.tsx";
import {addFeedback, updateAvgRating} from "@/app/recruit/home/actions.ts";
export function InitialFeedback() {
    const { currentStudent,
        setCurrentStudent, studentList,
        currRecrFeedback,
        setSaved,
        setStudentList,
        editable,
        currentUserEditId
    } = useContext(StudentDataContext) as StudentDataContextType
    const [rating, setRating] = useState(currentStudent?.feedback?.[currRecrFeedback]?.rating ?? 0)
    const [hoveredStar, setHoveredStar] = useState(0)
    const getFeedback = () => currentStudent?.feedback?.[currRecrFeedback]?.rating ?? 0

    const compute = (i: number) => {
        return (hoveredStar == 0 && (i + 1 <= (rating ?? 0))) || i + 1 <= hoveredStar ? (
            <StarFilledIcon className={"w-12 h-12 text-ring fill-current"} />
        ) : (
            <StarIcon className={"w-12 h-12 text-ring fill-current"} />
        )
    }
    useEffect(() => {
        setRating(getFeedback())
    }, [studentList, currRecrFeedback]);

    const throttledRequest = useThrottle(() => {
        // send request to the backend
        // access to latest state here
        if (editable()) {
            const mergedObject = _.merge({}, currentStudent!.feedback, {[currentUserEditId]: {"rating": rating} });
            // console.log(mergedObject)
            let ratings = Object.keys(mergedObject).map((name) => {
                return mergedObject[name].rating ?? undefined
            }).filter(Number)
            let avgRating: number | undefined = undefined;
            if (ratings.length > 0) {
                avgRating = ratings!.reduce((a, b) => a + b) / ratings.length

            }
            // console.log(avgRating)
            addFeedback(currentStudent!.id, JSON.stringify({"rating": rating}), currentUserEditId)
                .then(e => updateAvgRating(currentStudent!.id, JSON.stringify(avgRating)))
                .then(r => setSaved(true))

            setCurrentStudent((prevState: any) => ({...prevState, "feedback": mergedObject, avgRating: avgRating ?? undefined}))
            // setCurrentStudent((prevState) => ({...prevState}))
        }

    });
    useEffect(() => {
        setSaved(false)
        throttledRequest();
    }, [rating]);

    return (
        <div onMouseLeave={() => setHoveredStar(0)} >

            <ElementTitle title={"Initial Feedback"} />

            <div className={"flex flex-row items-center justify-between"}>
                <div className={"flex flex-row items-center"}>
                        {
                            [...Array(5)].map((_, i) => {
                                return (
                                    <div key={'group' + i} className="group"
                                         onMouseEnter={() => editable() && setHoveredStar(i + 1)}
                                         onMouseLeave={() => editable() && setHoveredStar(0)}
                                         onClick={() => editable() && setRating((prev) =>
                                             (i + 1 == prev ? 0 : i + 1))}>
                                        {compute(i)}
                                    </div>
                                )
                            })
                        }
                </div>
                {
                    editable() &&
                    (
                        <Button variant={"ghost"} className={"justify-center items-center"} onClick={() => setRating(0)} disabled={rating === 0}>
                            <XIcon className={"w-4 h-4 mr-1"} /> Clear
                        </Button>
                    )
                }



                </div>
        </div>
    )
}