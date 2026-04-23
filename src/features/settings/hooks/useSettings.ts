import { useCallback, useEffect } from 'react';

import type { Settings } from '@olegpolyakov/tasks/core';
import { useAtom } from 'jotai';

import * as api from '../api';
import { settingsAtom } from '../atoms';

const SETTINGS_ID = '2ab72df0-f755-4b92-b423-712042ca438c';

export default function useSettings() {
    const [settings, setSettings] = useAtom(settingsAtom);

    useEffect(() => {
        api.fetchSettings(SETTINGS_ID).then(setSettings);
    }, [setSettings]);

    const settingsId = settings?.id;
    
    const updateSettings = useCallback(async (data: Partial<Settings>) => {
        if (!settingsId) {
            return;
        }

        const updatedSettings = await api.updateSettings(settingsId, data);

        setSettings(prevSettings => ({
            ...prevSettings,
            ...updatedSettings
        }));
    }, [settingsId, setSettings]);

    return {
        settings,
        updateSettings
    };
}