import { useCallback, useEffect } from 'react';

import type { Task } from '@olegpoliakov/tasks-core';
import { useAtom } from 'jotai';

import * as api from '../api';
import { tasksAtom } from '../atoms';

export default function useTasks() {
    const [tasks, setTasks] = useAtom(tasksAtom);

    useEffect(() => {
        api.fetchTasks().then(setTasks);
    }, [setTasks]);

    const createTask = useCallback(async (data: Partial<Task>) => {
        const nextTask = await api.createTask(data);

        setTasks(prevTasks => [...prevTasks, nextTask]);
    }, [setTasks]);

    const updateTask = useCallback(async (id: string, data: Partial<Task>) => {
        const updatedTask = await api.updateTask(id, data);

        setTasks(prevTasks => prevTasks.map(task => task.id === id ? updatedTask : task));
    }, [setTasks]);

    const toggleTask = useCallback(async (id: string, completed: boolean) => {
        const updatedTask = await api.toggleTask(id, completed);

        setTasks(prevTasks => prevTasks.map(task => task.id === id ? updatedTask : task));
    }, [setTasks]);

    const deleteTask = useCallback(async (id: string) => {
        await api.deleteTask(id);

        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    }, [setTasks]);

    const sortedTasks = [...tasks].sort((a, b) =>
        a.completed === b.completed ? 0 : a.completed ? 1 : -1
    );

    return {
        tasks: sortedTasks,
        createTask,
        updateTask,
        toggleTask,
        deleteTask
    };
}