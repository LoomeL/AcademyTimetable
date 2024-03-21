<template>
  <div v-if="profilesStore.profiles.length === 0" class="d-flex flex-column align-items-center">
    <h4 class="mt-3">
      Как-то здесь пустовато <span style="font-family: 'Noto Color Emoji', sans-serif">😕</span>
    </h4>
    <p class="text-body-tertiary px-3 text-center">
      У тебя нет сохраненного расписания, выбери институт ниже или начни вводить номер группы в поле
      поиска
    </p>
    <div class="d-flex justify-content-center">
      <button class="btn btn-outline-primary" @click="nav.currentPage = 'SearchPage'">
        Найти расписание <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  </div>

  <Schedule
    v-else
    :loading="!sfu || (profilesStore.selectedProfile.ait !== '' && !ait)"
    :raw-ait-t-t="ait"
    :raw-sfu-t-t="sfu"
    show-favorites
  />
</template>
<script setup>
import { useNavigationStore } from '@/stores/navigation.js'
import { useProfilesStore } from '@/stores/profiles.js'
import Schedule from '@/components/Schedule.vue'
import { computedAsync } from '@vueuse/core'
import { fetchSfuTT } from '@/utils/requests.js'
import { useScheduleStore } from '@/stores/schedule.js'

const nav = useNavigationStore()
const profilesStore = useProfilesStore()
const scheduleStore = useScheduleStore()

const sfu = computedAsync(async () => {
  return profilesStore.selectedProfile.sfu
    ? await fetchSfuTT(profilesStore.selectedProfile.sfu)
    : undefined
})

const ait = computedAsync(async () => {
  if (!scheduleStore.aitTT) return undefined
  return profilesStore.selectedProfile.ait
    ? scheduleStore.aitTT[profilesStore.selectedProfile.ait]
    : undefined
})
</script>
