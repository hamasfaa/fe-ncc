<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 bg-transparant bg-opacity-50 items-center justify-center z-50 flex"
    >
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div
          class="flex items-center justify-between border-b border-gray-200 px-6 py-4"
        >
          <h3 class="text-xl font-semibold text-gray-800">Create Group</h3>
          <button
            class="text-gray-500 hover:text-gray-700 focus:outline-none"
            @click="MODAL_STORE.toggleCreate"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div class="p-6">
          <form class="space-y-4" @submit.prevent="handleCreateGroup">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Name</label
              >
              <input
                type="text"
                v-model="groupName"
                placeholder="Fill a name group..."
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div class="pt-2">
              <button
                type="submit"
                class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create Group
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import { useModalStore } from "@/stores/modalStore";
import { useApiStore } from "@/stores/apiStore";

export default {
  setup() {
    const MODAL_STORE = useModalStore();
    const API_STORE = useApiStore();
    return {
      MODAL_STORE,
      API_STORE,
    };
  },
  data() {
    return {
      groupName: "",
    };
  },
  methods: {
    async handleCreateGroup() {
      try {
        await this.API_STORE.createGroup(this.groupName);
        this.groupName = "";
      } finally {
        this.MODAL_STORE.toggleCreate();
      }
    },
  },
};
</script>
