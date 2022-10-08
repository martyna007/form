<template>
  <span class="footer">
    All rights reserved &copy; {{ currentYear }}</span>
</template>

<script setup lang="ts">
const currentYear: number = new Date().getFullYear()
</script>

<style scoped>
  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    padding: 10px;
    background-color: #defffe;
  }
  i {
    padding: 0 5px;
  }
</style>