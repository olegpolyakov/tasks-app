import { type ReactNode, useCallback, useMemo, useState } from 'react';

import { Dialog } from 'kantanui';

import type { List } from '@olegpolyakov/tasks/core';

import { ListForm } from '../components';
import { ListsContext } from '../contexts';
import { useLists } from '../hooks';

export default function ListsProvider({ children }: {children: ReactNode}) {
    const {
        lists,
        createList,
        updateList,
        deleteList
    } = useLists();

    const [isCreateListDialogOpen, setCreateListDialogOpen] = useState(false);

    const handleSubmit = useCallback(async (data: Partial<List>) => {
        await createList(data);
        setCreateListDialogOpen(false);
    }, [createList]);

    const value = useMemo(() => ({
        lists,
        createList,
        updateList,
        deleteList,

        isCreateListDialogOpen,
        openCreateListDialog: () => setCreateListDialogOpen(true),
        closeCreateListDialog: () => setCreateListDialogOpen(false)
    }), [
        lists,
        createList,
        updateList,
        deleteList,
        isCreateListDialogOpen
    ]);

    return (
        <ListsContext.Provider value={value}>
            {children}

            <Dialog
                title="New List"
                open={isCreateListDialogOpen}
                onClose={() => setCreateListDialogOpen(false)}
            >
                <ListForm onSubmit={handleSubmit} />
            </Dialog>
        </ListsContext.Provider>
    );
}