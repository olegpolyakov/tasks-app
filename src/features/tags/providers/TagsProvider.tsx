import { type ReactNode, useCallback, useMemo, useState } from 'react';

import { useAtom } from 'jotai';
import { Dialog } from 'kantanui';

import type { Tag } from '@olegpolyakov/tasks/core';

import { tagAtom } from '../atoms';
import { TagForm } from '../components';
import { TagsContext } from '../contexts';
import { useTags } from '../hooks';

export default function TagsProvider({ children }: {children: ReactNode}) {
    const {
        tags,
        createTag,
        updateTag,
        deleteTag
    } = useTags();

    const [tag, setTag] = useAtom(tagAtom);

    const [isTagDialogOpen, setTagDialogOpen] = useState(false);

    const handleSubmit = useCallback(async (data: Partial<Tag>) => {
        if (tag) {
            await updateTag(tag.id, data).then(setTag);
        } else {
            await createTag(data);
        }
        
        setTagDialogOpen(false);
    }, [tag, createTag, updateTag, setTag]);

    const value = useMemo(() => ({
        tags,
        createTag,
        updateTag,
        deleteTag,

        isTagDialogOpen: isTagDialogOpen,
        openTagDialog: (tag: Tag | null = null) => {
            setTag(tag);
            setTagDialogOpen(true);
        },
        closeTagDialog: () => {
            setTag(null);
            setTagDialogOpen(false);
        }
    }), [
        tags,
        setTag,
        createTag,
        updateTag,
        deleteTag,
        isTagDialogOpen
    ]);

    return (
        <TagsContext.Provider value={value}>
            {children}

            <Dialog
                title={tag ? `Edit "${tag.name}"` : 'New Tag'}
                open={isTagDialogOpen}
                onClose={() => setTagDialogOpen(false)}
            >
                <TagForm
                    data={tag || undefined}
                    onSubmit={handleSubmit}
                />
            </Dialog>
        </TagsContext.Provider>
    );
}