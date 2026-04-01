import type { ReactNode } from 'react';

import styles from './AppContent.module.scss';

export default function AppContent({ children }: { children: ReactNode }) {
    return (<div className={styles.root}>{children}</div>);
}