import { Icons } from "@/components/ui/icons";
import React, {useEffect} from "react";

export function StatusBar({canData}: {canData:any}){
    return (
        <div className="space-y-1">
            <p className="font-bold text-lg">
                Internship Process Status
            </p>
            
            <p>
                {canData && (canData.interview2 ? 'Interview 2' : 
                (canData.interview1 ? 'Interview 1' : 'Processing'))}
            </p>
        </div>
    )
}