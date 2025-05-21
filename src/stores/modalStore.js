import { defineStore } from 'pinia';
import { useApiStore } from './apiStore';

export const useModalStore = defineStore('modal', {
    state: () => ({
        isCreate: false,
        isJoin: false,
        section: "group",
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
        }
    }

})