"use client"
import { Card, CardContent } from "@/components/ui/card";
import { parseISO } from "date-fns";

export function EventBox({ event }: { event: { title: string, date: string, id: string } }) {
    return (
        <Card key={event.id} className="min-h-full w-full">
            <CardContent className="flex flex-col flex-wrap w-full pt-4">
                <p className="font-bold text-lg">{event.title}</p>
                <p className="text-sm">{parseISO(event.date).toDateString()}</p>
            </CardContent>
        </Card>
    )
} 