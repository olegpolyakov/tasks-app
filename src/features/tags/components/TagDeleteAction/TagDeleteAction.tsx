import { useState } from 'react';

import type { Tag } from '@olegpolyakov/tasks/core';
import { Button, type ButtonProps,Checkbox, Dialog, Flex, Text } from 'kantanui';

import { useTagsContext } from '../../contexts';

export default function TagDeleteAction({ tag, ...props }: { tag: Tag } & ButtonProps) {
    const { deleteTag } = useTagsContext();

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [deleteTasks, setDeleteTasks] = useState(false);

    return (
        <>
            <Button
                title="Delete tag"
                onClick={() => setDialogOpen(true)}
                {...props}
            />

            <Dialog
                open={isDialogOpen}
                title="Delete tag"
                onClose={() => setDialogOpen(false)}
            >
                <Flex column gap="s">
                    <Text content="Are you sure you want to delete this tag?" />

                    <Checkbox
                        label="Delete tasks?"
                        checked={deleteTasks}
                        onChange={() => setDeleteTasks(v => !v)}
                    />

                    <Button
                        content="Delete"
                        fluid
                        color="danger"
                        variant="tinted"
                        onClick={() => {
                            deleteTag(tag.id, { deleteTasks });
                            setDialogOpen(false);
                        }}
                    />
                </Flex>
            </Dialog>
        </>
    );
}