<script setup>
import ScheduleItemPlaceholder from '@/components/Placeholder/ScheduleItemPlaceholder.vue'
</script>

<template>
  <div class="card" v-for="i in 5">
    <div class="card-header">
      <div class="placeholder placeholder-wave rounded-2 col-5 my-1"></div>
    </div>
    <div class="card-body p-0 schedule-list-border">
      <ScheduleItemPlaceholder v-for="i in 3" />
    </div>
  </div>
</template>

<style scoped></style>
