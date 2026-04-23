import { type ReactNode, useMemo } from 'react';

import { SettingsContext } from '../contexts';
import { useSettings } from '../hooks';

export default function SettingsProvider({ children }: {children: ReactNode}) {
    const {
        settings,
        updateSettings
    } = useSettings();

    const value = useMemo(() => ({
        settings: settings!,
        updateSettings
    }), [
        settings,
        updateSettings
    ]);

    if (!settings) return null;

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
}