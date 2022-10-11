<template>
  <n-card :bordered="false" class="mx-auto my-0 shadow">
    <template v-if="!isUserData">
      <n-h2 class="m-0 text-center text-primary">Please fill the form first ;)</n-h2>
      <n-h4 class="mt-0 mb-4 text-center">Click below to redirect</n-h4>
      <div class="d-flex justify-content-center">
        <n-button @click="redirectToForm" type="primary">Go to form</n-button>
      </div>
    </template>
    <template v-else-if="userData !== null">
      <n-h2 class="m-0 text-center text-primary">Thank You!</n-h2>
      <n-h4 class="mt-0 mb-4 text-center">Your profile information:</n-h4>
      <n-grid cols="6 s:24" responsive="screen" x-gap="6">
        <n-gi :span="12" class="d-flex justify-content-center align-items-center">
          <img class="rounded-circle" width="160" height="160" :src="userData.img === undefined ? '/src/assets/blank.webp' : userData.img" alt="user's avatar">
        </n-gi>
        <n-gi :span="12" class="d-flex justify-content-center align-items-start flex-column mx-3">
          <span class="d-flex align-items-center mb-2">
            <Icon size="18" tag="i" color="#b9b9b9" class="mx-2">
            <PersonFilled/>
            </Icon>
            {{ userData.firstname }} {{ userData.lastname }}
          </span>
          <span class="d-flex align-items-center mb-2">
            <Icon size="18" tag="i" color="#b9b9b9" class="mx-2">
              <AlternateEmailFilled/>
            </Icon>
            <a class="text-primary" :href="'mailto:' + userData.email">{{ userData.email }}</a>
          </span>
          <span class="d-flex align-items-center mb-2">
            <Icon size="18" tag="i" color="#b9b9b9" class="mx-2">
              <LocalPhoneOutlined/>
            </Icon>
            <template v-if="userData.phone === null">
              -
            </template>
            <a class="text-primary" v-else :href="'tel:' + userData.phone">{{ userData.phone }}</a>
          </span>
          <span class="d-flex align-items-center mb-2">
          <Icon size="18" tag="i" color="#b9b9b9" class="mx-2">
            <DateRangeFilled/>
          </Icon>
          {{ userData.birthdayFormatted }}
          </span>
        </n-gi>
      </n-grid>
        <n-grid cols="6 m:24" responsive="screen" x-gap="6" class="mt-4">
          <n-gi :span="24" class="px-3">
            {{ userData.about }}
          </n-gi>
          <n-gi :span="24">
            <n-divider class="mb-3 mt-4"/>
            <div class="d-flex justify-content-center justify-content-sm-between flex-wrap">
              <n-button class="m-1" type="primary" @click="redirectToForm">
                Edit your profile data
              </n-button>
              <n-button class="m-1" type="tertiary" @click="clearSessionStorage">
                Clear session storage
              </n-button>
            </div>
          </n-gi>
        </n-grid>
    </template>
  </n-card>
</template>

<script setup lang="ts">
import { Icon } from '@vicons/utils'
import {PersonFilled, AlternateEmailFilled, LocalPhoneOutlined, DateRangeFilled} from '@vicons/material'
import {
  NCard,
  NGrid,
  NGi,
  NH4,
  NH2,
  NButton,
  NDivider
} from 'naive-ui'
import SessionStorageService from '../services/SessionStorageService'
import {UserData} from '../types'
import {onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter()
const userData = ref<UserData | null>(null)
const isUserData = ref<boolean>(false)

onMounted((): void => {
  userData.value = SessionStorageService.getInstance().getUserData()
  isUserData.value = SessionStorageService.getInstance().isUserData()
})

function redirectToForm(): void {
  router.push({
    name: 'Form'
  })
}
function clearSessionStorage(): void {
  SessionStorageService.getInstance().removeUserData()
  redirectToForm()
}
</script>

<style scoped>
.n-card {
  max-width: 600px;
}
.n-card > .n-card-header {
  padding-bottom: 0;
}
img {
  object-fit: cover;
}
</style>