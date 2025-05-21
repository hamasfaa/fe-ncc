import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { useAuthStore } from './stores/authStore'
import { useApiStore } from './stores/apiStore'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const AUTH_STORE = useAuthStore();
const API_STORE = useApiStore();

async function initChatApp() {
    if (!AUTH_STORE.checkAuth) return;

    await API_STORE.getGroupChat();
    await API_STORE.getGlobalChat();
    await API_STORE.getUser();
}

initChatApp();


app.mount('#app')
