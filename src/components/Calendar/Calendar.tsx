import React from 'react';

import { useCalendar } from '../../hooks/useCalendar';

import { CalendarBody } from './CalendarBody';
import { CalendarHeader } from './CalendarHeader';

interface CalendarProps {
    locale?: string;
    firstWeekDay?: number;
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
    locale = 'default',
    firstWeekDay = 2,
    selectedDate,
    setSelectedDate
}) => {
    const { state, functions } = useCalendar({ locale, selectedDate, firstWeekDay });

    return (
        <div className='Calendar w-96 rounded bg-bg-calendar capitalize'>
            <CalendarHeader state={state} functions={functions} />
            <CalendarBody state={state} functions={functions} setSelectedDate={setSelectedDate} />
        </div>
    );
};
