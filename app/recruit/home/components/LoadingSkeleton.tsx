export default function LoadingSkeleton() {
    return (
        <div className={"w-full h-full"}>
            <div className={"animate-pulse flex flex-row space-x-2 p-2 h-full"}>
                <div className={"border bg-secondary w-full h-full md:w-3/5 p-2 rounded-lg"}>
                    <div>

                    </div>
                </div>
                <div className={"border md:flex w-full bg-secondary block max-md:hidden h-full md:w-2/5 p-2 rounded-lg"}>
                    <div></div>
                </div>
            </div>
        </div>
    )

}