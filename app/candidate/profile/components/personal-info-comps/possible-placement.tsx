import { Icons } from "@/components/ui/icons"
import { ElementTitle } from "../element-title"
import { Checkbox } from "@radix-ui/react-checkbox"

export function PossiblePlacement({ canData }: { canData: any }) {
    const possiblePlacementValues: Array<string> = ["N/A", "Data Analyst", "Business Analyst", "Cyber Security", "Software Development", "Project Management", "Digital"]
    return (
        <div className="space-y-1 max-md:pb-4">
            <ElementTitle title = {"Possible Placement"}/>
            {/* <ul className="list-disc ml-5 pl-4">
                {canData && canData.feedback ? Object.keys(canData.feedback).map((da: any) => {
                    return (
                        <li key={da}>
                            {canData.feedback?.[da].possible_placement}
                        </li>
                    )
                }) : <span className="-ml-5">N/A</span>}
            </ul> */}
            <div className="flex flex-row flex-col gap-2">
                {
                    possiblePlacementValues.map((placement) => (
                        <div className="flex items-center w-full space-x-2 bg-muted pl-2 rounded-full" key={placement}>
                            <Checkbox
                                id={placement}
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