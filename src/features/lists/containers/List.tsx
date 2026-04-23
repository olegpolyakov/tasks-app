import { useParams } from 'react-router-dom';

import { TaskProvider, TasksView } from '@/features/tasks';

import { ListProvider } from '../providers';

export default function List() {
    const { listId = '' } = useParams<{ listId: string }>();

    return (
        <ListProvider listId={listId}>
            {({ list }) => (
                <TaskProvider>
                    <TasksView
                        id={listId}
                        heading={list.name}
                    />
                </TaskProvider>
            )}
        </ListProvider>
    );
}
