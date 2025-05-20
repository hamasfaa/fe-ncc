<template>
  <form class="space-y-4" @submit.prevent="handleLogin">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
      <input
        type="email"
        v-model="loginForm.email"
        required
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1"
        >Password</label
      >
      <input
        type="password"
        v-model="loginForm.password"
        required
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <button
        type="submit"
        class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Login
      </button>
    </div>
  </form>
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
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
      loginError: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        this.loginError = "";
        await this.AUTH_STORE.login(this.loginForm);
        this.$router.push("/");
      } catch (error) {
        this.loginError = error.message || "Login failed. Please try again.";
      }
    },
  },
};
</script>
