import type { Tag } from '@olegpoliakov/core/entities';

import { API_URL } from '@/shared/constants';

export async function fetchTags() {
    const response = await fetch(`${API_URL}/tags`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch tags');
    }

    return response.json() as Promise<Tag[]>;
}

export async function fetchTag(id: string): Promise<Tag> {
    return fetch(`${API_URL}/tags/${id}`).then(res => res.json());
}

export async function createTag({ name }: Partial<Tag>) {
    const response = await fetch(`${API_URL}/tags`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    });

    if (!response.ok) {
        throw new Error('Failed to create tag');
    }

    return response.json();
}

export async function updateTag(id: string, data: Partial<Tag>) {
    const response = await fetch(`${API_URL}/tags/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Failed to update tag');
    }

    return response.json();
}

export async function deleteTag(id: string) {
    const response = await fetch(`${API_URL}/tags/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error('Failed to delete tag');
    }
}