import React, {useEffect} from "react";

export function StatusBar({can_data}: {can_data:any}){
    return (
        <div className="space-y-1">
            <p className="font-bold text-lg">
                Internship Process Status
            </p>
            <p>{can_data && (can_data.interview2 ? 'Interview 2' : 
            (can_data.interview1 ? 'Interview 1' : 'Processing'))}</p>
        </div>
    )
}