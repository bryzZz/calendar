import { useMemo, useState } from 'react';

import { createDate, createMonth, getMonthNames } from '../utils/helpers/date';
import { getWeekDaysNames } from '../utils/helpers/date/getWeekDaysNames';

interface UseCalendarParams {
    locale?: string;
    firstWeekDay?: number;
    selectedDate: Date;
}

const getYearsInterval = (year: number) => {
    const startYear = Math.floor(year / 10) * 10;
    return [...Array(10)].map((_, i) => startYear + i);
};

export const useCalendar = ({
    locale = 'default',
    firstWeekDay = 2,
    selectedDate: date
}: UseCalendarParams) => {
    const [mode, setMode] = useState<'days' | 'months' | 'years'>('days');
    const [selectedDate, setSelectedDate] = useState(createDate(date, locale));
    const [selectedMonth, setSelectedMonth] = useState(
        createMonth(new Date(selectedDate.year, selectedDate.monthIndex), locale)
    );
    const [selectedYear, setSelectedYear] = useState(selectedDate.year);
    const [selectedYearInterval, setSelectedYearInterval] = useState(
        getYearsInterval(selectedDate.year)
    );

    const monthNames = useMemo(() => getMonthNames(locale), [locale]);
    const weekDaysNames = useMemo(
        () => getWeekDaysNames(firstWeekDay, locale),
        [firstWeekDay, locale]
    );

    const days = useMemo(() => selectedMonth.createMonthDays(), [selectedMonth, selectedYear]);

    const calendarDays = useMemo(() => {
        const prevMonthDays = createMonth(
            new Date(selectedYear, selectedMonth.monthIndex - 1),
            locale
        ).createMonthDays();
        const nextMonthDays = createMonth(
            new Date(selectedYear, selectedMonth.monthIndex + 1),
            locale
        ).createMonthDays();

        const firstDay = days.at(0);
        const lastDay = days.at(-1);

        const shiftIndex = firstWeekDay - 1;

        const numberOfPrevDays =
            firstDay!.dayNumberInWeek - 1 - shiftIndex < 0
                ? 7 - (firstWeekDay - firstDay!.dayNumberInWeek)
                : firstDay!.dayNumberInWeek - 1 - shiftIndex;
        const numberOfNextDays =
            7 - lastDay!.dayNumberInWeek + shiftIndex > 6
                ? 7 - lastDay!.dayNumberInWeek - (7 - shiftIndex)
                : 7 - lastDay!.dayNumberInWeek + shiftIndex;

        const result: typeof days = [];
        if (numberOfPrevDays !== 0) {
            result.push(...prevMonthDays.slice(-numberOfPrevDays));
        }
        result.push(...days);
        if (numberOfNextDays !== 0) {
            result.push(...nextMonthDays.slice(0, numberOfNextDays));
        }

        return result;
    }, [selectedMonth.year, selectedMonth.monthIndex, selectedYear]);

    const onClickArrow = (direction: 'left' | 'right') => {
        let newYear = selectedYear;
        let newSelectedYearInterval = selectedYearInterval;

        if (mode === 'days') {
            const newMonthIndex =
                direction === 'left' ? selectedMonth.monthIndex - 1 : selectedMonth.monthIndex + 1;

            let newSelectedMonth: ReturnType<typeof createMonth>;

            if (newMonthIndex === -1) {
                newYear = selectedYear - 1;
                newSelectedMonth = createMonth(new Date(newYear, 11), locale);
            } else if (newMonthIndex === 12) {
                newYear = selectedYear + 1;
                newSelectedMonth = createMonth(new Date(newYear, 0), locale);
            } else {
                newSelectedMonth = createMonth(new Date(newYear, newMonthIndex), locale);
            }

            setSelectedMonth(newSelectedMonth!);
        } else if (mode === 'months') {
            newYear = direction === 'left' ? selectedYear - 1 : selectedYear + 1;
        } else if (mode === 'years') {
            newSelectedYearInterval =
                direction === 'left'
                    ? getYearsInterval(selectedYearInterval.at(0)! - 10)
                    : getYearsInterval(selectedYearInterval.at(-1)! + 10);
        }

        if (!selectedYearInterval.includes(newYear)) {
            newSelectedYearInterval = getYearsInterval(newYear);
        }

        setSelectedYear(newYear!);
        setSelectedYearInterval(newSelectedYearInterval!);
    };

    const setSelectedMonthByIndex = (monthIndex: number) => {
        setSelectedMonth(createMonth(new Date(selectedYear, monthIndex), locale));
    };

    return {
        state: {
            mode,
            calendarDays,
            weekDaysNames,
            monthNames,
            selectedDate,
            selectedMonth,
            selectedYear,
            selectedYearInterval
        },
        functions: {
            setMode,
            setSelectedDate,
            onClickArrow,
            setSelectedMonthByIndex,
            setSelectedYear
        }
    };
};
