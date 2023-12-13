import React from 'react';

const PlusIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* Your SVG path or other elements go here */}
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
    );
};

export {PlusIcon};