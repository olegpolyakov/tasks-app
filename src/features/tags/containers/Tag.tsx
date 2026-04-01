import { TaskProvider, TasksView, TaskView } from '@/features/tasks';

import { TagTasksProvider } from '../providers';

export default function Tag() {
    return (
        <TagTasksProvider>
            <TaskProvider>
                <TasksView>
                    <TaskView />
                </TasksView>
            </TaskProvider>
        </TagTasksProvider>
    );
}