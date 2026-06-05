import type { RecurrenceData } from '@olegpolyakov/core';

export function getYearlyRecurrenceDescription(recurrence: RecurrenceData) {
    const interval = recurrence.interval || 1;

    return `Every ${interval > 1 ? interval : ''} year${interval > 1 ? 's' : ''}`;
}

export default function YearlyRecurrenceSettings({
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