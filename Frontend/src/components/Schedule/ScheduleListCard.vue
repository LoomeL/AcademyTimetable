<template>
  <div class="card" v-for="i in 5">
    <div class="card-header d-flex justify-content-between">
      <span>Вторник</span> <span class="text-body-secondary">11 февраля</span>
    </div>
    <div class="card-body p-0">
      <ul class="list-group list-group-flush rounded-3 fw-light">
        <li class="list-group-item p-0" v-for="i in 3">
          <ScheduleItem />
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import ScheduleItem from '@/components/Schedule/ScheduleItem.vue'
</script>
