import React from 'react';

import { useCalendar } from '../../hooks/useCalendar';
import { isToday as checkIsToday } from '../../utils/helpers/date';
import { isDatesEqual } from '../../utils/helpers/date/isDatesEqual';
import { ArrowButton } from '../ArrowButton/ArrowButton';

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
            <div className='Calendar__header flex cursor-pointer select-none items-center justify-between rounded bg-bg-calendar-header'>
                <ArrowButton direction='left' onClick={() => functions.onClickArrow('left')} />
                {state.mode === 'days' && (
                    <div aria-hidden onClick={() => functions.setMode('months')}>
                        {state.monthNames[state.selectedMonth.monthIndex].month}{' '}
                        {state.selectedYear}
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
            <div className='Calendar__body p-3 pt-1'>
                {state.mode === 'days' && (
                    <>
                        <div className='Calendar__week-names grid grid-cols-7 pb-1 text-text'>
                            {state.weekDaysNames.map((day) => (
                                <div key={day.dayShort} className='text-center'>
                                    {day.dayShort}
                                </div>
                            ))}
                        </div>
                        <div className='Calendar__days grid grid-cols-7'>
                            {state.calendarDays.map((day) => {
                                const isToday = checkIsToday(day.date);
                                const isSelectedDay = isDatesEqual(
                                    day.date,
                                    state.selectedDate.date
                                );
                                const isAdditionalDay =
                                    day.monthIndex !== state.selectedMonth.monthIndex;

                                return (
                                    <div
                                        aria-hidden
                                        key={`${day.dayNumber}-${day.monthIndex}`}
                                        onClick={() => {
                                            functions.setSelectedDate(day);
                                            setSelectedDate(day.date);
                                        }}
                                        className={`
                                            Calendar__day cursor-pointer rounded p-2 text-center transition-colors hover:bg-additional 
                                            ${isSelectedDay ? 'bg-additional7' : ''}
                                            ${isToday ? 'bg-red' : ''} 
                                            ${isAdditionalDay ? 'text-placeholder' : ''}
                                        `}
                                    >
                                        {day.dayNumber}
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
                {state.mode === 'months' && (
                    <div className='grid grid-cols-3'>
                        {state.monthNames.map((monthName) => {
                            const isCurrentMonth =
                                new Date().getMonth() === monthName.monthIndex &&
                                new Date().getFullYear() === state.selectedYear;
                            const isSelectedMonth =
                                monthName.monthIndex === state.selectedMonth.monthIndex;

                            return (
                                <div
                                    aria-hidden
                                    onClick={() => {
                                        functions.setMode('days');
                                        functions.setSelectedMonthByIndex(monthName.monthIndex);
                                    }}
                                    key={monthName.monthShort}
                                    className={`
                                        cursor-pointer rounded p-3 text-center transition-colors hover:bg-additional
                                        ${isSelectedMonth ? 'bg-additional7' : ''}
                                        ${isCurrentMonth ? 'bg-red' : ''} 
                                    `}
                                >
                                    {monthName.monthShort}
                                </div>
                            );
                        })}
                    </div>
                )}
                {state.mode === 'years' && (
                    <div className='grid grid-cols-3'>
                        <div className='cursor-pointer rounded p-3 text-center text-placeholder transition-colors hover:bg-additional'>
                            {state.selectedYearInterval[0] - 1}
                        </div>
                        {state.selectedYearInterval.map((year) => {
                            const isCurrentYear = year === new Date().getFullYear();
                            const isSelectedYear = year === state.selectedYear;

                            return (
                                <div
                                    aria-hidden
                                    onClick={() => {
                                        functions.setMode('months');
                                        functions.setSelectedYear(year);
                                    }}
                                    key={year}
                                    className={`
                                        cursor-pointer rounded p-3 text-center transition-colors hover:bg-additional
                                        ${isSelectedYear ? 'bg-additional7' : ''}
                                        ${isCurrentYear ? 'bg-red' : ''} 
                                    `}
                                >
                                    {year}
                                </div>
                            );
                        })}
                        <div className='cursor-pointer rounded p-3 text-center text-placeholder transition-colors hover:bg-additional'>
                            {state.selectedYearInterval.at(-1)! + 1}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
