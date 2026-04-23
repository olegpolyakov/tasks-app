import { useCallback, useEffect } from 'react';

import { useAtom } from 'jotai';

import type { Tag } from '@olegpolyakov/tasks/core';

import * as api from '../api';
import { tagAtom } from '../atoms';

export default function useTag(tagId: string) {
    const [tag, setTag] = useAtom(tagAtom);

    useEffect(() => {
        api.fetchTag(tagId).then(setTag);
    }, [tagId, setTag]);

    const updateTag = useCallback(async (data: Partial<Tag>) => {
        const updatedTag = await api.updateTag(tagId, data);
        setTag(updatedTag);
    }, [tagId, setTag]);

    const deleteTag = useCallback(async () => {
        await api.deleteTag(tagId);
        setTag(null);
    }, [tagId, setTag]);

    return {
        tag,
        updateTag,
        deleteTag
    };
}