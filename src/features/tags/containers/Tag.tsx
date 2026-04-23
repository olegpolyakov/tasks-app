import { useParams } from 'react-router-dom';

import { ButtonGroup } from 'kantanui';

import { TaskProvider, TasksView } from '@/features/tasks';
import EntityIcon from '@/shared/components/EntityIcon';

import { TagDeleteAction, TagEditAction } from '../components';
import { useTag } from '../hooks';
import { TagTasksProvider } from '../providers';

export default function Tag() {
    const { tagId = '' } = useParams();
    const { tag } = useTag(tagId);

    if (!tag) return null;
    
    return (
        <TagTasksProvider tag={tag}>
            <TaskProvider>
                <TasksView
                    id={tag.id}
                    heading={{
                        start: <EntityIcon icon={tag.icon || 'tag'} />,
                        content: tag.name
                    }}
                    actions={
                        <ButtonGroup gap="s">
                            <TagEditAction
                                tag={tag}
                                icon="edit"
                            />

                            <TagDeleteAction
                                tag={tag}
                                icon="delete"
                            />
                        </ButtonGroup>
                    }
                />
            </TaskProvider>
        </TagTasksProvider>
    );
}