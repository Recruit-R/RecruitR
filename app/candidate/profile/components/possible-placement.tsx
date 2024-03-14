import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import React from "react";

export function PossiblePlacement({can_data}: {can_data:any}) {
    return (
        <div className="space-y-1">
            <p className="font-bold text-lg">
                Possible Placement
            </p>
            <p className="text-md">
                <>{can_data && (can_data.feedback ? can_data.feedback.possible_placement : `N/A`)}</>
            </p>
            
        </div>
    )
}