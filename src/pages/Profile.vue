<template>
  <n-card :bordered="false" style="max-width: 600px;box-shadow: 0 0 14px rgb(0 0 0 / 20%);margin: 0 auto;">
    <n-h2 style="margin: 0;text-align: center; color: #35D5CB">Thank You!</n-h2>
    <n-h4 style="margin: 0 0 30px 0;text-align: center">Your profile information:</n-h4>
      <n-grid cols="6 m:24" responsive="screen" x-gap="24">
        <n-gi :span="12" label="First name" path="firstname">
          first name
        </n-gi>
        <n-gi :span="12" label="Last name" path="lastname">
          last name
        </n-gi>
        <n-gi :span="12" label="E-mail" path="email">
          e-mail
        </n-gi>
        <n-gi :span="12">
          phone
        </n-gi>
        <n-gi :span="12">
          birthday
        </n-gi>
        <n-gi :span="12">
          Img
        </n-gi>
        <n-gi :span="24">
          About
        </n-gi>
      </n-grid>
  </n-card>
</template>

<script setup lang="ts">
import {
  NCard,
  NGrid,
  NGi,
  NH4,
  NH2,
} from 'naive-ui'


</script>

<style scoped>
.n-card > .n-card-header {
  padding-bottom: 0;
}
</style>