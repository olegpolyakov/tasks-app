import { BrowserRouter as Router, Navigate,Route, Routes } from 'react-router-dom';

import { Button, Provider as UIProvider, Text } from 'kantanui';
import { Heading } from 'kantanui';

import Logo from '@olegpolyakov/frontend/assets/logo.svg';

import { List, ListCreateAction, ListsNav } from '@/features/lists';
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
                            <Heading
                                className={styles.heading}
                                start={<Logo className={styles.logo} />}
                                content="Tasks"
                                end={
                                    <Button
                                        icon="settings"
                                        title="Settings"
                                    />
                                }
                            />
            
                            <TasksNav />

                            <Text
                                content="Tags"
                                color="secondary"
                                size="xs"
                                decorative
                            />
                            <TagsNav />

                            <Text
                                content="Lists"
                                end={<ListCreateAction icon="add" size="xs" />}
                                color="secondary"
                                size="xs"
                                decorative
                            />
                            <ListsNav />
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
                                    path="/lists/:listId"
                                    element={<List />}
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