import { type Task, TaskPriority } from '@olegpoliakov/tasks-core';
import { Badge, Box, Checkbox, Flex, Item, List, Pill, type PillProps,Text } from 'kantanui';

import ConfirmButton from '@/shared/components/ConfirmButton';

const priorityColors = {
    [TaskPriority.Low]: 'success',
    [TaskPriority.Medium]: 'brand',
    [TaskPriority.High]: 'danger'
};

const priorityLabels = {
    [TaskPriority.Low]: 'Low',
    [TaskPriority.Medium]: 'Medium',
    [TaskPriority.High]: 'High'
};

export default function TasksList({
    tasks,
    selectedTask,
    onSelect,
    onToggle,
    onDelete
}: {
    tasks: Task[];
    selectedTask?: Task;
    onSelect: (task: Task) => void;
    onToggle: (id: string, completed: boolean) => void;
    onDelete: (id: string) => void;
}) {
    return (
        <List gap="s" interactive>
            {tasks?.map(task => (
                <Item
                    key={task.id}
                    content={
                        <Flex column gap="xxs">
                            <Text
                                start={
                                    <Checkbox
                                        checked={task.completed}
                                        onChange={() => onToggle(task.id, !task.completed)}
                                        onClick={event => event.stopPropagation()}
                                    />
                                }
                                content={task.title}
                                color={task.completed ? 'tertiary' : 'primary'}
                                strikethrough={task.completed}
                            />

                            <Box style={{ marginLeft: '1.75rem' }}>
                                <Flex gap="xs">
                                    {task.dueDate && (
                                        <Text
                                            content={new Date(task.dueDate).toLocaleDateString()}
                                            size="xs"
                                            color="secondary"
                                        />
                                    )}

                                    {task.priority && (
                                        <Pill
                                            start={
                                                <Badge
                                                    color={priorityColors[task.priority] as PillProps['color']}
                                                    size="s"
                                                />
                                            }
                                            content={priorityLabels[task.priority]}
                                            color={priorityColors[task.priority] as PillProps['color']}
                                            size="s"
                                            variant="tinted"
                                        />
                                    )}
                                </Flex>
                            </Box>
                        </Flex>
                    }
                    end={
                        <div onClick={event => event.stopPropagation()}>
                            <ConfirmButton
                                icon="delete"
                                color="danger"
                                onConfirm={() => onDelete(task.id)}
                            />
                        </div>
                    }
                    shape="rounded-s"
                    variant="plain"
                    active={task.id === selectedTask?.id}
                    onClick={() => onSelect(task)}
                />
            ))}
        </List>
    );
}

