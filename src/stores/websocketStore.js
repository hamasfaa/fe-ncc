import { defineStore } from 'pinia';
import { useAuthStore } from './authStore';
import { useModalStore } from './modalStore';
import { useApiStore } from './apiStore';

const API_URL = "http://34.101.160.231:8000";

export const useWebsocketStore = defineStore('websocket', {
    state: () => ({
        ws: null,
        token: localStorage.getItem('authToken') || null,
        activeConversation: null
    }),

    getters: {
        isConnected: (state) => state.ws && state.ws.readyState === WebSocket.OPEN,
    },

    actions: {
        connect() {
            console.log(this.ws);
            if (!this.token) return;

            if (this.ws) this.ws.close();

            // this.ws = new WebSocket(`ws://${API_URL.replace(/^http(s)?:\/\//, '')}/ws?token=${this.token}`);
            const wsUrl = `ws://${API_URL.replace(/^http(s)?:\/\//, '')}/ws?token=${this.token}`;
            this.ws = new WebSocket(wsUrl);
            this.ws.onopen = () => {
                console.log('WebSocket connected');
            };


            this.ws.onmessage = (event) => {
                const data = JSON.parse(event.data);

                const AUTH_STORE = useAuthStore();
                const MODAL_STORE = useModalStore();
                const API_STORE = useApiStore();
                const currentUser = AUTH_STORE.currentUser;

                console.log('WebSocket message received:', data);

                if (data.type === 'text') {
                    if (data.conversation_id === API_STORE.activeConversation.id) {
                        if (data.sender_id !== currentUser.id) {
                            MODAL_STORE.listMessages.push({
                                message_id: data.id,
                                sender_id: data.sender_id,
                                sender: data.sender.username,
                                content: data.content,
                                timestamp: data.created_at,
                                type: 'text',
                            });
                        }
                    }
                } else if (data.type === 'poll') {
                    if (data.conversation_id === API_STORE.activeConversation.id) {
                    }
                } else if (data.type == 'user_status') {

                }
            }

            this.ws.onerror = (event) => {
                console.error('WebSocket error:', event);
            };

            this.ws.onclose = () => {
                console.log('WebSocket closed');
                setTimeout(() => {
                    this.connect();
                }, 3000)
            };
        },

        disconnect() {
            if (this.ws) {
                console.log('Disconnecting WebSocket');
                this.ws.close();
                this.ws = null;
            }
        },
    }
})