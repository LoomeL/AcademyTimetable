<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between">
      <span>{{ dayOfWeek }}</span> <span class="text-body-secondary">{{ dateString }}</span>
    </div>
    <div class="card-body p-0 schedule-list-border">
      <ScheduleItem v-for="(item, i) in data" :sfu-t-t="item"/>
    </div>
  </div>
</template>
<script setup>
import ScheduleItem from '@/components/Schedule/ScheduleItem.vue'

defineProps({
  data: Array,
  dayOfWeek: String,
  dateString: String
})
</script>
