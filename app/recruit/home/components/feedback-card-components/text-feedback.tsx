import React, { useContext, useEffect, useState } from "react";


import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { z } from "zod";
import { feedbackSchema } from "@/app/recruit/home/data/student-schema.ts";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useThrottle } from "@/app/hooks/useThrottle.ts";
import _ from "lodash";
import { addFeedback } from "@/app/recruit/home/actions.ts";
import { StudentDataContext, StudentDataContextType } from "@/app/recruit/home/components/client-component.tsx";
export function TextFeedback() {
    const { currentStudent,
        setCurrentStudent,
        studentList, saved,
        setSaved,
        tempCurrentUser,
        currRecrFeedback,
        editable,
    } = useContext(StudentDataContext) as StudentDataContextType
    const [value, setValue] = useState(
        currentStudent?.feedback?.[currRecrFeedback]?.text_feedback ?? "")

    useEffect(() => {
        setValue(currentStudent?.feedback?.[currRecrFeedback]?.text_feedback ?? "")
    }, [studentList, currRecrFeedback]);


    const throttledRequest = useThrottle(() => {
        // send request to the backend
        // access to latest state here
        if (currRecrFeedback === tempCurrentUser) {

            const mergedObject = _.merge({}, currentStudent!.feedback, { [tempCurrentUser]: { "text_feedback": value } });
            addFeedback(currentStudent!.id, JSON.stringify({ "text_feedback": value }), tempCurrentUser).then(r => setSaved(true))
            setCurrentStudent((prevState: any) => ({ ...prevState, "feedback": mergedObject }))
        }
    });
    useEffect(() => {
        setSaved(false)
        throttledRequest();
    }, [value])

    return (
        <>
            <p className="font-bold pb-2 text-lg">
                Text Feedback
            </p>
            <Textarea className="h-96"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!editable()}
            />
        </>
    )
}