import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Label} from "@/components/ui/label.tsx";
import React from "react";

export function PossiblePlacement({possiblePlacement}: {possiblePlacement: string | undefined}) {
    const placements: Array<String> = ["Data Analyst", "Business Analyst", "Cyber Security", "Software Development", "Project Management"]
    // @ts-ignore
    return (
        <div className="space-y-1">
            <p className="font-bold text-lg">
                Possible Placement
            </p>
            <RadioGroup defaultValue="option-one" className="gap-1">
                {
                    placements.map((placement) => (
                        <div className="flex items-center space-x-2 pl-3 bg-muted rounded-lg" key={placement}>
                            <RadioGroupItem value={placement} id={placement} defaultChecked={placement === possiblePlacement}/>
                            <Label className="w-full py-3" htmlFor={placement}>{placement}</Label>
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}