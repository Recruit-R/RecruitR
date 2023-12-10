import { BellIcon, EyeNoneIcon, PersonIcon } from "@radix-ui/react-icons"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card.tsx"

interface EventData {
  title: string;
  date: string;
  
}

interface EventCardProps {
  eventData: EventData;
}

export function EventCard({ eventData }: EventCardProps) {
  return (
    <Card className="bg-gray-300">
      <CardHeader className="pb-3">
        
        
      </CardHeader>
      <CardContent className="grid gap-1">
        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
         
          <div className="space-y-1">
              <p className="text-sm font-medium leading-none bold-text">{eventData.title}</p>
           <p className="text-sm text-muted-foreground">
              {eventData.date}
            </p>
          </div>
        </div>
        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
         
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none bold-text">{eventData.title}</p>
            <p className="text-sm text-muted-foreground">
            {eventData.date}
            </p>
          </div>
        
        </div>
        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
         
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none bold-text">{eventData.title}</p>
            <p className="text-sm text-muted-foreground">
              {eventData.date}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}