import { type ReactNode, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import type { Task } from '@olegpoliakov/core/entities';

import { TasksContext, useTasksContext } from '@/features/tasks';

import { useTag } from '../hooks';

export default function TagTasksProvider({
    children
}: {
    children: ReactNode
}) {
    const { tagId = '' } = useParams();
    const { tag } = useTag(tagId);
    const {
        tasks,
        createTask,
        updateTask,
        toggleTask,
        deleteTask
    } = useTasksContext();

    const createTaskWithTag = useCallback(async (data: Partial<Task>) => {
        const tagIds = new Set(data.tagIds || []);

        tagIds.add(tagId);

        await createTask({
            ...data,
            tagIds: Array.from(tagIds)
        });
    }, [createTask, tagId]);

    const value = useMemo(() => ({
        heading: tag?.name,
        tasks: tag
            ? tasks.filter(task => task.tagIds.includes(tag?.id))
            : [],
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

    if (!tag) return null;

    return (
        <TasksContext.Provider value={value}>
            {children}
        </TasksContext.Provider>
    );
}