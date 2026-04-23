import type { Task } from '@olegpolyakov/tasks-core';

export const filters: Record<string, (task: Task) => boolean> = {
    all: () => true,
    inbox: task => !task.projectIds.length,
    today: task => new Date(task.dueDate || '').toDateString() === new Date().toDateString()
};
