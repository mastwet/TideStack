import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import Index from './views/index.vue'
import About from './views/about.vue'

const routes = [
  { path: '/', component: Index },
  { path: '/about', component: About }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router).mount('#app')
