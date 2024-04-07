import * as React from 'react';

import { Input } from '@/components/ui/input';
import { ClockIcon } from 'lucide-react';

interface DateTimePickerProps {
    date: Date;
    setDate: (date: Date) => void;
}

export function TimePicker({ date, setDate }: DateTimePickerProps) {

    const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        console.log(e.target.value);
        const time = e.target.value.split(':')

        const mergedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), Number(time[0]), Number(time[1]));

        console.log('setting merged date to', date, time, time, mergedDate);
        if (mergedDate.toString() === 'Invalid Date') {
            return;
        }
        setDate(mergedDate);
    };


    return (
        <div className="flex items-center relative">
            <Input
                type="time"
                onChange={handleTimeChange}
                value={date.toString() === 'Invalid Date' ? '' : date.toTimeString().slice(0, 5)}
            />
            <ClockIcon className="z-50 absolute right-0 mr-4 stroke-muted-foreground opacity-50 w-4" />
        </div>
    );
}