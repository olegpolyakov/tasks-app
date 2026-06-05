import { AuthProvider } from '@/features/auth';
import { SettingsProvider } from '@/features/settings';
import { TagsProvider } from '@/features/tags';
import { TasksProvider } from '@/features/tasks';
import { AUTH_URL } from '@/shared/env';

export default function AppDataProvider({ children }: {children: React.ReactNode}) {
    return (
        <AuthProvider apiUrl={AUTH_URL}>
            <SettingsProvider>
                <TasksProvider>
                    <TagsProvider>
                        {children}
                    </TagsProvider>
                </TasksProvider>
            </SettingsProvider>
        </AuthProvider>
    );
}