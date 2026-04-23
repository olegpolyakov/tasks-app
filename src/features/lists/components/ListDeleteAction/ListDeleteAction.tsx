import { useState } from 'react';

import { Button, type ButtonProps,Checkbox, Dialog, Flex, Text } from 'kantanui';

import { useListContext } from '../../contexts';

export default function ListDeleteAction(props: ButtonProps) {
    const { deleteList } = useListContext();

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [deleteTasks, setDeleteTasks] = useState(false);

    return (
        <>
            <Button
                title="Delete the list"
                onClick={() => setDialogOpen(true)}
                {...props}
            />

            <Dialog
                open={isDialogOpen}
                title="Delete the list"
                onClose={() => setDialogOpen(false)}
            >
                <Flex column gap="s">
                    <Text content="Are you sure you want to delete this list?" />

                    <Checkbox
                        label="Delete the tasks?"
                        checked={deleteTasks}
                        onChange={() => setDeleteTasks(v => !v)}
                    />

                    <Button
                        content="Delete"
                        fluid
                        color="danger"
                        variant="tinted"
                        onClick={() => {
                            deleteList({ deleteTasks });
                            setDialogOpen(false);
                        }}
                    />
                </Flex>
            </Dialog>
        </>
    );
}