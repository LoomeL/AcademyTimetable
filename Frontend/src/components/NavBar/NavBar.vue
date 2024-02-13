<template>
  <nav class="bg-body-tertiary shadow-lg d-flex justify-content-around">
    <NavItem :active="nav.currentPage === 'SchedulePage'" @click="nav.currentPage = 'SchedulePage'">
      <i class="fa-solid fa-bars-staggered"></i>
    </NavItem>
    <NavItem :active="nav.currentPage === 'SearchPage'" @click="nav.currentPage = 'SearchPage'">
      <i class="fa-solid fa-search"></i>
    </NavItem>
    <NavItem :active="nav.currentPage === 'SettingsPage'" @click="nav.currentPage = 'SettingsPage'">
      <i class="fa-solid fa-gear"></i>
    </NavItem>
  </nav>
</template>
<script setup>
import NavItem from '@/components/NavBar/NavItem.vue'
import { useNavigationStore } from '@/stores/navigation.js'

const nav = useNavigationStore()
</script>
