<template>
  <div class="alert alert-danger bg-body mb-0 d-flex gap-3">
    <i class="fa-solid fa-warning fs-4 mt-1"></i>
    <span>
      В режиме отображения "сетка" расписание академии ИТ не отображается!
      <a class="text-danger-emphasis" @click="settingsStore.settings.hideGridAlert = true">Больше не показывать</a></span
    >
  </div>
</template>
<script setup>
import { useSettingsStore } from '@/stores/settings.js'

const settingsStore = useSettingsStore()
</script>
