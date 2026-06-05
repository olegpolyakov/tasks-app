import type { RecurrenceData } from '@olegpolyakov/core';

export function getMonthlyRecurrenceDescription(recurrence: RecurrenceData) {
    const interval = recurrence.interval || 1;

    return `Every ${interval > 1 ? interval : ''} month${interval > 1 ? 's' : ''}`;
}

export default function MonthlyRecurrenceSettings({
    recurrence,
    onChange
}: {
    recurrence?: RecurrenceData;
    onChange: (days: number[]) => void;
}) {
    return (
        null
    );
}