import React from "react";


import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {z} from "zod";
import {feedbackSchema} from "@/app/recruiter/home/data/student-schema.ts";
export function InitialFeedback({initialFeedback}: {initialFeedback: number | undefined}) {

    return (
        <div>
            <p className="font-bold text-lg">
                Initial Feedback
            </p>
            <div>
                {initialFeedback}
            </div>
        </div>
    )
}