import React, {useContext, useEffect, useState} from "react";


import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {z} from "zod";
import {feedbackSchema} from "@/app/recruiter/home/data/student-schema.ts";
import {Textarea} from "@/components/ui/textarea.tsx";
import {useThrottle} from "@/app/hooks/useThrottle.ts";
import _ from "lodash";
import {addFeedback} from "@/app/recruiter/home/actions.ts";
import {StudentDataContext, StudentDataContextType} from "@/app/recruiter/home/components/client-component.tsx";
export function TextFeedback() {
    const { currentStudent, setCurrentStudent, studentList,saved, setSaved } = useContext(StudentDataContext) as StudentDataContextType
    const [value, setValue] = useState(
        currentStudent?.feedback?.["Karen"]?.text_feedback ?? "")

    useEffect(() => {
        setValue(currentStudent?.feedback?.["Karen"]?.text_feedback ?? "")
    }, [studentList]);


    const throttledRequest = useThrottle(() => {
        // send request to the backend
        // access to latest state here
        const mergedObject = _.merge({}, currentStudent!.feedback, {"Karen": {"text_feedback": value} });
        addFeedback(currentStudent!.id, JSON.stringify({"text_feedback": value})).then(r => setSaved(true))
        setCurrentStudent((prevState) => ({...prevState, "feedback": mergedObject}))
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
            <Textarea className="h-96" value={value} onChange={(e) => setValue(e.target.value)}/>
        </>
)
}