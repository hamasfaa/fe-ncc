<template>
  <div class="w-full h-screen flex flex-col bg-white border-r border-gray-200">
    <header
      class="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-gray-100"
    >
      <div class="flex-1">
        <h2 class="text-lg font-semibold">
          {{ API_STORE.activeConversation.name }}
        </h2>
        <span class="text-sm text-gray-500">{{
          API_STORE.activeConversation.desc
        }}</span>
      </div>
      <div class="flex items-center">
        <button
          id="create-poll-btn"
          class="flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
          @click="MODAL_STORE.toggleCreatePoll"
        >
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
            class="mr-1.5"
          >
            <path d="M20 11.08V8l-6-6H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h6" />
            <path d="M14 2v6h6" />
            <path d="M18 14v4" />
            <path d="M18 22v-4" />
            <path d="M22 18h-4" />
            <path d="M14 18h4" />
          </svg>
          Create Poll
        </button>
      </div>
    </header>

    <div class="flex-1 overflow-y-auto p-4" ref="messagesContainer">
      <div class="space-y-4">
        <TransitionGroup name="message">
          <div
            v-for="(message, index) in MODAL_STORE.listMessages"
            :key="message.message_id || `msg-${index}`"
            class="message-item"
          >
            <!-- TEXT MESSAGE -->
            <div
              v-if="message.type === 'text'"
              :class="[
                'message',
                'flex',
                'flex-col',
                'max-w-3/4',
                'rounded-lg',
                'p-3',
                'shadow-sm',
                message.sender_id === AUTH_STORE.user.id
                  ? 'bg-blue-100 ml-auto'
                  : 'bg-white',
              ]"
            >
              <div
                :class="[
                  'message-header',
                  'flex',
                  'items-center',
                  'mb-1',
                  message.sender_id === AUTH_STORE.user.id ? 'justify-end' : '',
                ]"
              >
                <template v-if="message.sender_id === AUTH_STORE.user.id">
                  <span class="text-xs text-gray-500">{{
                    formatTime(message.timestamp)
                  }}</span>
                  <span class="ml-2 font-medium text-sm text-gray-800"
                    >You</span
                  >
                </template>
                <template v-else>
                  <span class="font-medium text-sm text-gray-800">{{
                    message.sender
                  }}</span>
                  <span class="ml-2 text-xs text-gray-500">{{
                    formatTime(message.timestamp)
                  }}</span>
                </template>
              </div>
              <div class="text-gray-700">
                {{ message.content }}
              </div>
            </div>

            <!-- POLL MESSAGE -->
            <div
              v-else-if="message.type === 'poll'"
              class="bg-white rounded-lg border border-gray-200 shadow-sm"
            >
              <div class="p-4 border-b border-gray-100">
                <h3 class="text-lg font-medium text-gray-800">
                  {{ message.question }}
                </h3>
                <span class="text-xs text-gray-500 mt-1 block">
                  {{ formatExpires(message.expires_at) }}
                </span>
              </div>

              <div class="p-4 space-y-2">
                <div v-for="opt in message.options" :key="opt.id">
                  <label class="flex flex-col cursor-pointer">
                    <div class="flex items-center mb-1">
                      <input
                        type="radio"
                        :name="'poll-' + message.poll_id"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span class="ml-2 text-sm text-gray-700">{{
                        opt.text
                      }}</span>
                    </div>

                    <div class="w-full mt-1">
                      <div
                        class="h-1.5 relative bg-gray-200 rounded-full w-full"
                      >
                        <div
                          class="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                          :style="{
                            width:
                              getPollPercentage(
                                opt.id,
                                message.updated_results
                              ) + '%',
                          }"
                        ></div>
                      </div>
                      <span class="text-xs text-gray-500 mt-0.5 block">
                        {{
                          getPollPercentage(opt.id, message.updated_results)
                        }}%
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <div
                class="px-4 py-3 bg-gray-50 rounded-b-lg flex items-center justify-between"
              >
                <span class="text-sm text-gray-500">
                  {{ getTotalVotes(message.updated_results) }} votes
                </span>
                <button
                  class="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-md opacity-50"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>

    <form
      class="flex items-center border-t border-gray-200 p-3 bg-gray-100"
      @submit.prevent="handleSendMessage"
    >
      <input
        type="text"
        v-model="message"
        placeholder="Type a message..."
        autocomplete="off"
        required
        class="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
      />
      <button
        type="submit"
        class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-r-md transition-colors"
      >
        Send
      </button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useModalStore } from "../stores/modalStore";
import { useApiStore } from "../stores/apiStore";

export default {
  setup() {
    const API_STORE = useApiStore();
    const MODAL_STORE = useModalStore();
    const AUTH_STORE = useAuthStore();

    const messagesContainer = ref(null);

    const scrollToBottom = () => {
      if (messagesContainer.value) {
        setTimeout(() => {
          messagesContainer.value.scrollTop =
            messagesContainer.value.scrollHeight;
        }, 50);
      }
    };

    watch(
      () => MODAL_STORE.listMessages.length,
      () => {
        scrollToBottom();
      }
    );

    onMounted(() => {
      scrollToBottom();
    });

    return {
      API_STORE,
      MODAL_STORE,
      AUTH_STORE,
      messagesContainer,
      scrollToBottom,
    };
  },

  data() {
    return {
      message: "",
    };
  },

  methods: {
    async handleSendMessage() {
      if (this.message.trim() === "") return;
      try {
        this.MODAL_STORE.listMessages.push({
          sender_id: this.AUTH_STORE.user.id,
          sender: this.AUTH_STORE.user.username,
          content: this.message,
          timestamp: new Date().toISOString(),
          type: "text",
        });
        await this.API_STORE.sendMessage(this.message);
        this.message = "";
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    },

    formatTime(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },

    formatExpires(expiresAt) {
      if (!expiresAt) return "No expiration";
      const date = new Date(expiresAt);
      return (
        "Expires at " +
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    },

    getPollPercentage(optionId, votes) {
      if (!votes || votes.length === 0) return 0;
      const total = votes.length;
      const count = votes.filter((v) => v.option_id === optionId).length;
      return ((count / total) * 100).toFixed(0);
    },

    getTotalVotes(votes) {
      return Array.isArray(votes) ? votes.length : 0;
    },
  },
};
</script>
