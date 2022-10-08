<template>
  <header>
    <slot name="header">
      <Navbar/>
    </slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer">
      <Footer/>
    </slot>
  </footer>
</template>

<script setup lang="ts">
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'
</script>