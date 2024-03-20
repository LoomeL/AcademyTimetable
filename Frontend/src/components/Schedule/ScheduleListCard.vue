<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between">
      <span>{{dayOfWeek}}</span> <span class="text-body-secondary">{{dateString}}</span>
    </div>
    <div class="card-body p-0 schedule-list-border">
      <ScheduleItem :sfu-t-t="item" v-for="(item, i) in data"/>
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
