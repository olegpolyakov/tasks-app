import type { Tag } from '@olegpoliakov/core/entities';
import { atom } from 'jotai';

export const tagsAtom = atom<Tag[]>([]);