<script setup>
import Login from "@/components/Login.vue";
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">
        Chat Application
      </h1>

      <div class="flex mb-6">
        <router-link
          to="/login"
          class="flex-1 py-2 text-center bg-blue-500 text-white font-medium rounded-tl-lg rounded-bl-lg"
        >
          Login
        </router-link>
        <router-link
          to="/register"
          class="flex-1 py-2 text-center bg-gray-200 text-gray-700 font-medium rounded-tr-lg rounded-br-lg hover:bg-gray-300 transition"
        >
          Register
        </router-link>
      </div>
      <Login />
    </div>
  </div>
</template>
