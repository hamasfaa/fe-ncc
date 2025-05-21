import { defineStore } from 'pinia';
import { useApiStore } from './apiStore';

export const useModalStore = defineStore('modal', {
    state: () => ({
        isCreate: false,
        isJoin: false,
        section: "group",
        listMessages: []
    }),

    actions: {
        toggleCreate() {
            this.isCreate = !this.isCreate;
        },
        toggleJoin() {
            this.isJoin = !this.isJoin;
        },
        async switchToChat(chatId, chatType, chatName) {
            const API_STORE = useApiStore();
            API_STORE.activeConversation.id = chatId;
            API_STORE.activeConversation.type = chatType;
            API_STORE.activeConversation.name = chatName;

            if (chatType === 'group') {
                API_STORE.activeConversation.desc = "Group Chat";
            } else if (chatType === 'private') {
                API_STORE.activeConversation.desc = "Private Chat";
            } else {
                API_STORE.activeConversation.desc = "Global Chat";
            }

            try {
                const response = await API_STORE.getConversationMessages(chatId);
                const messages = response.messages;
                this.listMessages = [];

                messages.forEach(message => {
                    try {
                        console.log("message", message);

                        if (message.message_type === 'text') {
                            this.listMessages.push({
                                message_id: message.id,
                                sender_id: message.sender?.id || 'Unknown',
                                sender: message.sender?.username || 'Unknown',
                                content: message.content || '',
                                timestamp: message.created_at || new Date().toISOString(),
                                type: 'text',
                            });
                        } else if (message.message_type === 'poll') {
                            const poll = message.polls;
                            this.listMessages.push({
                                poll_id: poll.id,
                                sender_id: message.sender?.id || 'Unknown',
                                message_id: message.id,
                                question: message.content || '',
                                sender: message.sender?.username || 'Unknown',
                                options: Array.isArray(poll.poll_options)
                                    ? poll.poll_options.map(opt => ({
                                        id: opt.id,
                                        text: opt.option_text || ''
                                    }))
                                    : [],
                                is_multiple_choice: !!poll.is_multiple_choice,
                                expires_at: poll.expires_at || null,
                                timestamp: message.created_at || new Date().toISOString(),
                                updated_results: Array.isArray(poll.votes) ? poll.votes : [],
                                type: 'poll',
                            });
                        }
                    } catch (error) {
                        console.error("Error processing message:", error, message);
                    }
                });
            } catch (error) {
                console.error("Failed to get conversation messages:", error);
            }
        }
    }

})