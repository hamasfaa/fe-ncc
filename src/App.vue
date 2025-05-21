<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import { onMounted, watch } from "vue";
import { useAuthStore } from "./stores/authStore";
import { useApiStore } from "./stores/apiStore";
import { useWebsocketStore } from "./stores/websocketStore";

const AUTH_STORE = useAuthStore();
const API_STORE = useApiStore();
const WEBSOCKET_STORE = useWebsocketStore();

onMounted(async () => {
  if (!AUTH_STORE.checkAuth) return;

  await API_STORE.getUser();
  await API_STORE.getGroupChat();
  await API_STORE.getGlobalChat();

  WEBSOCKET_STORE.connect();
});

watch(
  () => AUTH_STORE.token,
  (newToken) => {
    if (newToken) {
      WEBSOCKET_STORE.token = newToken;
      WEBSOCKET_STORE.connect();
    }
  }
);
</script>

<template>
  <RouterView />
</template>
