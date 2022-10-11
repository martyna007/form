import { createApp } from 'vue'
import {createRouter, createWebHashHistory, Router, RouteRecordRaw} from 'vue-router'
import Form from './pages/Form.vue'
import Profile from './pages/Profile.vue'
import App from './App.vue'
import './styles/main.css'

const routes: RouteRecordRaw[] = [
  { path: '/', component: Form, name: 'Form' },
  { path: '/profile', component: Profile, name: 'Profile' }
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#vue')