import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
    state: () => ({
        isCreate: false,
        isJoin: false,
    }),

    actions: {
        toggleCreate() {
            this.isCreate = !this.isCreate;
        },
        toggleJoin() {
            this.isJoin = !this.isJoin;
        },
    }

})