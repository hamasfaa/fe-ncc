<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 bg-transparant bg-opacity-50 items-center justify-center z-50 flex"
    >
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div
          class="flex items-center justify-between border-b border-gray-200 px-6 py-4"
        >
          <h3 class="text-xl font-semibold text-gray-800">Create Poll</h3>
          <button
            class="text-gray-500 hover:text-gray-700 focus:outline-none"
            @click="MODAL_STORE.toggleCreatePoll"
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
          <form class="space-y-4" @submit.prevent="handleCreatePoll">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Question</label
              >
              <input
                type="text"
                v-model="pollQuestion"
                placeholder="Ask a question..."
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label class="block text-sm font-medium text-gray-700"
                  >Options</label
                >
                <button
                  type="button"
                  @click="addOption"
                  class="text-sm text-blue-600 hover:text-blue-800"
                >
                  + Add option
                </button>
              </div>

              <div
                v-for="(option, index) in pollOptions"
                :key="index"
                class="flex items-center space-x-2 mb-2"
              >
                <input
                  type="text"
                  v-model="pollOptions[index]"
                  :placeholder="`Option ${index + 1}`"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  v-if="pollOptions.length > 2"
                  type="button"
                  @click="removeOption(index)"
                  class="text-gray-500 hover:text-red-500"
                >
                  <svg
                    class="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
            </div>

            <div class="space-y-2">
              <div class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="allowMultiple"
                  v-model="allowMultiple"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  for="allowMultiple"
                  class="text-sm font-medium text-gray-700"
                  >Allow multiple selections</label
                >
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Expires in (hours, leave empty for no expiry)</label
              >
              <input
                type="number"
                v-model="expiryHours"
                min="0"
                placeholder="Hours until expiry"
                class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div class="pt-2">
              <button
                type="submit"
                class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create Poll
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
      pollQuestion: "",
      pollOptions: ["", ""],
      allowMultiple: false,
      expiryHours: null,
    };
  },
  methods: {
    addOption() {
      this.pollOptions.push("");
    },
    removeOption(index) {
      if (this.pollOptions.length > 2) {
        this.pollOptions.splice(index, 1);
      }
    },
    async handleCreatePoll() {
      const pollData = {
        question: this.pollQuestion,
        options: this.pollOptions,
        allowMultiple: this.allowMultiple,
        expiryHours: this.expiryHours,
      };

      try {
        await this.API_STORE.createPoll(pollData);
        this.MODAL_STORE.toggleCreatePoll();
        // this.MODAL_STORE.listMessages.push({
        //   sender_id: this.AUTH_STORE.user.id,
        //   question: question,
        //   sender: this.AUTH_STORE.user.username,
        //   options: options,
        //   is_multiple_choice: !!allowMultiple,
        //   expires_at: poll.expires_at || null,
        //   timestamp: new Date().toISOString(),
        //   updated_results: Array.isArray(poll.votes) ? poll.votes : [],
        //   type: "poll",
        // });
      } catch (error) {
        console.error("Error creating poll:", error);
      }
    },
  },
};
</script>
