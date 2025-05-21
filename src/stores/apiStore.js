import api from "@/service/api";
import { defineStore } from 'pinia';

export const useApiStore = defineStore('api', {
    state: () => ({
        token: localStorage.getItem('authToken') || null,
        activeConversation: {
            id: null,
            type: null,
            name: null,
        },
        listGroups: [],
        active: null,
        members: null,
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
                    console.log(chatItem);
                }
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        },

        async getGlobalChat() {
            try {
                const response = await api.get('chats/global');

                if (response.status !== 200) {
                    throw new Error('Failed to fetch global chats');
                }

                const data = response.data

                this.activeConversation.id = data.globalChat.id;
                this.activeConversation.name = data.globalChat.name;
                this.activeConversation.type = 'global';

                await this.getGlobalChatStats();

                return data.globalChat;
            } catch (error) {
                console.error('Error fetching global chat:', error);
            }
        },

        async getGlobalChatStats() {
            try {
                const response = await api.get('chats/global/stats');

                if (response.status !== 200) {
                    throw new Error('Failed to fetch global chats');
                }

                const data = response.data
                this.active = data.stats.activeMembers
                this.members = data.stats.totalMembers
            } catch (error) {
                console.error('Error fetching global stats:', error);
            }
        },

        async createGroup(name) {
            try {
                const response = await api.post('chats/group', {
                    name
                });

                if (response.status !== 201) {
                    throw new Error('Failed to create group');
                }
            } catch (error) {
                console.error('Error creating group:', error);
            }
        },

        async joinGroup(name) {
            try {
                // console.log(name)
                const response = await api.post('chats/join', {
                    name
                });

                if (response.status !== 200) {
                    throw new Error('Failed to join group');
                }
            } catch (error) {
                console.error('Error joining group:', error);
            }
        }
    }
})
