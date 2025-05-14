import type { AxiosInstance } from 'axios';
import type { Configuration } from '~/lib/client';
import { API_CLIENT } from '~/lib/api/axios';
import { useMemo } from 'react';
import { useAuth } from '@clerk/react-router';
import { useSwaggerConfig } from './swagger-config';

export const useSwaggerApiParams = (): [
    Configuration,
    string | undefined,
    AxiosInstance,
] => {
    const config = useSwaggerConfig();
    const apiClient = useMemo<AxiosInstance>(() => API_CLIENT, []);
    const { getToken } = useAuth();

    apiClient.interceptors.request.use(
        async (config) => {
            const token = await getToken();
            config.headers.authorization = `Bearer ${token}`;

            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    return [config, config.basePath, apiClient];
};