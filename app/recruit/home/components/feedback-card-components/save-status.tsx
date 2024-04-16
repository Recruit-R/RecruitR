import {BsCloudCheck, BsEye} from "react-icons/bs";
import {RefreshCcw} from "lucide-react";
import React, {useContext} from "react";
import {StudentDataContext, StudentDataContextType} from "@/app/recruit/home/components/dashboard.tsx";

export function SaveStatus() {
    const { saved, currRecrFeedback, editable, currentUserEditId } = useContext(StudentDataContext) as StudentDataContextType
    const size = 8;
    return (
        <div className="absolute top-0 right-0 mt-4 mr-4">
            {
                !editable() ? (
                            <div className={"p-1 rounded-full  border bg-secondary/75"}>
                                 <BsEye className={"w-6 h-6 stroke-{.5} fill-ring/50"}/>
                            </div>
                        )
                        :
                    <div className={"  p-1 rounded-full border bg-primary/25"}>
                        {
                            saved
                                ? <BsCloudCheck className={"w-6 h-6 stroke-{.5} fill-ring"}/>
                                : <RefreshCcw className={"w-6 h-6 animate-reverse-spin stroke-ring stroke-1"}/>
                        }
                    </div>
            }
        </div>


)
}