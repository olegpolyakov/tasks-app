import { createContext, useContext } from 'react';

import type { Tag } from '@olegpoliakov/core';

export type TagsContext = {
    tags: Tag[];
    createTag: (data: Partial<Tag>) => Promise<void>;
    updateTag: (id: string, data: Partial<Tag>) => Promise<void>;
    deleteTag: (id: string) => Promise<void>;

    isTagDialogOpen: boolean;
    openTagDialog: (tag: Tag | null) => void;
    closeTagDialog: () => void;
};

const TagsContext = createContext<TagsContext>(null! as TagsContext);

export function useTagsContext() {
    const context = useContext(TagsContext);
    
    if (!context) {
        throw new Error('useTagsContext must be used within a TagsProvider');
    }
    
    return context;
}

export default TagsContext;