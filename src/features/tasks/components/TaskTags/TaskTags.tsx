import { useCallback } from 'react';

import type { Tag, Task } from '@olegpolyakov/tasks-core';

import { tagsApi, TagsInput } from '@/features/tags';

export default function TaskTags({
    task,
    onUpdate
}:{
    task: Task,
    onUpdate: (id: string, data: Partial<Task>) => void
}) {
    const handleAdd = useCallback(async (tag: Partial<Tag>) => {
        await tagsApi.createTag(tag)
            .then(newTag => {
                onUpdate(task.id, {
                    tagIds: [...task.tagIds, newTag.id]
                });
            }).catch(error => {
                console.error('Failed to create tag:', error);
            });
    }, [task, onUpdate]);

    const handleChange = useCallback(async (tags: Partial<Tag>[]) => {
        console.log('Selected tags:', tags);
        const newTagIds = tags.map(tag => tag.id).filter(id => id !== undefined) as string[];
        onUpdate(task.id, {
            tagIds: newTagIds
        });
    }, [task, onUpdate]);

    const handleRemove = useCallback(async (tag: Tag) => {
        onUpdate(task.id, {
            tagIds: task.tagIds.filter(id => id !== tag.id)
        });
    }, [task, onUpdate]);

    return (
        <div>
            <TagsInput
                tags={task.tags}
                onAdd={handleAdd}
                onRemove={handleRemove}
                onChange={handleChange}
            />
        </div>
    );
}