<template>
  <n-card :bordered="false" style="max-width: 600px;box-shadow: 0 0 14px rgb(0 0 0 / 20%);margin: 0 auto;">
    <template v-if="!isUserData">
      <n-h2 style="margin: 0;text-align: center; color: #2bb1a8">Please fill the form first ;)</n-h2>
      <n-h4 style="margin: 0 0 30px 0;text-align: center">Click below to redirect</n-h4>
      <div style="display: flex; justify-content: center">
        <n-button @click="redirectToForm" type="primary">Go to form</n-button>
      </div>
    </template>
    <template v-else-if="userData !== null">
      <n-h2 style="margin: 0;text-align: center; color: #2bb1a8">Thank You!</n-h2>
      <n-h4 style="margin: 0 0 30px 0;text-align: center">Your profile information:</n-h4>
      <n-grid cols="6 s:24" responsive="screen" x-gap="6">
        <n-gi :span="12" style="display: flex;justify-content: center; align-items: center;">
          <img width="160" src="{{userData.img === undefined ? '/src/assets/blank.webp' : userData.img}}" alt="user's avatar">
        </n-gi>
        <n-gi :span="12" style="display: flex;justify-content: center; align-items: flex-start; flex-direction: column; margin: 0 20px;">
          <span style="display: flex; align-items: center; margin-bottom: 10px;">
            <Icon size="18" tag="i" color="#b9b9b9" style="margin: 0 8px;">
            <PersonFilled/>
            </Icon>
            {{ userData.firstname }} {{ userData.lastname }}
          </span>
          <span style="display: flex; align-items: center; margin-bottom: 10px;">
            <Icon size="18" tag="i" color="#b9b9b9" style="margin: 0 8px;">
              <AlternateEmailFilled/>
            </Icon>
            <a :href="'mailto:' + userData.email">{{ userData.email }}</a>
          </span>
          <span style="display: flex; align-items: center; margin-bottom: 10px;">
            <Icon size="18" tag="i" color="#b9b9b9" style="margin: 0 8px;">
              <LocalPhoneOutlined/>
            </Icon>
            <template v-if="userData.phone === null">
              -
            </template>
            <a v-else :href="'tel:' + userData.phone">{{ userData.phone }}</a>
          </span>
          <span style="display: flex; align-items: center; margin-bottom: 10px;">
          <Icon size="18" tag="i" color="#b9b9b9" style="margin: 0 8px;">
            <DateRangeFilled/>
          </Icon>
          {{ userData.birthdayFormatted }}
          </span>
        </n-gi>
      </n-grid>
        <n-grid cols="6 m:24" responsive="screen" x-gap="6" style="margin-top:20px;">
          <n-gi :span="24" style="padding: 20px;">
            {{ userData.about }}
          </n-gi>
          <n-gi :span="24">
            <div style="display: flex; justify-content: space-between">
              <n-button type="primary"  @click="redirectToForm">
                Edit your profile data
              </n-button>
              <n-button type="tertiary"  @click="clearSessionStorage">
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
  NButton
} from 'naive-ui'
import SessionStorageService from '../services/SessionStorageService'
import {UserData} from '../types'
import {onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter()
const userData = ref<UserData | null>(null)
const isUserData = ref<boolean>(false)

onMounted(()=> {
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
.n-card > .n-card-header {
  padding-bottom: 0;
}
a {
  color: #2bb1a8;
}
</style>