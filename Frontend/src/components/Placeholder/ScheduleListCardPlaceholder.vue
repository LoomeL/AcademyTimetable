<script setup>
import ScheduleItemPlaceholder from '@/components/Placeholder/ScheduleItemPlaceholder.vue'
</script>

<template>
  <div v-for="(item, i) in 5" class="card">
    <div class="card-header">
      <div class="placeholder placeholder-wave rounded-2 col-5 my-1"></div>
    </div>
    <div class="card-body p-0 schedule-list-border">
      <ScheduleItemPlaceholder v-for="(item, i) in 3"/>
    </div>
  </div>
</template>

<style scoped></style>
