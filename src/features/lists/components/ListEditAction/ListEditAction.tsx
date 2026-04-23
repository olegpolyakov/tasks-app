import { useCallback, useState } from 'react';

import { Button, Dialog } from 'kantanui';

import type { List } from '@olegpolyakov/tasks/core';

import { ListForm } from '../../components';
import { useListContext } from '../../contexts';

export default function ListEditAction() {
    const { list, updateList } = useListContext();

    const [isEditDialogOpen, setEditDialogOpen] = useState(false);

    const handleSubmit = useCallback(async (data: Partial<List>) => {
        await updateList(data);
        setEditDialogOpen(false);
    }, [updateList]);

    return (<>
        <Button
            content="Edit the list"
            onClick={() => setEditDialogOpen(true)}
        />

        <Dialog
            title="Edit the list"
            open={isEditDialogOpen}
            onClose={() => setEditDialogOpen(false)}
        >
            <ListForm
                data={list}
                onSubmit={handleSubmit}
            />
        </Dialog>
    </>);
}