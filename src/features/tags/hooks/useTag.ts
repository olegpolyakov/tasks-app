import { useCallback, useEffect, useState } from 'react';

import type { Tag } from '@olegpoliakov/core';

import * as api from '../api';

export default function useTag(tagId: string) {
    const [tag, setTag] = useState<Tag | null>(null);

    useEffect(() => {
        api.fetchTag(tagId).then(setTag);
    }, [tagId]);

    const updateTag = useCallback(async (data: Partial<Tag>) => {
        await api.updateTag(tagId, data);
    }, [tagId]);

    const deleteTag = useCallback(async () => {
        await api.deleteTag(tagId);
    }, [tagId]);

    return {
        tag,
        updateTag,
        deleteTag
    };
}