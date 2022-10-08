import { createApp } from 'vue'
import {createRouter, createWebHashHistory, Router, RouteRecordRaw} from 'vue-router'
import './style.css'
import Home from './pages/Home.vue'
import Profile from './pages/Profile.vue'
import App from './App.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: '/profile', component: Profile },
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#vue')
