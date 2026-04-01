import { BrowserRouter as Router, Navigate,Route, Routes } from 'react-router-dom';

import { Provider as UIProvider, Text } from 'kantanui';

import { Project, ProjectCreateAction, ProjectsNav } from '@/features/projects';
import { Tag, TagsNav } from '@/features/tags';
import { Tasks, TasksNav } from '@/features/tasks';

import AppContent from './components/AppContent';
import AppNav from './components/AppNav';
import { DataProvider } from './providers';

import styles from './App.module.scss';

export default function App() {
    return (
        <Router>
            <UIProvider>
                <DataProvider>
                    <div className={styles.root}>
                        <AppNav>
                            <TasksNav />

                            <Text
                                content="Tags"
                                color="secondary"
                                size="xs"
                                decorative
                            />
                            <TagsNav />

                            <Text
                                content="Projects"
                                end={<ProjectCreateAction icon="add" size="xs" />}
                                color="secondary"
                                size="xs"
                                decorative
                            />
                            <ProjectsNav />
                        </AppNav>

                        <AppContent>
                            <Routes>
                                <Route
                                    index
                                    element={<Navigate to="/today" replace />}
                                />

                                <Route
                                    path="/:filter"
                                    element={<Tasks />}
                                />

                                <Route
                                    path="/projects/:projectId"
                                    element={<Project />}
                                />

                                <Route
                                    path="/tags/:tagId"
                                    element={<Tag />}
                                />
                            </Routes>
                        </AppContent>
                    </div>
                </DataProvider>
            </UIProvider>
        </Router>
    );
}