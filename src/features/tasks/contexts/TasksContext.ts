import { createContext, useContext } from 'react';

import type { Task } from '@olegpoliakov/tasks-core';

export type TasksContext = {
    heading?: string;
    tasks: Task[];
    createTask: (data: Partial<Task>) => Promise<void>;
    updateTask: (id: string, data: Partial<Task>) => Promise<void>;
    toggleTask: (id: string, completed: boolean) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
};

const TasksContext = createContext<TasksContext>(null! as TasksContext);

export function useTasksContext() {
    const context = useContext(TasksContext);
    
    if (!context) {
        throw new Error('useTasksContext must be used within a TasksProvider');
    }
    
    return context;
}

export default TasksContext;