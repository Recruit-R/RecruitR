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

export function KnownTechFeedback() {
    const languages: Array<string> = ["Python", "Java", "Kotlin", "R", "Angular", ".NET", "Canva", "Adobe Photoshop", "Agile Philosophy", "Power BI", "Azure DevOps", "Waterfall Methodologies"]
    const { currentStudent,
        setCurrentStudent,
        studentList, saved,
        setSaved,
        currRecrFeedback,
        currentUserEditId,
        editable
    } = useContext(StudentDataContext) as StudentDataContextType
    const [knownLanguages, setKnownLanguages] = useState(currentStudent?.feedback?.[currRecrFeedback]?.known_tech ?? []);

    useEffect(() => {
        setKnownLanguages(currentStudent?.feedback?.[currRecrFeedback]?.known_tech ?? []);
    }, [studentList, currRecrFeedback]);

    useThrottledRequest({
        studentContext: (useContext(StudentDataContext) as StudentDataContextType),
        dbData: { "known_tech": knownLanguages },
        localData: { ...(currentStudent?.feedback?.[currentUserEditId] ?? {}), "known_tech": knownLanguages },
        dependency: knownLanguages
    })
    const handleCheckedChange = (event: CheckedState, language: string) => {
        setKnownLanguages(
            (prevLanguages) =>
                event
                    ? [...prevLanguages, language]
                    : prevLanguages.filter((lang) => lang !== language));
    }
    return (
        <div className="space-y-1 max-md:pb-4">
            <ElementTitle title={"Known Tech"} />
            <div className="flex flex-wrap gap-2">
                {
                    languages.map((language) => (
                        <div className="flex items-center space-x-2 bg-muted pl-2 rounded-full" key={language}>
                            <Checkbox
                                id={language}
                                checked={knownLanguages.includes(language)}
                                onCheckedChange={checked => handleCheckedChange(checked, language)}
                                disabled={!editable()}
                            />
                            <label
                                htmlFor={language}
                                className="text-sm py-2 pr-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {language}
                            </label>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}