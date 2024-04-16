import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { Label } from "@/components/ui/label.tsx";
import React, { FormEvent, FormEventHandler, useContext, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { boolean, z } from "zod";
import { useThrottle } from "@/hooks/useThrottle.ts";
import useStateCallback from "@/hooks/useStateCallback.ts";
import addData from "@/app/api/addData.ts";
import { addFeedback } from "@/app/recruit/home/actions.ts";
import { bool } from "prop-types";
import { Form } from "@/components/ui/form.tsx";
import { Student } from "@/app/recruit/home/data/student-schema.ts";
import _ from "lodash";
import { StudentDataContext, StudentDataContextType } from "@/app/recruit/home/components/dashboard.tsx";
import { CheckedState } from "@radix-ui/react-checkbox";
import { ElementTitle } from "@/app/recruit/home/components/feedback-card-components/element-title.tsx";
import { useThrottledRequest } from "@/hooks/useThrottledRequest.ts";

export function PossiblePlacementMultiselect() {
    const possiblePlacementValues: Array<string> = ["Data Analyst", "Business Analyst", "Cyber Security", "Software Development", "Project Management", "Digital"]
    const { currentStudent,
        setCurrentStudent,
        studentList, saved,
        setSaved,
        currRecrFeedback,
        currentUserEditId,
        editable
    } = useContext(StudentDataContext) as StudentDataContextType
    const [possiblePlacements, setPossiblePlacements] = useState(currentStudent?.feedback?.[currRecrFeedback]?.possible_placement ?? []);

    useEffect(() => {
        setPossiblePlacements(currentStudent?.feedback?.[currRecrFeedback]?.possible_placement ?? []);
    }, [studentList, currRecrFeedback]);

    useThrottledRequest({
        studentContext: (useContext(StudentDataContext) as StudentDataContextType),
        dbData: { "possible_placement": possiblePlacements },
        localData: { ...(currentStudent?.feedback?.[currentUserEditId] ?? {}), "possible_placement": possiblePlacements },
        dependency: possiblePlacements
    })
    const handleCheckedChange = (event: CheckedState, placement: string) => {
        setPossiblePlacements(
            (prevPlacements) =>
                event
                    ? [...prevPlacements, placement]
                    : prevPlacements.filter((lang) => lang !== placement));
    }
    return (
        <div className="space-y-1 max-md:pb-4">
            <ElementTitle title={"Possible Placement"} />
            <div className="flex flex-row flex-col gap-1">
                {
                    possiblePlacementValues.map((placement) => (
                        <div className="flex items-center w-full space-x-2 bg-muted py-1 pl-2 rounded-sm" key={placement}>
                            <Checkbox
                                id={placement}
                                checked={possiblePlacements.includes(placement)}
                                onCheckedChange={checked => handleCheckedChange(checked, placement)}
                                disabled={!editable()}
                            />
                            <label
                                htmlFor={placement}
                                className="text-sm py-2 pr-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {placement}
                            </label>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}