import { createContext, useContext } from 'react';

import type { List } from '@olegpolyakov/tasks/core';

export type ListsContext = {
    lists: List[];
    createList: (data: Partial<List>) => Promise<void>;
    updateList: (id: string, data: Partial<List>) => Promise<void>;
    deleteList: (id: string) => Promise<void>;

    isCreateListDialogOpen: boolean;
    openCreateListDialog: () => void;
    closeCreateListDialog: () => void;
};

const ListsContext = createContext<ListsContext>(null! as ListsContext);

export function useListsContext() {
    const context = useContext(ListsContext);
    
    if (!context) {
        throw new Error('useListsContext must be used within a ListsProvider');
    }
    
    return context;
}

export default ListsContext;