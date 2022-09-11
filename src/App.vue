<template>
  <header data-cy="header-background" class="w-full bg-blue-500">
    <Navbar />
  </header>
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from "./components/Navbar.vue";
</script>

<style scoped>

</style>
