import type { MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';

import type { Tag } from '@olegpoliakov/core';
import { Badge, Button, Item, List, Menu, Text } from 'kantanui';

import { useTasksContext } from '@/features/tasks';
import EntityIcon from '@/shared/components/EntityIcon';

import { useTagsContext } from '../../contexts';

import styles from './TagsNav.module.scss';

export default function TagsNav() {
    const { tasks } = useTasksContext();
    const { tags, openTagDialog, deleteTag } = useTagsContext();

    const handleMenuClick = (event: MouseEvent) => {
        event.stopPropagation();
    };

    const handleEdit = (tag: Tag) => {
        openTagDialog(tag);
    };

    const handleDelete = (tag: Tag) => {
        if (confirm(`Are you sure you want to delete ${tag.name}?`)) {
            deleteTag(tag.id);
        }
    };

    return (
        <List className={styles.root} gap="s">
            {tags.map(tag => (
                <NavLink
                    key={tag.id}
                    className={styles.item}
                    to={`/tags/${tag.id}`}
                >
                    {({ isActive }) => (
                        <Item
                            key={tag.id}
                            start={<EntityIcon icon={tag.icon || 'tag'} />}
                            content={
                                <Text
                                    content={tag.name}
                                    end={
                                        <Badge
                                            content={tasks.filter(task => task.tagIds?.includes(tag.id)).length}
                                            size="s" 
                                            variant="tinted"
                                        />
                                    }
                                />
                            }
                            end={
                                <Menu
                                    trigger={
                                        <Button
                                            icon="more_vert"
                                            size="s"
                                            onClick={handleMenuClick}
                                        />
                                    }
                                    items={[
                                        {
                                            content: 'Edit',
                                            icon: 'edit',
                                            onClick: () => handleEdit(tag)
                                        },
                                        {
                                            content: 'Delete',
                                            icon: 'delete',
                                            onClick: () => handleDelete(tag)
                                        }
                                    ]}
                                    size="s"
                                />
                            }
                            variant="plain"
                            shape="rounded-s"
                            active={isActive}
                            interactive
                        />
                    )}
                </NavLink>
            ))}
        </List>
    );
}
