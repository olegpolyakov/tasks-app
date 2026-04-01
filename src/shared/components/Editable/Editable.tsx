import type { FocusEventHandler, InputEventHandler } from 'react';

export type EditableProps = {
    content: string;
    readOnly?: boolean;
    onChange?: (content: string) => void;
    onBlur?: (content: string) => void;
};

export default function Editable({
    content,
    readOnly,
    onChange,
    onBlur
}: EditableProps) {
    const handleInput: InputEventHandler<HTMLDivElement> = event => {
        onChange?.(event.currentTarget.innerText);
    };

    const handleBlur: FocusEventHandler<HTMLDivElement> = event => {
        onBlur?.(event.currentTarget.innerText);
    };

    if (readOnly) {
        return <>{content}</>;
    }

    return (
        <div
            dangerouslySetInnerHTML={{ __html: content }}
            contentEditable
            onInput={handleInput}
            onBlur={handleBlur}
        />
    );
}