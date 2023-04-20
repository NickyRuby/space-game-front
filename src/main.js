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

const app = createApp(App)

app.provide("store", store);
app.component('Timer', Timer);

registerPlugins(app)

app.mount('#app')


