import { useState } from 'react';

import type { Task } from '@olegpoliakov/tasks-core';
import { Checkbox, Field, Heading, Icon, Input, Textarea } from 'kantanui';

import Editable from '@/shared/components/Editable';

import { TaskTags } from '../../components';
import TaskPriority from '../TaskPriority';

import styles from './TaskDetails.module.scss';

export default function TaskDetails({
    task,
    onUpdate
}: {
    task: Task;
    onUpdate: (id: string, data: Partial<Task>) => void;
}) {
    const [content, setContent] = useState(task.content || '');

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <Heading
                    start={
                        <Checkbox
                            checked={task.completed}
                            onChange={({ checked }) => onUpdate(task.id, { completed: checked })}
                        />
                    }
                    content={
                        <Editable
                            content={task.title}
                            onBlur={title => onUpdate(task.id, { title })}
                        />
                    }
                    size="s"
                />
            </div>

            <div className={styles.content}>
                <Field label="Due Date">
                    <Input
                        type="datetime-local"
                        start={<Icon name="calendar_month" />}
                        placeholder="Due Date"
                        value={task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : ''}
                        onChange={({ value }) => onUpdate(task.id, { dueDate: new Date(value) })}
                    />
                </Field>

                <Field label="Description">
                    <Textarea
                        value={content}
                        onChange={({ value = '' }) => {
                            setContent(value);
                        }}
                        onBlur={() => onUpdate(task.id, { content })}
                    />
                </Field>

                <TaskPriority
                    priority={task.priority}
                    onChange={priority => onUpdate(task.id, { priority })}
                />

                <TaskTags
                    task={task}
                    onUpdate={onUpdate}
                />
            </div>
        </div>
    );
}