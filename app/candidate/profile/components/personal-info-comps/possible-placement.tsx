import { Icons } from "@/components/ui/icons"

export function PossiblePlacement({ canData }: { canData: any }) {
    return (
        <div className="space-y-1">
            <p className="font-bold text-lg">
                Possible Placement
            </p>
            <ul className="list-disc ml-5">
                {canData && canData.feedback ? Object.keys(canData.feedback).map((da: any) => {
                    return (
                        <li key={da}>
                            {canData.feedback?.[da].possible_placement}
                        </li>
                    )
                }) : <span className="-ml-5">N/A</span>}
            </ul>

        </div>
    )
}