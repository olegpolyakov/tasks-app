import type { User } from './types';

export function authenticate(): Promise<User> {
    return fetch('http://localhost:3000/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(res => {
        return res.ok
            ? Promise.resolve(res.json() as Promise<User>)
            : Promise.reject(res.json() as Promise<{ message: string }>);
    });
}