import { isDatesEqual } from './isDatesEqual';

export function isToday(date: Date) {
    const today = new Date();

    return isDatesEqual(date, today);
}
