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
        <div className="text-lg font-bold py-2">{title}</div>
        <Card className="bg-gray-300">
            <div className=" py-3"></div>
            <CardContent className="">
                {events.map((event, i) => {
                    return (
                        <div key={i}>
                            <div className="py-2 group hover:bg-gray-100 hover:rounded-lg transition-all">
                                <div className="font-bold">{event.Title}</div>
                                <div className="text-sm"> {event.Location} </div>
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
        </>
    )
}