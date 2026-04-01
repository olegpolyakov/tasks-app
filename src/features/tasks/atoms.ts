import type { Task } from '@olegpoliakov/tasks-core';
import { atom } from 'jotai';

export const tasksAtom = atom<Task[]>([]);
export const taskAtom = atom<Task | null>(null);