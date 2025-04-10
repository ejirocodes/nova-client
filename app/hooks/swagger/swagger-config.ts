import { useMemo } from 'react';
import type { Configuration } from '~/lib/client';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const useSwaggerConfig = (): Configuration => {
    return useMemo(
        () => ({
            basePath: baseURL.endsWith('/')
                ? baseURL.substring(0, baseURL.length - 1)
                : baseURL,
            isJsonMime(): boolean {
                return false;
            },
        }),
        [],
    );
};