<template>
  <div class="position-relative fw-light" @click="showOverlay = !showOverlay">
    <div class="d-flex flex-column gap-1 p-3 z-1">
      <span v-if="current.subject" class="fw-normal">{{ current.subject }}</span>
      <div class="d-flex flex-wrap column-gap-2 align-items-center">
        <span
          ><span class="fw-normal">{{ time[0] }}</span
          >-{{ time[1] }}</span
        >
        <div v-if="current.type" class="dot-separator" />
        <span v-if="current.type" :style="`color: ${colorOfType}`">{{ current.type }}</span>
        <div v-if="current.sync" class="dot-separator" />
        {{ current.sync }}
      </div>
      <!--      <span>Корпус №17, <span class="fw-normal">ауд. 4-02</span></span>-->
      <span v-if="current.place">{{ current.place }}</span>
      <a
        v-if="current.teacher"
        class="text-decoration-none text-body"
        @click="searchStore.selectedGroup = current.teacher"
        >{{ current.teacher }}</a
      >
      <a
        v-for="i in current.groups"
        :key="i"
        class="text-decoration-none text-body"
        @click="searchStore.selectedGroup = i"
        >{{ i }}</a
      >
      <span v-if="showTime && timeMessage" class="text-primary-emphasis">{{ timeMessage }}</span>
    </div>

    <div v-if="aitTT !== undefined" class="position-absolute end-0 top-0 p-3">
      <i v-if="sfuTT !== undefined" class="text-danger fs-5 fa-solid fa-exclamation"></i>
      <academy-logo v-else class="text-primary" style="width: 24px; height: 24px" />
    </div>

    <div
      v-if="sfuTT !== undefined && aitTT !== undefined"
      class="position-absolute end-0 bottom-0 z-0 text-body-tertiary opacity-25"
    >
      <academy-logo v-if="showOverlay" style="width: 70px; height: 70px" />
      <sfu-logo v-else class="text-body-tertiary opacity-50" style="width: 70px; height: 70px" />
    </div>
  </div>
</template>
<script setup>
import AcademyLogo from '@/components/Logos/AcademyLogo.vue'
import SfuLogo from '@/components/Logos/SfuLogo.vue'
import { computed, ref } from 'vue'
import { useSearchStore } from '@/stores/search.js'
import { differenceInMinutes, parse } from 'date-fns'
import { useScheduleStore } from '@/stores/schedule.js'

const searchStore = useSearchStore()

const showOverlay = ref(false)

const current = computed(() => {
  if (props.sfuTT && props.aitTT) {
    return showOverlay.value ? props.aitTT : props.sfuTT
  } else {
    return props.aitTT || props.sfuTT
  }
})

const time = computed(() => {
  return current.value.time.split('-')
})

const scheduleStore = useScheduleStore()

const timeMessage = computed(() => {
  const startTime = parse(time.value[0], 'HH:mm', scheduleStore.liveDate)
  const endTime = parse(time.value[1], 'HH:mm', scheduleStore.liveDate)

  function formatMinutes(num) {
    if (num >= 11 && num <= 14) {
      return `${num} минут`
    }
    const lastDigit = num % 10
    if (lastDigit === 1) {
      return `${num} минута`
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      return `${num} минуты`
    } else {
      return `${num} минут`
    }
  }

  const startDiff = differenceInMinutes(scheduleStore.liveDate, startTime) + 1
  const endDiff = differenceInMinutes(endTime, scheduleStore.liveDate) + 1

  if (scheduleStore.liveDate < startTime) {
    if (Math.abs(startDiff) > 10) return
    return `Начнется через ${formatMinutes(Math.abs(startDiff))}`
  }

  if (startTime <= scheduleStore.liveDate && scheduleStore.liveDate <= endTime) {
    if (startDiff < 5) {
      return `Только что началась`
    }

    if (startDiff >= 5 && startDiff <= 20) {
      return `Началась ${formatMinutes(startDiff)} назад`
    }

    if (scheduleStore.liveDate <= endTime) {
      return `Осталось ${endDiff >= 60 ? `1 час ${formatMinutes(endDiff - 60)}` : formatMinutes(endDiff)}`
    }
  }

  if (Math.abs(endDiff) <= 3) {
    return 'Только что закончилась'
  }

  return ''
})

const colorOfType = computed(() => {
  const colors = {
    "лекция" : "#ff6000",
    "практика" : "#00f",
    "семинары" : "#22a744",
    "лекция и практика" : "#f53f93",
    "пр. занятие" : "rgb(34 185 87)",
  }
  return /лаб/.test(current.value.type) ? "#d01eb2" :
    colors[current.value.type] ? colors[current.value.type] : ""
})

const props = defineProps({
  sfuTT: Object,
  aitTT: Object,
  compact: Boolean,
  showTime: Boolean
})
</script>
