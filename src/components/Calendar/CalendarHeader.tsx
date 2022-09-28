import React from 'react';

import { useCalendar } from '../../hooks/useCalendar';
import { ArrowButton } from '../ArrowButton/ArrowButton';

interface CalendarHeaderProps {
    state: ReturnType<typeof useCalendar>['state'];
    functions: ReturnType<typeof useCalendar>['functions'];
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({ state, functions }) => {
    return (
        <div className='Calendar__header flex cursor-pointer select-none items-center justify-between rounded bg-bg-calendar-header'>
            <ArrowButton direction='left' onClick={() => functions.onClickArrow('left')} />
            {state.mode === 'days' && (
                <div aria-hidden onClick={() => functions.setMode('months')}>
                    {state.monthNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
                </div>
            )}
            {state.mode === 'months' && (
                <div aria-hidden onClick={() => functions.setMode('years')}>
                    {state.selectedYear}
                </div>
            )}
            {state.mode === 'years' && (
                <div aria-hidden onClick={() => functions.setMode('days')}>
                    {state.selectedYearInterval.at(0)} - {state.selectedYearInterval.at(-1)}
                </div>
            )}
            <ArrowButton direction='right' onClick={() => functions.onClickArrow('right')} />
        </div>
    );
};
