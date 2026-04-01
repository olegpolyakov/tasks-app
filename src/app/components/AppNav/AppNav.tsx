import type { ReactNode } from 'react';

import Logo from '@olegpoliakov/shared/assets/logo.svg';
import { Heading } from 'kantanui';

import styles from './AppNav.module.scss';

export default function AppNav({
    children
}: {
    children: ReactNode
}) {
    return (
        <div className={styles.root}>
            <Heading
                className={styles.heading}
                start={<Logo className={styles.logo} />}
                content="Tasks"
            />
            
            <div className={styles.body}>
                {children}
            </div>
        </div>
    );
}