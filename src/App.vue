<template>
  <router-link to="/">home</router-link><br/>
  <router-link to="/profile">profile</router-link>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const loaded = ref<boolean>(false)

onMounted(() => {
  loaded.value = true
})

</script>