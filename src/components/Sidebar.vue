<template>
  <div class="w-64 h-screen flex flex-col bg-gray-100 border-r border-gray-200">
    <div class="p-4 border-b border-gray-200">
      <h2 class="text-xl font-semibold text-gray-800 mb-3">Chats</h2>
      <div class="relative flex items-center justify-between w-full mb-3">
        <!-- <input
          type="text"
          placeholder="Search users..."
          class="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button class="absolute right-2 text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-search"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button> -->
        <div class="flex items-center gap-2">
          <div class="px-3 py-1 bg-green-100 rounded-md text-sm">
            <span class="font-medium text-green-800">Online:</span>
            <span class="text-green-700">{{ API_STORE.active || 0 }}</span>
          </div>
          <div class="px-3 py-1 bg-blue-100 rounded-md text-sm">
            <span class="font-medium text-blue-800">Total:</span>
            <span class="text-blue-700">{{ API_STORE.members || 0 }}</span>
          </div>
        </div>
      </div>
      <div class="flex space-x-2">
        <button
          class="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md"
          @click="MODAL_STORE.toggleCreate"
        >
          Create Group
        </button>
        <button
          class="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md"
          @click="MODAL_STORE.toggleJoin"
        >
          Join Group
        </button>
      </div>
    </div>

    <div class="flex border-b border-gray-200">
      <button
        class="flex-1 py-2 px-4 font-medium text-blue-600 border-b-2 border-blue-600 active"
      >
        Channels
      </button>
      <button
        class="flex-1 py-2 px-4 font-medium text-gray-500 hover:text-blue-600"
      >
        Users
      </button>
    </div>

    <div class="flex-1 overflow-y-auto">
      <div
        v-if="API_STORE.listGroups.length === 0"
        class="p-3 text-center text-gray-500 text-sm"
      >
        Loading groups...
      </div>

      <div
        class="p-3 border-b border-gray-200 hover:bg-gray-200 cursor-pointer"
      >
        <div class="flex justify-between items-center">
          <h3 class="font-medium text-gray-800">
            {{ API_STORE.activeConversation.name }}
          </h3>
          <span class="text-xs text-gray-500">{{
            !API_STORE.activeConversation.type
              ? "Loading..."
              : API_STORE.activeConversation.type.charAt(0).toUpperCase() +
                API_STORE.activeConversation.type.slice(1)
          }}</span>
        </div>
        <p class="text-sm text-gray-500 truncate">Dummy</p>
      </div>

      <div
        v-for="group in API_STORE.listGroups"
        :key="group.id"
        class="p-3 border-b border-gray-200 hover:bg-gray-200 cursor-pointer"
      >
        <div class="flex justify-between items-center">
          <h3 class="font-medium text-gray-800">{{ group.name }}</h3>
          <span class="text-xs text-gray-500">{{
            group.type.charAt(0).toUpperCase() + group.type.slice(1)
          }}</span>
        </div>
        <p class="text-sm text-gray-500 truncate">{{ group.lastMessage }}</p>
      </div>
    </div>

    <div class="p-3 border-t border-gray-200 bg-gray-50 mt-auto">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div
            class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white"
          >
            <span></span>
          </div>
          <div class="flex flex-col">
            <span class="font-medium text-sm text-gray-800">
              {{
                AUTH_STORE.user.username
                  ? AUTH_STORE.user.username
                  : "Loading..."
              }}
            </span>
            <span class="text-xs text-green-500">online</span>
          </div>
        </div>
        <button
          class="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded-md"
          @click="handleLogout"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/authStore";
import { useApiStore } from "@/stores/apiStore";
import { useModalStore } from "@/stores/modalStore";

export default {
  setup() {
    const AUTH_STORE = useAuthStore();
    const API_STORE = useApiStore();
    const MODAL_STORE = useModalStore();
    return {
      AUTH_STORE,
      API_STORE,
      MODAL_STORE,
    };
  },
  methods: {
    handleLogout() {
      try {
        this.AUTH_STORE.logout();
        this.$router.push("/login");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    },
  },
};
</script>
