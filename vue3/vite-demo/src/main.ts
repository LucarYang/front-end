import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'

import CardVue from './components/Card.vue'

export const app=createApp(App)

app.component('Card',CardVue)
app.mount('#app')
// createApp(App).mount('#app')
