import './assets/index.css'
import 'iconify-icon'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { error } from 'console'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
