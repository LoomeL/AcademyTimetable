<template>
  <div class="card" v-for="i in 5">
    <div class="card-header d-flex justify-content-between">
      <span>Вторник</span> <span class="text-body-secondary">11 февраля</span>
    </div>
    <div class="card-body p-0 schedule-list-border">
      <ScheduleItem v-for="i in 3" />
    </div>
  </div>
</template>
<script setup>
import ScheduleItem from '@/components/Schedule/ScheduleItem.vue'
</script>
