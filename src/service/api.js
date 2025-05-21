import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://34.101.160.231:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const AUTH_STORE = useAuthStore();
    if (AUTH_STORE.token) {
        config.headers.Authorization = `Bearer ${AUTH_STORE.token}`;
    }
    return config;
});

export default api;