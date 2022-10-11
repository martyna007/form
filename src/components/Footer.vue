<template>
  <span class="d-flex align-items-center justify-content-center p-2">
    All rights reserved &copy; {{ currentYear }}</span>
</template>

<script setup lang="ts">
const currentYear: number = new Date().getFullYear()
</script>

<style scoped>
  span {
    font-size: 14px;
    background-color: #defffe;
  }
</style>