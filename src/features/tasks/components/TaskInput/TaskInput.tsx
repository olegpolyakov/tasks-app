import { FormEvent, useState } from 'react';

import { Input } from 'kantanui';

export default function TaskInput({ onSubmit }: { onSubmit?: (data: {title: string}) => void }) {
    const [title, setTitle] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setTitle('');
        onSubmit?.({ title });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                placeholder="New task title"
                value={title}
                variant="outlined-tinted"
                onChange={({ value }) => setTitle(value)}
            />
        </form>
    );
}