import { createApp } from 'vue'
import App from './App.vue'

import '@/style.css'

import VueFormGenerator from '../src/main'

const app = createApp(App).use(VueFormGenerator)
app.mount('#app')
