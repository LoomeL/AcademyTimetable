import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import './assets/common.scss'

import './assets/bootstrap.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'

import 'bootstrap/dist/js/bootstrap.min.js'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
