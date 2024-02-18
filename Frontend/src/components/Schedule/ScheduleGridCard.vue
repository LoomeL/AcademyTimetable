<template>
  <div class="card">
    <div class="card-header">Вторник</div>
    <div class="card-body p-0">
      <div class="grid-item__container text-center">
        <div class="grid-item__schedule py-2 grid-item--active">Нечетная неделя</div>
        <div class="grid-item__schedule py-2">Четная неделя</div>
      </div>
      <div class="grid-item__container">
        <ScheduleItem class="grid-item__schedule" />
        <div class="grid-item__placeholder"></div>
      </div>
      <div class="grid-item__container">
        <div class="grid-item__placeholder grid-item--active"></div>
        <ScheduleItem class="grid-item__schedule" />
      </div>
      <div class="grid-item__container grid-item__container--oneChild">
        <ScheduleItem class="grid-item__schedule grid-item--active" />
      </div>
    </div>
  </div>
</template>
<script setup>
import ScheduleItem from '@/components/Schedule/ScheduleItem.vue'
</script>
