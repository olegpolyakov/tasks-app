import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react';
import { isSortable, useSortable } from '@dnd-kit/react/sortable';
import { Badge, Box, Checkbox, Flex, Item, List, Pill, type PillProps,Text } from 'kantanui';

import { type Task, TaskPriority } from '@olegpolyakov/tasks-core';

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
    onReorder
}: {
    tasks: Task[];
    selectedTask?: Task;
    onSelect: (task: Task) => void;
    onToggle: (id: string, completed: boolean) => void;
    onDelete: (id: string) => void;
    onReorder?: (tasks: Task[]) => void;
}) {
    const handleDragEnd: DragEndEvent = event => {
        if (event.canceled) return;

        const { source } = event.operation;

        if (isSortable(source)) {
            const { initialIndex, index } = source;

            if (initialIndex !== index) {
                const newTasks = tasks.slice();
                const [removed] = newTasks.splice(initialIndex, 1);
                newTasks.splice(index, 0, removed);
                
                onReorder?.(newTasks);
            }
        }
    };

    return (
        <DragDropProvider
            onDragEnd={handleDragEnd}
        >
            <List gap="s" interactive>
                {tasks?.map((task, index) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        index={index}
                        selected={selectedTask?.id === task.id}
                        onSelect={onSelect}
                        onToggle={onToggle}
                    />
                ))}
            </List>
        </DragDropProvider>
    );
}

function TaskItem({
    task,
    index,
    selected,
    onSelect,
    onToggle,
    ...props
}: {
    task: Task;
    index: number;
    selected: boolean;
    onSelect: (task: Task) => void;
    onToggle: (id: string, completed: boolean) => void;
}) {
    const { ref } = useSortable({ id: task.id, index });
    
    return (
        <Item
            ref={ref}
            content={
                <Flex column gap="xxs">
                    <Text
                        as="span"
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

                            {task.priority !== undefined && (
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
            shape="rounded-s"
            variant="plain"
            active={selected}
            onClick={() => onSelect(task)}
            {...props}
        />
    );
}