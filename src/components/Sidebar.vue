<template>
  <div class="w-64 h-screen flex flex-col bg-gray-100 border-r border-gray-200">
    <div class="p-4 border-b border-gray-200">
      <h2 class="text-xl font-semibold text-gray-800 mb-3">Chats</h2>
      <div class="relative flex items-center mb-3">
        <input
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
        </button>
      </div>
      <div class="flex space-x-2">
        <button
          class="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md"
        >
          Create Group
        </button>
        <button
          class="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md"
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

    <div class="p-3 border-t border-gray-200 bg-gray-50 mt-auto">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div
            class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white"
          >
            <span></span>
          </div>
          <div class="flex flex-col">
            <span class="font-medium text-sm text-gray-800">Loading...</span>
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

export default {
  setup() {
    const AUTH_STORE = useAuthStore();
    return {
      AUTH_STORE,
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
