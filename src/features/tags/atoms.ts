import { atom } from 'jotai';

import { type Tag } from '@olegpolyakov/tasks-core';

export const tagsAtom = atom<Tag[]>([]);
export const tagAtom = atom<Tag | null>(null);