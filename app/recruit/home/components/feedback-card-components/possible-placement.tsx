import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { Label } from "@/components/ui/label.tsx";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { StudentDataContext, StudentDataContextType } from "@/app/recruit/home/components/client-component.tsx";
import { useThrottle } from "@/app/hooks/useThrottle.ts";
import _ from "lodash";
import { addFeedback } from "@/app/recruit/home/actions.ts";
import {ElementTitle} from "@/app/recruit/home/components/feedback-card-components/element-title.tsx";

export function PossiblePlacement() {
    const placements: Array<String> = ["Data Analyst", "Business Analyst", "Cyber Security", "Software Development", "Project Management"]
    const { currentStudent,
        setCurrentStudent, studentList,
        setSaved,
        currRecrFeedback,
        currentUserEditId,
        editable } = useContext(StudentDataContext) as StudentDataContextType
    const getFeedback = () => currentStudent?.feedback?.[currRecrFeedback]?.possible_placement ?? ""
    const [placementFeedback, setPlacementFeedback] = useState(getFeedback)
    // @ts-ignore
    useEffect(() => {
        setPlacementFeedback(getFeedback)
    }, [studentList, currRecrFeedback]);

    const throttledRequest = useThrottle(() => {
        // send request to the backend
        // access to latest state here
        if (editable()) {
            const mergedObject = _.merge({}, currentStudent!.feedback, { [currentUserEditId]: { "possible_placement": placementFeedback } });
            addFeedback(currentStudent!.id, JSON.stringify({ "possible_placement": placementFeedback }), currentUserEditId).then(r => setSaved(true))
            setCurrentStudent((prevState: any) => ({ ...prevState, "feedback": mergedObject }))

        }

    });
    // function handleEvent(e: FormEvent<HTMLButtonElement>| undefined) {
    //     console.log(e)
    //     placementFeedback = e?.target.
    // }

    useEffect(() => {
        setSaved(false)
        throttledRequest();
    }, [placementFeedback]);
    return (
        <div className="space-y-1">
            <ElementTitle title={"Possible Placement"} />
            <RadioGroup
                defaultValue="option-one"
                value={placementFeedback}
                onValueChange={setPlacementFeedback}
                className="gap-1"
                disabled={!editable()}
            >
                {
                    placements.map((placement) => (
                        <div className="flex items-center space-x-2 pl-3 bg-muted rounded-lg" key={String(placement)}>
                            <RadioGroupItem value={placement as string} id={placement as string} />
                            <Label className="w-full py-3" htmlFor={placement as string}>{placement}</Label>
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}