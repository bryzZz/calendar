import { createDate } from './createDate';

export function getMonthNames(locale: string = 'default') {
    const monthNames: {
        month: ReturnType<typeof createDate>['month'];
        monthShort: ReturnType<typeof createDate>['monthShort'];
        monthIndex: ReturnType<typeof createDate>['monthIndex'];
        date: ReturnType<typeof createDate>['date'];
    }[] = Array.from({ length: 12 });

    const d = new Date();

    monthNames.forEach((_, i) => {
        const { month, monthIndex, monthShort, date } = createDate(
            new Date(d.getFullYear(), d.getMonth() + i, d.getDate()),
            locale
        );

        monthNames[monthIndex] = { month, monthIndex, monthShort, date };
    });

    return monthNames;
}
