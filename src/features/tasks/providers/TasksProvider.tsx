import { ReactNode, useMemo } from 'react';

import { TasksContext } from '../contexts';
import { useTasks } from '../hooks';

export default function TasksProvider({
    children
}: {
    children: ReactNode
}) {
    const {
        tasks,
        createTask,
        updateTask,
        toggleTask,
        deleteTask
    } = useTasks();

    const value = useMemo(() => ({
        tasks,
        createTask,
        updateTask,
        toggleTask,
        deleteTask
    }), [
        tasks,
        createTask,
        updateTask,
        toggleTask,
        deleteTask
    ]);

    return (
        <TasksContext.Provider value={value}>
            {children}
        </TasksContext.Provider>
    );
}