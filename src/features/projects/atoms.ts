import type { Project } from '@olegpoliakov/tasks/core';
import { atom } from 'jotai';

export const projectsAtom = atom<Project[]>([]);