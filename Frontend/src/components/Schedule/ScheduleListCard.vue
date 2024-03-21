<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between">
      <span>{{ dayOfWeek }}</span> <span class="text-body-secondary">{{ dateString }}</span>
    </div>
    <div class="card-body p-0 schedule-list-border">
      <template v-for="time in times">
        <ScheduleItem v-if="(sfuData && sfuData[time]) || (aitData && aitData[time])"
                      :sfu-t-t="sfuData ? sfuData[time] : undefined"
                      :ait-t-t="aitData ? aitData[time] : undefined" />
      </template>
    </div>
  </div>
</template>
<script setup>
import ScheduleItem from '@/components/Schedule/ScheduleItem.vue'
import { times } from '@/stores/schedule.js'

defineProps({
  sfuData: Object,
  aitData: Object,
  dayOfWeek: String,
  dateString: String
})
</script>
