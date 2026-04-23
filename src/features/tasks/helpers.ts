import type { Task } from '@olegpolyakov/tasks-core';

export function filterAndSortTasks(
    tasks: Task[],
    filter: (task: Task) => boolean,
    sort: (a: Task, b: Task) => number,
    taskIdsInOrder?: string[]
) {
    const filteredTasks = tasks.filter(filter);

    if (sort) return filteredTasks.sort(sort);

    if (!taskIdsInOrder || taskIdsInOrder.length === 0) return filteredTasks;

    const tasksIds = filteredTasks.map(task => task.id);
    const tasksById = new Map(filteredTasks.map(task => [task.id, task]));
    const tasksInOrder = taskIdsInOrder
        .filter(id => tasksIds.includes(id))
        .map(id => tasksById.get(id)).filter(Boolean) as Task[];
    const remainingTasks = filteredTasks.filter(task => !taskIdsInOrder.includes(task.id));
    
    return [...tasksInOrder, ...remainingTasks];
}