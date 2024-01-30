import React, {useContext, useEffect, useState} from "react";


import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {z} from "zod";
import {feedbackSchema} from "@/app/recruiter/home/data/student-schema.ts";
import {StudentDataContext, StudentDataContextType} from "@/app/recruiter/home/components/client-component.tsx";
export function InitialFeedback() {
    const { currentStudent, setCurrentStudent, studentList } = useContext(StudentDataContext) as StudentDataContextType
    const [rating, setRating] = useState(currentStudent?.feedback?.["Karen"].rating ?? undefined)
    useEffect(() => {
        setRating(currentStudent?.feedback?.["Karen"]?.rating ?? undefined)
    }, [studentList]);
    useEffect(() => {
        throttledRequest("text_feedback", value);
    }, [value])
    return (
        <div>
            <p className="font-bold text-lg">
                Initial Feedback
            </p>

            <div>
                <RadioGroup value={rating} onValueChange={(e) => setRating}>
                  <RadioGroupItem value={1}>Option 1</RadioGroupItem>
                  <RadioGroupItem value={2}>Option 2</RadioGroupItem>
                  <RadioGroupItem value={3}>Option 3</RadioGroupItem>
                </RadioGroup>
            </div>
        </div>
    )
}