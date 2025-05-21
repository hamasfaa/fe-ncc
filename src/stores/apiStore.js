import api from "@/service/api";
import { defineStore } from 'pinia';

export const useApiStore = defineStore('api', {
    state: () => ({
        token: localStorage.getItem('authToken') || null,
        activeConversation: {
            id: '00000000-0000-0000-0000-000000000001',
            type: 'global',
            name: 'Global Chat'
        },
        listGroups: [],
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
        },

        async getGroupChat() {
            try {
                console.log('Fetching group chats...');
                const response = await api.get('chats/groups');

                if (response.status !== 200) {
                    throw new Error('Failed to fetch group chats');
                }

                const { data } = response;
                for (const group of data.groups) {
                    const chatItem = {
                        id: group.id,
                        name: group.name,
                        type: 'group',
                        lastMessage: group.last_message ? group.last_message : 'No messages yet'
                    };
                    this.listGroups.push(chatItem);
                }
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        }
    }
})
