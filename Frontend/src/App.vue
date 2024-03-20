<script setup>
import Navbar from '@/components/NavBar/NavBar.vue'
import SchedulePage from '@/pages/SchedulePage.vue'
import { useNavigationStore } from '@/stores/navigation.js'
import SearchPage from '@/pages/SearchPage.vue'
import SettingsPage from '@/pages/SettingsPage.vue'
import ProfileEdit from '@/pages/ProfileEditPage.vue'
import ProfileEditPage from "@/pages/ProfileEditPage.vue";
import {useProfilesStore} from "@/stores/profiles.js";

const nav = useNavigationStore()
const profilesStore = useProfilesStore()
</script>

<template>
  <header class="position-fixed fixed-bottom">
    <Navbar />
  </header>
  <main class="container py-3" style="max-width: 500px">
    <div class="row">
      <div class="col-12 d-flex flex-column gap-3">
        <SchedulePage v-if="nav.currentPage === 'SchedulePage'" />
        <ProfileEdit v-else-if="nav.currentPage === 'ProfileEdit'" />
        <SearchPage v-else-if="nav.currentPage === 'SearchPage'" />
        <template v-else-if="nav.currentPage === 'SettingsPage'">
          <SettingsPage v-if="Object.keys(profilesStore.editorSelectedProfile).length === 0"/>
          <ProfileEditPage v-else/>
        </template>
      </div>
    </div>

    <!--  Nav offset-->
    <div style="height: 54px"></div>
  </main>
</template>
