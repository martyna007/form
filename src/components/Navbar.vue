<template>
  <div class="d-flex align-items-center justify-content-between py-1 px-3 py-sm-3 px-sm-4">
    <span class="d-flex align-items-center cursor-pointer" @click="redirectTo('Form')" @mouseenter="rotate()" @mouseleave="rotateBack()">
      <img ref="logoEl" width="60" height="60" src="../assets/logo.svg" alt="ArcticForm logo">
      <n-h1 prefix="bar" class="m-0 ms-2">
      <n-text class="d-none d-sm-block">
        ArcticForm
      </n-text>
    </n-h1>
    </span>
    <span>
      <template v-for="routeLink of allRoutes">
        <n-button @click="redirectTo(routeLink.name)" attr-type="button" quaternary size="large" :class="currentRoute === routeLink.name ? 'text-primary' : ''">{{ routeLink.name }}</n-button>
      </template>
    </span>
  </div>
</template>
<script setup lang="ts">
import {NButton, NH1, NText} from 'naive-ui'
import {useRouter, RouteRecord, RouteRecordName} from 'vue-router'
import {computed, ref} from 'vue'

const router = useRouter()
const allRoutes: RouteRecord[] = router.getRoutes()
const logoEl = ref<HTMLElement | null>(null)
const currentRoute = computed(() => {
  return useRouter().currentRoute.value.name
})

function redirectTo(routeName: RouteRecordName | undefined): void {
  router.push({
    name: routeName
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
  img {
    transition: transform .3s ease-in-out;
  }
  @media (max-width: 575px) {
    img {
      width: 30px;
    }
  }
</style>