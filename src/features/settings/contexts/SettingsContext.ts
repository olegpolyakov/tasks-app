import { createContext, useContext } from 'react';

import type { Settings } from '@olegpolyakov/tasks/core';

export type SettingsContext = {
    settings: Settings;
    updateSettings: (data: Partial<Settings>) => Promise<void>;
};

const SettingsContext = createContext<SettingsContext>(null! as SettingsContext);

export function useSettingsContext() {
    const context = useContext(SettingsContext);
    
    if (!context) {
        throw new Error('useSettingsContext must be used within a SettingsProvider');
    }
    
    return context;
}

export default SettingsContext;