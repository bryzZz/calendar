import { createDate } from './createDate';
import { getMonthNumberOfDays } from './getMonthNumberOfDays';

export function createMonth(date: Date = new Date(), locale: string = 'default') {
    const d = createDate(date, locale);

    const { month: monthName, year, monthNumber, monthIndex } = d;

    const getDay = (dayNumber: number) => createDate(new Date(year, monthIndex, dayNumber), locale);

    const createMonthDays = () =>
        Array(getMonthNumberOfDays(monthIndex, year) - 1)
            .fill(0)
            .map((_, i) => getDay(i + 1));

    return {
        getDay,
        monthName,
        monthIndex,
        monthNumber,
        year,
        createMonthDays
    };
}
