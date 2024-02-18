<script setup>
import ScheduleItem from '@/components/Schedule/ScheduleItem.vue'
import ScheduleItemPlaceholder from '@/components/Placeholder/ScheduleItemPlaceholder.vue'
</script>

<template>
  <div class="card">
    <div class="card-header">
      <div class="placeholder placeholder-wave rounded-2 col-5 my-1"></div>
    </div>
    <div class="card-body p-0">
      <div class="grid-item__container">
        <div class="grid-item__schedule p-2 grid-item--active d-flex justify-content-center">
          <div class="placeholder placeholder-sm placeholder-wave col-9 rounded-2 my-1"></div>
        </div>

        <div class="grid-item__schedule p-2 d-flex justify-content-center">
          <div class="placeholder placeholder-sm placeholder-wave col-9 rounded-2 my-1"></div>
        </div>
      </div>
      <div class="grid-item__container">
        <ScheduleItemPlaceholder class="grid-item__schedule" compact />
        <div class="grid-item__placeholder"></div>
      </div>
      <div class="grid-item__container">
        <div class="grid-item__placeholder grid-item--active"></div>
        <ScheduleItemPlaceholder class="grid-item__schedule" compact />
      </div>
      <div class="grid-item__container grid-item__container--oneChild">
        <ScheduleItemPlaceholder class="grid-item__schedule grid-item--active" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
