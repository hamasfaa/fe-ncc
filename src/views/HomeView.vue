<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Chat from "@/components/Chat.vue";
import CreateGroupModal from "@/components/Modal/CreateGroupModal.vue";
import { useModalStore } from "@/stores/modalStore";
import JoinGroupModal from "@/components/Modal/JoinGroupModal.vue";
import CreatePollModal from "@/components/Modal/CreatePollModal.vue";

const MODAL_STORE = useModalStore();
</script>

<template>
  <div class="flex">
    <Sidebar />
    <Chat />
    <CreateGroupModal v-if="MODAL_STORE.isCreate" />
    <JoinGroupModal v-if="MODAL_STORE.isJoin" />
    <CreatePollModal v-if="MODAL_STORE.isCreatePoll" />
  </div>
</template>
