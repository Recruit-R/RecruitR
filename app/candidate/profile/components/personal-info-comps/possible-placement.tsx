
export function PossiblePlacement({ can_data }: { can_data: any }) {
    return (
        <div className="space-y-1">
            <p className="font-bold text-lg">
                Possible Placement
            </p>
            {!can_data && <p>Loading...</p>}
            <ul className="list-disc ml-5">
                {can_data && can_data.feedback ? Object.keys(can_data.feedback).map((da: any) => {
                    return (
                        <li key={da}>
                            {can_data.feedback?.[da].possible_placement}
                        </li>
                    )
                }) : <span className="-ml-5">N/A</span>}
            </ul>

            {/* <p className="text-md">
                <>{can_data && (can_data.feedback ? can_data.feedback.possible_placement : `N/A`)}</>
            </p> */}

        </div>
    )
}