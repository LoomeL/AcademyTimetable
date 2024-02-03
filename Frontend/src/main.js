import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/router.js'

import '@/bootstrap/bootstrap.scss'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import './fontawesome/css/all.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

import {useThemeStore} from "@/stores/theme.js";

useThemeStore().setTheme()

app.mount('#app')
