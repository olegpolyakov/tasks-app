import { useCallback, useEffect } from 'react';

import type { Tag } from '@olegpoliakov/core/entities';
import { useAtom } from 'jotai';

import * as api from '../api';
import { tagsAtom } from '../atoms';

export default function useTags() {
    const [tags, setTags] = useAtom(tagsAtom);

    useEffect(() => {
        api.fetchTags().then(setTags);
    }, [setTags]);

    const createTag = useCallback(async (data: Partial<Tag>) => {
        const nextTag = await api.createTag(data);

        setTags(prevTags => [...prevTags, nextTag]);
    }, [setTags]);

    const updateTag = useCallback(async (id: string, data: Partial<Tag>) => {
        const updatedTag = await api.updateTag(id, data);

        setTags(prevTags => prevTags.map(tag => tag.id === id ? updatedTag : tag));
    }, [setTags]);

    const deleteTag = useCallback(async (id: string) => {
        await api.deleteTag(id);

        setTags(prevTags => prevTags.filter(tag => tag.id !== id));
    }, [setTags]);

    return {
        tags,
        createTag,
        updateTag,
        deleteTag
    };
}