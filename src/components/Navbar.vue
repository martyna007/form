<template>
  <div class="navbar">
    <span class="navbar--logo" @click="redirectTo('Home')" @mouseenter="rotate()" @mouseleave="rotateBack()">
      <img ref="logoEl" width="60" height="60" :src="Logo" alt="ArcticForm logo">
      <n-h1 prefix="bar">
      <n-text>
        ArcticForm
      </n-text>
    </n-h1>
    </span>
    <span>
      <template v-for="routeLink of allRoutes">
        <n-button class="navbar--link" @click="redirectTo(routeLink.name)" attr-type="button" quaternary size="large" :color="active === routeLink.name ? '#35D5CB' : ''">{{ routeLink.name }}</n-button>
      </template>
    </span>
  </div>
</template>
<script setup lang="ts">
import Logo from '../assets/logo.svg'
import {NButton, NH1, NText} from 'naive-ui'
import {useRouter, RouteRecord} from 'vue-router'
import {ref} from 'vue'

const router = useRouter()
const allRoutes: RouteRecord[] = router.getRoutes()
const active = ref<string | symbol>('Home')
const logoEl = ref<HTMLElement | null>(null)

function redirectTo(routeName: string | symbol): void {
  active.value = routeName
  router.push({
    name: routeName,
  })
}
function rotate(): void {
  (logoEl.value as HTMLElement).style.transform = 'rotate(45deg)'
}
function rotateBack(): void {
  setTimeout(()=> {
    (logoEl.value as HTMLElement).style.transform = 'rotate(0deg)'
  },300)
}
</script>
<style scoped>
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 50px;
  }
  .navbar--logo {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .navbar--link {
    margin: 0 2px;
  }
  h1 {
    margin: 0 0 0 10px;
  }
  .navbar--logo img {
    transition: transform .3s ease-in-out;
  }
  @media (max-width: 600px) {
    .navbar {
      padding: 5px 20px;
    }
    .navbar--logo img {
      width: 30px;
    }
    .n-text {
      display: none;
    }
  }
</style>