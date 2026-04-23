import { useCallback, useEffect } from 'react';

import { useAtom } from 'jotai';

import type { List } from '@olegpolyakov/tasks/core';

import * as api from '../api';
import { listsAtom } from '../atoms';

export default function useLists() {
    const [lists, setLists] = useAtom(listsAtom);

    useEffect(() => {
        api.fetchLists().then(setLists);
    }, [setLists]);

    const createList = useCallback(async (data: Partial<List>) => {
        const nextList = await api.createList(data);

        setLists(prevLists => [...prevLists, nextList]);
    }, [setLists]);

    const updateList = useCallback(async (id: string, data: Partial<List>) => {
        const updatedList = await api.updateList(id, data);

        setLists(prevLists => prevLists.map(list => list.id === id ? updatedList : list));
    }, [setLists]);

    const deleteList = useCallback(async (id: string) => {
        await api.deleteList(id, { deleteTasks: false });

        setLists(prevLists => prevLists.filter(list => list.id !== id));
    }, [setLists]);

    return {
        lists,
        createList,
        updateList,
        deleteList
    };
}