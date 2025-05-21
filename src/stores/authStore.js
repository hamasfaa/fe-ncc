import { defineStore } from 'pinia';
import api from "@/service/api";

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
                // console.log(email, password);
                const response = await api.post(`login`, {
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

        async register({ username, email, password }) {
            try {
                const response = await api.post(`register`, {
                    username,
                    email,
                    password
                });

                return response.data;
            } catch (error) {
                const message = error.response?.data?.error || 'Registration failed';
                throw new Error(message);
            }
        },

        logout() {
            this.user = null;
            this.token = null;

            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
        },

        checkAuth() {
            const token = localStorage.getItem('authToken');
            const user = JSON.parse(localStorage.getItem('user') || 'null');

            if (token && user) {
                this.token = token;
                this.user = user;
                return true;
            }

            return false;
        }
    }
});