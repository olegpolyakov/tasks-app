import type { Task } from '@olegpolyakov/tasks-core';

import { API_URL } from '@/shared/constants';

export async function fetchTasks(): Promise<Task[]> {
    const response = await fetch(`${API_URL}/tasks`);

    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }

    return response.json();
}

export async function createTask(data: Partial<Task>): Promise<Task> {
    const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Failed to create task');
    }

    return response.json();
}

export async function updateTask(id: string, data: Partial<Task>): Promise<Task> {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Failed to update task');
    }

    return response.json();
}

export async function toggleTask(id: string, completed: boolean): Promise<Task> {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed })
    });

    if (!response.ok) {
        throw new Error('Failed to toggle task');
    }

    return response.json();
}

export async function deleteTask(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error('Failed to delete task');
    }
}