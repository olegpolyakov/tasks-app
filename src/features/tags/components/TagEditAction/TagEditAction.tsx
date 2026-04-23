import type { Tag } from '@olegpolyakov/tasks/core';
import { Button, type ButtonProps } from 'kantanui';

import { useTagsContext } from '../../contexts';

export default function TagEditAction({ tag, ...props }: { tag: Tag } & ButtonProps) {
    const { openTagDialog } = useTagsContext();

    return (
        <Button
            title="Edit tag"
            icon="edit"
            onClick={() => openTagDialog(tag)}
            {...props}
        />
    );
}