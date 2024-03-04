import { useContext, useEffect, useState } from "react";


import { useThrottle } from "@/app/hooks/useThrottle.ts";
import { StudentDataContext, StudentDataContextType } from "@/app/recruit/home/components/client-component.tsx";
import { Button } from "@/components/ui/button.tsx";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { XIcon } from "lucide-react";
export function InitialFeedback() {
    const { currentStudent,
        setCurrentStudent, studentList,
        currRecrFeedback,
        tempCurrentUser,
        setSaved,
        setStudentList
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
        // if (currRecrFeedback === tempCurrentUser) {
        //     setCurrentStudent((prevState: any) => ({...prevState, "feedback": mergedObject, avgRating: avgRating ?? undefined, email: prevState.email ?? ''}))
        // }

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
                                <div key={'group' + i} className="group" onMouseEnter={() => setHoveredStar(i + 1)} onMouseLeave={() => setHoveredStar(0)} onClick={() => setRating((prev) => (i + 1 == prev ? 0 : i + 1))}>
                                    {compute(i)}
                                </div>
                            )
                        })
                    }
                </div>
                <Button variant={"ghost"} className={"justify-center items-center"} onClick={() => setRating(0)} disabled={rating === 0}>
                    <XIcon className={"w-4 h-4 mr-1"} /> Clear
                </Button>


            </div>
        </div>
    )
}