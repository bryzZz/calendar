import React from 'react';

import { useCalendar } from '../../hooks/useCalendar';
import { ArrowButton } from '../ArrowButton/ArrowButton';

interface CalendarHeaderProps {
    state: ReturnType<typeof useCalendar>['state'];
    functions: ReturnType<typeof useCalendar>['functions'];
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({ state, functions }) => {
    return (
        <div className='Calendar__header flex select-none items-center justify-between bg-primary p-1 text-title shadow-md'>
            <ArrowButton direction='left' onClick={() => functions.onClickArrow('left')} />
            {state.mode === 'days' && (
                <div
                    className='cursor-pointer'
                    aria-hidden
                    onClick={() => functions.setMode('months')}
                >
                    {state.monthNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
                </div>
            )}
            {state.mode === 'months' && (
                <div
                    className='cursor-pointer'
                    aria-hidden
                    onClick={() => functions.setMode('years')}
                >
                    {state.selectedYear}
                </div>
            )}
            {state.mode === 'years' && (
                <div
                    className='cursor-pointer'
                    aria-hidden
                    onClick={() => functions.setMode('days')}
                >
                    {state.selectedYearInterval.at(0)} - {state.selectedYearInterval.at(-1)}
                </div>
            )}
            <ArrowButton direction='right' onClick={() => functions.onClickArrow('right')} />
        </div>
    );
};
