<template>
  <div class="w-full h-screen flex flex-col bg-white border-r border-gray-200">
    <header
      class="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-gray-100"
    >
      <div class="flex-1">
        <h2 class="text-lg font-semibold">Global Chat</h2>
        <span class="text-sm text-gray-500">Public channel for all users</span>
      </div>
      <div class="flex items-center">
        <button
          id="create-poll-btn"
          class="flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
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

    <div class="flex-1 overflow-y-auto p-4">
      <!-- Messages will be added here -->
    </div>

    <form class="flex items-center border-t border-gray-200 p-3 bg-gray-100">
      <input
        type="text"
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
