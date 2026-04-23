import { createContext, useContext } from 'react';

import type { Task } from '@olegpolyakov/tasks-core';

export type TaskContext = {
    task: Task;
    setTask: (task: Task) => void;
    unsetTask: () => void;
    updateTask: (data: Partial<Task>) => Promise<void>;
    toggleTask: (completed: boolean) => Promise<void>;
    deleteTask: () => Promise<void>;
};

const TaskContext = createContext<TaskContext>(null! as TaskContext);

export function useTaskContext() {
    const context = useContext(TaskContext);
    
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    
    return context;
}

export default TaskContext;