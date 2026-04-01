import type { Project } from '@olegpoliakov/core';
import { atom } from 'jotai';

export const projectsAtom = atom<Project[]>([]);