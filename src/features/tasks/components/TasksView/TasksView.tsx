import type { ReactNode } from 'react';

import { Heading, State } from 'kantanui';

import NoTasksImage from '../../assets/no-tasks.svg';
import { TaskInput, TasksList } from '../../components';
import { useTaskContext, useTasksContext } from '../../contexts';

import styles from './TasksView.module.scss';

export default function TasksView({ children }: {children?: ReactNode}) {
    const {
        heading,
        tasks,
        createTask,
        toggleTask,
        deleteTask
    } = useTasksContext();
    
    const { task: selectedTask, setTask } = useTaskContext();

    return (
        <div className={styles.root}>
            <div className={styles.main}>
                <div className={styles.header}>
                    <Heading
                        content={heading}
                    />
                </div>
                
                <div className={styles.body}>
                    {tasks.length > 0 ?
                        <div className={styles.content}>
                            <TasksList
                                tasks={tasks}
                                selectedTask={selectedTask}
                                onSelect={setTask}
                                onToggle={toggleTask}
                                onDelete={deleteTask}
                            />
                        </div>
                        :
                        <State
                            className={styles.empty}
                            image={<NoTasksImage />}
                            title="No tasks"
                            description="You don't have any tasks yet. Create your first task to get started!"
                        />
                    }
                </div>
            
                <div className={styles.footer}>
                    <TaskInput onSubmit={createTask} />
                </div>
            </div>

            {children}
        </div>
    );
}