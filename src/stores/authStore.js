import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user') || 'null'),
        token: localStorage.getItem('authToken') || null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token && !!state.user,
        currentUser: (state) => state.user,
    },

    actions: {
        async login({ email, password }) {
            try {
                console.log(email, password);
                const response = await axios.post(`${API_URL}/login`, {
                    email,
                    password
                });

                const { token, user } = response.data;

                this.token = token;
                this.user = user;

                localStorage.setItem('authToken', token);
                localStorage.setItem('user', JSON.stringify(user));

                return true;
            } catch (error) {
                const message = error.response?.data?.error || 'Login failed';
                throw new Error(message);
            }
        },
    }
});