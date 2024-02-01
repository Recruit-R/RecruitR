import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Label} from "@/components/ui/label.tsx";
import React, {FormEvent, FormEventHandler, useContext, useEffect, useState} from "react";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {boolean, z} from "zod";
import {useThrottle} from "@/app/hooks/useThrottle.ts";
import useStateCallback from "@/app/hooks/useStateCallback.ts";
import addData from "@/app/api/addData.ts";
import {addFeedback} from "@/app/recruiter/home/actions.ts";
import {bool} from "prop-types";
import {Form} from "@/components/ui/form.tsx";
import {Student} from "@/app/recruiter/home/data/student-schema.ts";
import _ from "lodash";
import {StudentDataContext, StudentDataContextType} from "@/app/recruiter/home/components/client-component.tsx";
import {CheckedState} from "@radix-ui/react-checkbox";

export function KnownTech() {
    const languages: Array<string> = ["Python", "Java", "Kotlin", "R", "Angular", ".NET", "Canva", "Adobe Photoshop", "Agile Philosophy", "Power BI", "Azure DevOps", "Waterfall Methodologies"]
    const {currentStudent ,
        setCurrentStudent,
        studentList, saved,
        setSaved,
        currRecrFeedback,
        tempCurrentUser,
        editable
    } = useContext(StudentDataContext) as StudentDataContextType
    const [knownLanguages, setKnownLanguages] = useState(currentStudent?.feedback?.[currRecrFeedback]?.known_tech ?? []);

    useEffect(() => {
        setKnownLanguages(currentStudent?.feedback?.[currRecrFeedback]?.known_tech ?? []);
    }, [studentList, currRecrFeedback]);
    useEffect(() => {
        console.log(currentStudent?.feedback)
    }, [currentStudent]);


    const throttledRequest = useThrottle(() => {
        // send request to the backend
        // access to latest state here
        if (currRecrFeedback === tempCurrentUser) {
            const knownTechFeedback = {...(currentStudent?.feedback?.[tempCurrentUser] ?? {}), "known_tech": knownLanguages}
            const mergedObject = _.merge({}, currentStudent!.feedback, {[tempCurrentUser]: knownTechFeedback});
            addFeedback(currentStudent!.id, JSON.stringify({"known_tech": knownLanguages}), tempCurrentUser).then(e => (setSaved(true)))
            setCurrentStudent((prevState) => ({...prevState, feedback: mergedObject}))
            }
    });
    useEffect(() => {
        console.log(knownLanguages)
        setSaved(false)
        throttledRequest();
    }, [knownLanguages]);
    const handleCheckedChange = (event: CheckedState, language: string) => {
            console.log(event)
            setKnownLanguages(
                (prevLanguages) =>
                    event
                        ? [...prevLanguages, language]
                        : prevLanguages.filter((lang) => lang !== language));
    }


    return (
        <div className="space-y-1">
            <p className="font-bold text-lg">
                Known Tech
            </p>
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