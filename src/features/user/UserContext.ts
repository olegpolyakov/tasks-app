import { createContext, useContext } from 'react';

import type { User } from './types';

export type UserContext = {
    user: User;
};

const UserContext = createContext<UserContext>(null! as UserContext);

export function useUserContext() {
    const context = useContext(UserContext);
    
    if (!context) {
        throw new Error('useUserContext must be used within an AuthProvider');
    }
    
    return context;
}

export default UserContext;