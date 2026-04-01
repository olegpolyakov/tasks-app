import { ProjectsProvider } from '@/features/projects';
import { TagsProvider } from '@/features/tags';
import { TasksProvider } from '@/features/tasks';

export default function DataProvider({ children }: {children: React.ReactNode}) {
    return (
        <TasksProvider>
            <TagsProvider>
                <ProjectsProvider>
                    {children}
                </ProjectsProvider>
            </TagsProvider>
        </TasksProvider>
    );
}