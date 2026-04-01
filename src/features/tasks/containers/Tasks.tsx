import { TasksView, TaskView } from '../components';
import { TaskProvider } from '../providers';

export default function Tasks() {
    return (
        <TaskProvider>
            <TasksView>
                <TaskView />
            </TasksView>
        </TaskProvider>
    );
}