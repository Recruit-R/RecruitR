import React from 'react';
import { EventCard } from 'C:/Users/HATFIELDAE20/newCapstoneRepo/RecruitR/app/recruiter/events/components/eventscard.tsx';
import './Page.css'; 
import { Button } from "C:/Users/HATFIELDAE20/newCapstoneRepo/RecruitR/app/recruiter/events/components/button.tsx"
import { PlusIcon } from 'C:/Users/HATFIELDAE20/newCapstoneRepo/RecruitR/app/recruiter/events/components/plusicon.tsx';

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
       <Button className="w-half event-front gray"><PlusIcon/>Create Event</Button>
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