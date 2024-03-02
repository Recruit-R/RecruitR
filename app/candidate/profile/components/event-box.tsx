"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, {useEffect} from "react";
interface EventBoxProps {
    eventName: string
    eventDate: string
    eventTime: string
}
export function EventBox({eventName, eventDate, eventTime}: EventBoxProps){
    return (
        <Card className="min-h-full w-full">
            <CardContent className="flex flex-col flex-wrap w-full pt-4">
                <p className="font-bold text-lg">{eventName}</p>
                <p className="text-sm">{eventDate}  {eventTime}</p>
            </CardContent>
        </Card>
    )
}