import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as quasar from 'quasar'

import 'quasar/dist/quasar.css'

const { Notify, Dark, Dialog, Quasar, ...components } = quasar

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)
app.use(Quasar, {
  components,
  plugins: {
    Notify,
    Dark,
    Dialog,
  },
})
app.use(createPinia())
app.use(router)

app.mount('#app')
