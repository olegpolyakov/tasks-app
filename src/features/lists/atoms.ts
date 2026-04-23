import { atom } from 'jotai';

import type { List } from '@olegpolyakov/tasks/core';

export const listsAtom = atom<List[]>([]);
export const listAtom = atom<List | null>(null);