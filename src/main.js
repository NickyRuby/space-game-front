/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

import  store  from './store'
import Timer from '@/components/Timer.vue'
import MyHeader from './components/MyHeader.vue'

const app = createApp(App)

app.provide("store", store);
app.component('Timer', Timer);
app.component('MyHeader', MyHeader)

registerPlugins(app)

app.mount('#app')


