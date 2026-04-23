import type { Task } from '@olegpolyakov/tasks-core';
import { atom } from 'jotai';

export const tasksAtom = atom<Task[]>([]);
export const taskAtom = atom<Task | null>(null);