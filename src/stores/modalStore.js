import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
    state: () => ({
        isCreate: false,
    }),

    actions: {
        toggleCreate() {
            this.isCreate = !this.isCreate;
        }
    }

})