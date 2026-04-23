import { useCallback, useEffect, useMemo } from 'react';

import { useAtom } from 'jotai';

import type { List, Task } from '@olegpolyakov/tasks/core';

import { useTasksContext } from '@/features/tasks';

import * as api from '../api';
import { listAtom } from '../atoms';

export default function useList(listId: string) {
    const { tasks, createTask, deleteTask } = useTasksContext();

    const [list, setList] = useAtom(listAtom);

    useEffect(() => {
        api.fetchList(listId).then(setList);
    }, [listId, setList]);

    const updateList = useCallback(async (data: Partial<List>) => {
        await api.updateList(listId, data).then(setList);
    }, [listId, setList]);

    const deleteList = useCallback(async (options: { deleteTasks: boolean }) => {
        await api.deleteList(listId, options).then(() => setList(null));
    }, [listId, setList]);

    const addTask = useCallback(async (data: Partial<Task>) => {
        if (!list) throw new Error('List not loaded');

        const newTask = await createTask(data);
        await updateList({
            taskIds: [...list.taskIds, newTask.id]
        });

        return newTask;
    }, [list, updateList, createTask]);

    const removeTask = useCallback(async (taskId: string) => {
        if (!list) throw new Error('List not loaded');

        await deleteTask(taskId);
        await updateList({
            taskIds: list.taskIds.filter(id => id !== taskId)
        });
    }, [list, updateList, deleteTask]);

    const listTasks = useMemo(() => {
        return !list
            ? []
            : tasks.filter(task => list.taskIds.includes(task.id));
    }, [list, tasks]);

    return {
        list,
        updateList,
        deleteList,
        
        tasks: listTasks,
        addTask,
        removeTask
    };
}