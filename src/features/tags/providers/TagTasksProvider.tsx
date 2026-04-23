import { type ReactNode, useCallback, useMemo } from 'react';

import type { Tag, Task } from '@olegpolyakov/tasks-core';

import { TasksContext, useTasksContext } from '@/features/tasks';

export default function TagTasksProvider({
    tag,
    children
}: {
    tag: Tag;
    children: ReactNode
}) {
    const {
        tasks,
        createTask,
        updateTask,
        toggleTask,
        deleteTask
    } = useTasksContext();

    const tagId = tag.id;

    const createTaskWithTag = useCallback(async (data: Partial<Task>) => {
        const tagIds = new Set(data.tagIds || []);

        tagIds.add(tagId);

        return createTask({
            ...data,
            tagIds: Array.from(tagIds)
        });
    }, [createTask, tagId]);

    const value = useMemo(() => ({
        tasks: tasks.filter(task => task.tagIds.includes(tag.id)),
        createTask: createTaskWithTag,
        updateTask,
        toggleTask,
        deleteTask
    }), [
        tag,
        tasks,
        createTaskWithTag,
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