<template>
  <n-config-provider class="container--app" :theme-overrides="themeStyles">
    <n-message-provider>
      <BaseLayout>
        <router-view></router-view>
      </BaseLayout>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseLayout from './components/BaseLayout.vue'
import {NConfigProvider, NMessageProvider} from 'naive-ui'
import themeStyles from './theme-overrides.json'

const loaded = ref<boolean>(false)

onMounted(() => {
  loaded.value = true
})

</script>