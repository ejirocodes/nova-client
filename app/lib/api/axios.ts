import axios from 'axios';

export const API_CLIENT = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000,
});
