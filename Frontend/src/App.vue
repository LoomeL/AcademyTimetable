<script setup>
import Navbar from '@/components/NavBar/NavBar.vue'
import SchedulePage from '@/pages/SchedulePage.vue'
import { useNavigationStore } from '@/stores/navigation.js'
import SearchPage from '@/pages/SearchPage.vue'
import SettingsPage from '@/pages/SettingsPage.vue'
import ProfileEdit from '@/pages/ProfileEditPage.vue'

const nav = useNavigationStore()
</script>

<template>
  <header class="position-fixed fixed-bottom">
    <Navbar />
  </header>
  <main class="container py-3">
    <div class="row">
      <div class="col-12 d-flex flex-column gap-3">
        <SchedulePage v-if="nav.currentPage === 'SchedulePage'" />
        <ProfileEdit v-else-if="nav.currentPage === 'ProfileEdit'" />
        <SearchPage v-else-if="nav.currentPage === 'SearchPage'" />
        <SettingsPage v-else-if="nav.currentPage === 'SettingsPage'" />
      </div>
    </div>

    <!--  Nav offset-->
    <div style="height: 54px"></div>
  </main>
</template>
