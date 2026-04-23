import { type ReactNode, useMemo } from 'react';

import { TasksContext, useTasksContext } from '@/features/tasks';

import { ListContext, ListContextValue } from '../contexts';
import { useList } from '../hooks';

export default function ListProvider({
    listId,
    children
}: {
    listId: string
    children: ReactNode | ((value: ListContextValue) => ReactNode);
}) {
    const {
        updateTask,
        toggleTask
    } = useTasksContext();
        
    const {
        list,
        updateList,
        deleteList,
        
        tasks,
        addTask,
        removeTask
    } = useList(listId);

    const listsValue = useMemo(() => ({
        list: list!,
        updateList,
        deleteList,
        tasks,
        addTask,
        removeTask
    }), [
        list,
        updateList,
        deleteList,
        tasks,
        addTask,
        removeTask
    ]);

    const tasksValue = useMemo(() => ({
        tasks,
        createTask: addTask,
        updateTask,
        toggleTask,
        deleteTask: removeTask
    }), [
        tasks,
        addTask,
        updateTask,
        toggleTask,
        removeTask
    ]);

    if (!list) return null;

    return (
        <ListContext.Provider value={listsValue}>
            <TasksContext.Provider value={tasksValue}>
                {typeof children === 'function' ? children(listsValue) : children}
            </TasksContext.Provider>
        </ListContext.Provider>
    );
}