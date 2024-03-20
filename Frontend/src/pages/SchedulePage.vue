
<template>

  <div class="d-flex flex-column align-items-center" v-if="profilesStore.profiles.length === 0">
    <h4 class="mt-3">
      Как-то здесь пустовато <span style="font-family: 'Noto Color Emoji', sans-serif">😕</span>
    </h4>
    <p class="text-body-tertiary px-3 text-center">
      У тебя нет сохраненного расписания, выбери институт ниже или начни вводить номер группы в поле
      поиска
    </p>
    <div class="d-flex justify-content-center">
      <button class="btn btn-outline-primary" @click="nav.currentPage = 'SearchPage'">Найти расписание <i class="fa-solid fa-arrow-right"></i></button>
    </div>
  </div>

  <Schedule :raw-sfu-t-t="sfu" :loading="!sfu" show-favorites v-else/>
</template>
<script setup>

import {useNavigationStore} from "@/stores/navigation.js";
import {useProfilesStore} from "@/stores/profiles.js";
import Schedule from "@/components/Schedule.vue";
import {computedAsync} from "@vueuse/core";
import {fetchSfuTT} from "@/utils/requests.js";

const nav = useNavigationStore()
const profilesStore = useProfilesStore()

const sfu = computedAsync( async () => {
  return profilesStore.selectedProfile.sfu ? await fetchSfuTT(profilesStore.selectedProfile.sfu) : undefined
})
//
// const ait = computedAsync( async () => {
//   return profilesStore.selectedProfile.ait ? await fetchSfuTT(profilesStore.selectedProfile.ait) : {}
// })
</script>
