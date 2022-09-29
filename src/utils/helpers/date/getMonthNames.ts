import { createDate } from './createDate';

export function getMonthNames(locale: string = 'default') {
    const d = new Date();

    const monthNames = Array(12)
        .fill(0)
        .map((_, i) => {
            const { month, monthIndex, monthShort } = createDate(
                new Date(d.getFullYear(), i, 1),
                locale
            );

            return { month, monthIndex, monthShort };
        });

    return monthNames;
}
