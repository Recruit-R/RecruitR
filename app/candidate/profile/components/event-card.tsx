import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { EventTable } from "./event-table";


export function EventCard(){
    return (
    <Card className="min-h-full ">
            <CardHeader className="flex flex-row items-center divide-x border-b mb-4">
                <p className = "font-bold text-lg">Recent Events
                    
                </p>
            </CardHeader>
                <CardContent className="flex flex-col flex-wrap">
                
                <EventTable></EventTable>
                </CardContent>
            </Card>
    )
}