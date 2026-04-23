import { createContext, useContext } from 'react';

import type { List, Task } from '@olegpolyakov/tasks/core';

export type ListContextValue = {
    list: List;
    updateList: (data: Partial<List>) => Promise<void>;
    deleteList: (options: { deleteTasks: boolean }) => Promise<void>;
    
    tasks: Task[];
    addTask: (data: Partial<Task>) => Promise<Task>;
    removeTask: (taskId: string) => Promise<void>;
};

const ListContext = createContext<ListContextValue>(null! as ListContextValue);

export function useListContext() {
    const context = useContext(ListContext);
    
    if (!context) {
        throw new Error('useListContext must be used within a ListProvider');
    }
    
    return context;
}

export default ListContext;