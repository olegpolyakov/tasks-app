import { createContext, useContext } from 'react';

import type { Tag } from '@olegpolyakov/tasks/core';

export type TagContext = {
    tag: Tag;
    updateTag: (data: Partial<Tag>) => Promise<void>;
    deleteTag: () => Promise<void>;

    isTagDialogOpen: boolean;
    openTagDialog: () => void;
    closeTagDialog: () => void;
};

const TagContext = createContext<TagContext>(null! as TagContext);

export function useTagContext() {
    const context = useContext(TagContext);
    
    if (!context) {
        throw new Error('useTagContext must be used within a TagProvider');
    }
    
    return context;
}

export default TagContext;