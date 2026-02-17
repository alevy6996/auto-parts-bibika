import { getNoun } from '@shared/features/get-noun';
import { getDaysFromHours } from '@shared/features/get-days-from-hours';

export function formatDeadline(start: number, end: number): string {
    const getDaysNoun = getNoun.bind(null, 'день', 'дня', 'дней');
    const startDays = getDaysFromHours(start);
    const endDays = getDaysFromHours(end);


    if (endDays - startDays < 1) {
        return 'На складе';
    }

    return `${startDays} - ${endDays} ${getDaysNoun(endDays)}`;
}