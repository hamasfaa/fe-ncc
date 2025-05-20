<template>
  <form class="space-y-4" @submit.prevent="handleRegister">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1"
        >Username</label
      >
      <input
        type="text"
        v-model="registerForm.username"
        required
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
      <input
        type="email"
        v-model="registerForm.email"
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
        v-model="registerForm.password"
        required
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <button
        type="submit"
        class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Register
      </button>
    </div>
  </form>
  <div v-if="registerError" class="text-red-500 mt-2">
    {{ registerError }}
  </div>
  <div v-if="registerSuccess" class="text-green-500 mt-2">
    {{ registerSuccess }}
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
  data() {
    return {
      registerForm: {
        username: "",
        email: "",
        password: "",
      },
      registerError: "",
      registerSuccess: "",
    };
  },
  methods: {
    async handleRegister() {
      try {
        this.registerError = "";
        this.registerSuccess = "";
        await this.AUTH_STORE.register(this.registerForm);

        this.registerSuccess =
          "Registration successful! Please confirm your email to activate your account.";
        this.registerForm = { username: "", email: "", password: "" };
      } catch (error) {
        this.registerError =
          error.message || "Registration failed. Please try again.";
      }
    },
  },
};
</script>
