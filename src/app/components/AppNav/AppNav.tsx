import type { ReactNode } from 'react';

import styles from './AppNav.module.scss';

export default function AppNav({
    children
}: {
    children: ReactNode
}) {
    return (
        <div className={styles.root}>
            <div className={styles.body}>
                {children}
            </div>
        </div>
    );
}