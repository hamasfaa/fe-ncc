<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Chat from "@/components/Chat.vue";
import GroupModal from "@/components/Modal/GroupModal.vue";
import { useModalStore } from "@/stores/modalStore";

const MODAL_STORE = useModalStore();
</script>

<template>
  <div class="flex">
    <Sidebar />
    <Chat />
    <GroupModal v-if="MODAL_STORE.isCreate" />
  </div>
</template>
