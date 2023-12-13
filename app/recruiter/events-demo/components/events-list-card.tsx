import {ClassName} from "postcss-selector-parser";
import {RecruiterEvent} from "@/app/recruiter/events-demo/data/events-schema";
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
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>View the {title} of your company.</CardDescription>
            </CardHeader>
            <CardContent>
                {
                    events.map((event, i) => {
                        return (
                            <div key={i}>
                                {event.Title}
                            </div>
                        )
                    })
                }
            </CardContent>
        </Card>
    )
}