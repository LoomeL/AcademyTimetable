<script setup>
import { RouterView } from 'vue-router'
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <Navbar class="mb-3"/>
  <RouterView/>
  <footer class="mt-2"></footer>
</template>

<style scoped>

</style>
