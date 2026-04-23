import type { Settings } from '@olegpolyakov/tasks/core';
import { atom } from 'jotai';

export const settingsAtom = atom<Settings | null>(null);