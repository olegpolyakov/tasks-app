import { ReactNode, useMemo } from 'react';
import { useMatch } from 'react-router-dom';

import type { Task } from '@olegpoliakov/tasks-core';

import { TasksContext } from '../contexts';
import { useTasks } from '../hooks';

const headingMap: Record<string, string> = {
    today: 'Today',
    inbox: 'Inbox',
    all: 'All'
};

const filterMap: Record<string, (task: Task) => boolean> = {
    today: task => {
        const today = new Date();
        const dueDate = new Date(task.dueDate || '');

        return !task.completed && dueDate.toDateString() === today.toDateString();
    },
    inbox: task => !task.projectIds.length,
    focus: task => !task.completed,
    all: () => true
};

export default function TasksProvider({
    children
}: {
    children: ReactNode
}) {
    const { filter } = useMatch('/:filter')?.params || {};
    const {
        tasks,
        createTask,
        updateTask,
        toggleTask,
        deleteTask
    } = useTasks();

    const value = useMemo(() => ({
        heading: filter ? headingMap[filter] || 'Tasks' : 'Tasks',
        tasks: filter
            ? tasks.filter(filterMap[filter])
            : tasks,
        createTask,
        updateTask,
        toggleTask,
        deleteTask
    }), [
        tasks,
        filter,
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