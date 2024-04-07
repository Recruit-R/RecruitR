import {BsCloudCheck, BsEye} from "react-icons/bs";
import {RefreshCcw} from "lucide-react";
import React, {useContext} from "react";
import {StudentDataContext, StudentDataContextType} from "@/app/recruit/home/components/dashboard.tsx";

export function SaveStatus() {
    const { saved, currRecrFeedback, editable, currentUserEditId } = useContext(StudentDataContext) as StudentDataContextType
    return (
        <div className={"absolute top-0 right-0 mt-4 mr-7 p-1 rounded-full border"}>
            {
                !editable()
                    ? <BsEye className={"w-6 h-6 stroke-{.5} fill-ring"}/>
                    : saved
                        ? <BsCloudCheck className={"w-6 h-6 stroke-{.5} fill-ring"}/>
                        : <RefreshCcw className={"w-6 h-6 animate-reverse-spin stroke-ring stroke-1"}/>
            }
        </div>
    )
}