<template>
  <div class="position-relative fw-light" @click="showOverlay = !showOverlay">
    <div class="d-flex flex-column gap-1 p-3 z-1">
      <span class="fw-normal" v-if="current.subject">{{current.subject}}</span>
      <div class="d-flex flex-wrap column-gap-2 align-items-center">
        <span><span class="fw-normal">{{time[0]}}</span>-{{time[1]}}</span>
        <div class="dot-separator" v-if="current.type"/>
        <span>{{current.type}}</span>
        <div class="dot-separator" v-if="current.sync"/>
        {{current.sync}}
      </div>
<!--      <span>Корпус №17, <span class="fw-normal">ауд. 4-02</span></span>-->
      <span v-if="current.place">{{current.place}}</span>
      <a @click="searchStore.selectedGroup = current.teacher" class="text-decoration-none text-body" v-if="current.teacher">{{current.teacher}}</a>
      <a @click="searchStore.selectedGroup = i" class="text-decoration-none text-body" v-if="current.groups" v-for="i in current.groups">{{i}}</a>
      <span class="text-primary-emphasis" v-if="showTime && timeMessage">{{timeMessage}}</span>
    </div>

    <div class="position-absolute end-0 top-0 p-3" v-if="aitTT !== undefined">
      <i class="text-danger fs-5 fa-solid fa-exclamation" v-if="sfuTT !== undefined"></i>
      <academy-logo style="width: 24px; height: 24px" class="text-primary" v-else />
    </div>

    <div class="position-absolute end-0 bottom-0 z-0 text-body-tertiary opacity-25" v-if="sfuTT !== undefined && aitTT !== undefined">
      <academy-logo style="width: 70px; height: 70px" v-if="showOverlay" />
      <sfu-logo style="width: 70px; height: 70px" class="text-body-tertiary opacity-50" v-else />
    </div>

  </div>
</template>
<script setup>
import AcademyLogo from '@/components/Logos/AcademyLogo.vue'
import SfuLogo from '@/components/Logos/SfuLogo.vue'
import {computed, onMounted, onUnmounted, ref} from "vue";
import {useSearchStore} from "@/stores/search.js";
import {differenceInMinutes, parse} from "date-fns";
import {useScheduleStore} from "@/stores/schedule.js";

const searchStore = useSearchStore()

const showOverlay = ref(false)

const current = computed(() => {
  if (props.sfuTT !== undefined && props.aitTT !== undefined) {
    return showOverlay ? props.aitTT : props.sfuTT
  } else {
    return props.aitTT || props.sfuTT
  }
})

const time = computed(() => {
  return current.value.time.split('-')
})

const scheduleStore = useScheduleStore()

const timeMessage = computed(() => {
  const startTime = parse(time.value[0], 'HH:mm', scheduleStore.liveDate);
  const endTime = parse(time.value[1], 'HH:mm', scheduleStore.liveDate);

  function formatMinutes(n) {
    if (n === 1 || n === -1) {
      return `${Math.abs(n)} минута`;
    } else if (n > 1 || n < -1) {
      return `${Math.abs(n)} минут`;
    } else {
      return `${Math.abs(n)} минуты`;
    }
  }

  const startDiff = differenceInMinutes(scheduleStore.liveDate, startTime)
  const endDiff = differenceInMinutes(endTime, scheduleStore.liveDate)

  if (scheduleStore.liveDate < startTime) {
    if (Math.abs(startDiff) > 10) return
    return `Начнется через ${formatMinutes(startDiff)}`
  }

  if (startTime <= scheduleStore.liveDate && scheduleStore.liveDate <= endTime) {
    if (startDiff < 5) {
      return `Только что началась`
    }

    const avg = 20;

    if (startDiff >= 5 && startDiff <= avg) {
      return `Началась ${formatMinutes(startDiff)} назад`
    }

    if (endDiff <= avg) {
      return `Осталось ${endDiff >= 60 ? `1 час ${formatMinutes(endDiff - 60)}` : formatMinutes(endDiff)}`
    }
  }

  if (Math.abs(endDiff) <= 3) {
    return "Только что закончилась"
  }
})

const props = defineProps({
  sfuTT: Object,
  aitTT: Object,
  compact: Boolean,
  showTime: Boolean,
})
</script>
