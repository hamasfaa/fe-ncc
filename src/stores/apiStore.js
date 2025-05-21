import api from "@/service/api";
import { defineStore } from 'pinia';
import { useAuthStore } from "./authStore";

export const useApiStore = defineStore('api', {
    state: () => ({
        token: localStorage.getItem('authToken') || null,
        activeConversation: {
            id: null,
            type: 'global',
            name: 'Global Chat',
            desc: 'Global Chat',
        },
        globalChat: {
            id: null,
            type: null,
            name: null,
            desc: null,
        },
        listGroups: [],
        listUsers: [],
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
                    // console.log(chatItem);
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

                this.globalChat.id = data.globalChat.id;
                this.globalChat.name = data.globalChat.name;
                this.globalChat.type = 'global';

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

        async getUser() {
            try {
                const AUTH_STORE = useAuthStore();
                const userId = AUTH_STORE.user.id;

                const response = await api.get('users');

                if (response.status !== 200) {
                    throw new Error('Failed to fetch users');
                }

                const data = response.data;

                this.listUsers = data.users.filter(user => user.id !== userId);
                // console.log(this.listUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
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
        },

        async createPoll({ question, options, isMultipleChoice, expiresAt }) {
            try {
                // console.log('Creating poll:', question, options, isMultipleChoice, expiresAt);
                const response = await api.post(`chats/${this.activeConversation.id}/polls`, {
                    question,
                    options,
                    is_multiple_choice: isMultipleChoice,
                    expires_at: expiresAt
                });

                if (response.status !== 201) {
                    throw new Error('Failed to create poll');
                }
            } catch (error) {
                console.error('Error creating poll:', error);
            }
        },

        async createOrGetPrivateChat(userId) {
            try {
                const response = await api.post('chats/personal', {
                    user_id: userId
                })

                const data = response.data;
                console.log("Private chat data:", response);

                return data.conversation
            } catch (error) {
                console.error('Error creating or getting private chat:', error);
            }
        },

        async getConversationMessages(id) {
            try {
                const response = await api.get(`chats/${id}/messages`);

                if (response.status !== 200) {
                    throw new Error('Failed to fetch conversation');
                }

                const data = response.data;

                return data;
            } catch (error) {
                console.error('Error fetching conversation messages:', error);
            }
        },

        async submitPollVote(pollId, optionId) {
            try {
                const response = await api.post(`polls/${pollId}/vote`, {
                    option_id: optionId
                })
                if (response.status !== 200) {
                    throw new Error('Failed to submit poll vote');
                }
            } catch (error) {
                console.error('Error submitting poll vote:', error);
            }
        }
    }
})
