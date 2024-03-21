import {createApp} from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'

import './assets/common.scss'

import './assets/bootstrap.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'

import 'bootstrap/dist/js/bootstrap.min.js'
import {useSettingsStore} from "@/stores/settings.js";
import { initYandexMetrika } from 'yandex-metrika-vue3'

const app = createApp(App)

app.use(createPinia())
app.use(initYandexMetrika, {
  id: 96809317,
  env: process.env.NODE_ENV,
  clickmap:true,
  trackLinks:true,
  accurateTrackBounce:true
})

app.mount('#app')

const settingsStore = useSettingsStore()
document.body.setAttribute("data-bs-theme", settingsStore.settings.darkTheme ? 'dark' : '')