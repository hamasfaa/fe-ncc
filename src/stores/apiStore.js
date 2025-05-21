import api from "@/service/api";
import { defineStore } from 'pinia';

export const useApiStore = defineStore('api', {
    state: () => ({
        token: localStorage.getItem('authToken') || null,
        activeConversation: {
            id: '00000000-0000-0000-0000-000000000001',
            type: 'global',
            name: 'Global Chat'
        }
    }),

    actions: {
        async sendMessage(content) {
            try {
                const response = await api.post(`/chats/${this.activeConversation.id}/messages`, {
                    content
                });

                if (response.status !== 201) {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    }
})
