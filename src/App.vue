<template>
  <n-config-provider class="h-100 d-flex flex-column" :theme-overrides="themeStyles">
    <n-message-provider>
      <BaseLayout>
        <router-view></router-view>
      </BaseLayout>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import BaseLayout from './components/BaseLayout.vue'
import {NConfigProvider, NMessageProvider} from 'naive-ui'
import themeStyles from './theme-overrides.json'
</script>