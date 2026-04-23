import type { Settings } from '@olegpolyakov/tasks/core';

import { API_URL } from '@/shared/constants';

export async function fetchSettings(id: string): Promise<Settings> {
    return fetch(`${API_URL}/settings/${id}`).then(res => res.json());
}

export async function updateSettings(id: string, data: Partial<Settings>) {
    return fetch(`${API_URL}/settings/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json());
}