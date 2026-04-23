import type { List } from '@olegpolyakov/tasks/core';

import { API_URL } from '@/shared/constants';

export async function fetchLists(): Promise<List[]> {
    return fetch(`${API_URL}/lists`).then(res => res.json());
}

export async function fetchList(id: string): Promise<List> {
    return fetch(`${API_URL}/lists/${id}`).then(res => res.json());
}

export async function createList(data: Partial<List>) {
    return fetch(`${API_URL}/lists`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json());
}

export async function updateList(id: string, data: Partial<List>) {
    return fetch(`${API_URL}/lists/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json());
}

export async function deleteList(id: string, options: { deleteTasks: boolean }) {
    return fetch(`${API_URL}/lists/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(options)
    }).then(res => res.json());
}