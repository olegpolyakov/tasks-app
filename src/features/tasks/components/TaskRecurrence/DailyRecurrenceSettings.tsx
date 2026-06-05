import type { RecurrenceData } from '@olegpolyakov/core/objects';

export function getDailyRecurrenceDescription(recurrence: RecurrenceData) {
    const interval = recurrence.interval || 1;

    return `Every ${interval > 1 ? interval : ''} day${interval > 1 ? 's' : ''}`;
}

export default function DailyRecurrenceSettings({
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