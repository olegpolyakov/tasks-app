import { atom } from 'jotai';

import type { Task } from '@olegpolyakov/tasks-core';

export const tasksAtom = atom<Task[]>([]);
export const taskAtom = atom<Task | null>(null);