import React, { useContext, useEffect, useState } from "react";


import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { z } from "zod";
import { feedbackSchema } from "@/app/recruit/home/data/student-schema.ts";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useThrottle } from "@/hooks/useThrottle.ts";
import _ from "lodash";
import { addFeedback } from "@/app/recruit/home/actions.ts";
import { StudentDataContext, StudentDataContextType } from "@/app/recruit/home/components/dashboard.tsx";
import {ElementTitle} from "@/app/recruit/home/components/feedback-card-components/element-title.tsx";
import {useThrottledRequest} from "@/hooks/useThrottledRequest.ts";
export function TextFeedback() {
    const { currentStudent,
        setCurrentStudent,
        studentList, saved,
        setSaved,
        currentUserEditId,
        currRecrFeedback,
        changedStudent,
        editable,
    } = useContext(StudentDataContext) as StudentDataContextType
    const [value, setValue] = useState(
        currentStudent?.feedback?.[currRecrFeedback]?.text_feedback ?? "")

    useEffect(() => {
        setValue(currentStudent?.feedback?.[currRecrFeedback]?.text_feedback ?? "")
    }, [changedStudent, currRecrFeedback]);


    useThrottledRequest({
        studentContext: (useContext(StudentDataContext) as StudentDataContextType),
        dbData: { "text_feedback": value },
        localData: { "text_feedback": value },
        dependency: value,
    })

    return (
        <div>
            <ElementTitle title={"Text Feedback"} />
            <Textarea className="h-96"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!editable()}
            />
        </div>
    )
}