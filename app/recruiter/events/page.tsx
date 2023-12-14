import React from 'react';
import { EventCard } from '@/app/recruiter/events/components/events-card.tsx';
import './Page.css'; 
import { Button } from "@/components/ui/button"
import { PlusIcon } from "@/app/recruiter/events/components/plusicon";

export default function Page() {
    // Sample data for current and past events
    const currentEventData = {
        title: 'Pittsburg Career Fair',
        date: '2023-12-09',
        
    };

    const pastEventData = {
        title: 'GCC Career Fair',
        date: '2023-09-01',
        
    };

    
    const handleClick = () => {
        console.log('Button clicked!');   
    };   

    

    return (
        <div>
            <div className="w-half event-front create-padding"></div>
       <Button className="w-half event-front gray" variant="outline"><PlusIcon/>Create Event</Button>
        <div className="events-container event-front">           
        <div className="event-column ">
            <h1 className="title-padding bold-text">Current Events</h1>
            <EventCard eventData={currentEventData} />
        </div>
        <div className="event-column">
            <h1 className="title-padding bold-text">Past Events</h1>
            <EventCard eventData={pastEventData} />
        </div>
        {/* Other content */}
    </div>
    </div>
    );
}