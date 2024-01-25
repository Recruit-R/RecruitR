import {ClassName} from "postcss-selector-parser";
import {RecruiterEvent} from "@/app/recruiter/events/data/events-schema";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface EventsListCardProps {
    title: string,
    events: Array<RecruiterEvent>,
}

export function EventsListCard({title, events}: EventsListCardProps) {
    return (    
        <>
        <div className="text-lg font-bold pb-1">{title}</div>
        <Card className="">
            <div className=" py-2"></div>
            <CardContent className="divide-y">
                {events.map((event, i) => {
                    return (
                        <div key={i}>
                            <div className="py-2 pl-3 group hover:bg-gray-100 hover:rounded-lg transition-all">
                                <div className="text-md font-bold ">{event.Title}</div>
                                <div className="text-sm text-muted-foreground"> {event.Location} </div>
                                <div className="text-sm text-muted-foreground"> {event.Time.toString()} </div>
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
        </>
    )
}