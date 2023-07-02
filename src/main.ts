import { createSSRApp } from "vue";
import App from "./App.vue";
import uviewPlus from 'uview-plus';

import '@/static/css/style.scss'

// pinia
import { createPinia } from 'pinia'
const pinia = createPinia()

// unocss
import 'virtual:uno.css'

export function createApp() {
  const app = createSSRApp(App);
  app.use(pinia)
  app.use(uviewPlus)
  return {
    app,
  };
}


