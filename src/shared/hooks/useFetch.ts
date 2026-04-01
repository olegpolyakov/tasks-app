import { useCallback, useEffect, useRef, useState } from 'react';

export default function useFetch<T = unknown>(initUrl?: string, options?: RequestInit & { onInit?: boolean}) {
    const optionsRef = useRef(options);

    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const abortController = useRef<AbortController | null>(null);

    const fetch = useCallback(async (url: string, options?: RequestInit): Promise<T> => {
        abortController.current = new AbortController();
        
        return globalThis.fetch(url, {
            signal: abortController.current.signal,
            ...optionsRef.current,
            ...options
        })
            .then(res => res.json())
            .then(data => {
                setData(data);
                return data;
            })
            .catch(error => {
                if (error.name !== 'AbortError') {
                    setError(error);
                }
            });
    }, []);

    const cancel = useCallback(() => {
        abortController.current?.abort();
    }, []);

    useEffect(() => {
        if (initUrl && optionsRef.current?.onInit) {
            fetch(initUrl, optionsRef.current);
        }

        return () => {
            cancel();
        };
    }, [initUrl, fetch, cancel]);

    return {
        data,
        error,
        fetch,
        cancel
    };
}