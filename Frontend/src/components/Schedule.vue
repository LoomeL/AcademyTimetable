<template>
    <template v-if="loading">
      <ScheduleHeaderPlaceholder/>

      <div class="d-flex gap-3">
        <div class="card w-50 d-flex justify-content-center align-items-center flex-column gap-2 p-2" v-for="(item, i) in 2">
          <div class="placeholder placeholder-wave col-5 rounded-2"></div>
          <div class="placeholder placeholder-sm placeholder-wave col-7 rounded-2"></div>
        </div>
      </div>

      <div class="card">
        <div class="card-body p-0 schedule-list-border">
          <ScheduleItemPlaceholder v-for="(item, i) in 3"/>
        </div>
      </div>

      <div class="d-flex gap-3 align-items-start">
        <div class="btn-group">
          <button class="btn btn-outline-primary" :class="{'active': !settingsStore.settings.gridView}"
                  @click="settingsStore.settings.gridView = false">
            <i class="fa-solid fa-list"></i>
          </button>
          <button class="btn btn-outline-primary" :class="{'active': settingsStore.settings.gridView}"
                  @click="settingsStore.settings.gridView = true">
            <i class="fa-solid fa-grip"></i>
          </button>
        </div>
      </div>

      <template v-if="!settingsStore.settings.gridView">
        <div class="d-flex gap-3">
          <div class="card w-50 d-flex justify-content-center align-items-center flex-column gap-2 p-2">
            <div class="placeholder placeholder-wave col-7 rounded-2"></div>
          </div>
          <div class="card w-50 d-flex justify-content-center align-items-center flex-column gap-2 p-2">
            <div class="placeholder placeholder-wave col-7 rounded-2"></div>
          </div>
        </div>

        <ScheduleListCardPlaceholder/>
      </template>

      <ScheduleGridCardPlaceholder v-else/>

    </template>

    <template v-else>
      <ScheduleHeader :target="rawSfuTT.target"
                      :teacher="rawSfuTT.type === 'teacher'"
                      :institute-name="rawSfuTT.institute"
                      :institute-short-name="institutesShortNameObj[rawSfuTT.institute]"/>

      <div class="d-flex gap-3">
        <div class="btn btn-outline-secondary w-50" :class="{'active': !showNextDay, 'text-body-secondary': showNextDay}"
             @click="showNextDay = false">
          <h5 class="m-0">Сегодня</h5>
          <span class="text-body-secondary">{{toDateString("EEEEEE, d MMMM", today)}}</span>
        </div>
        <div class="btn btn-outline-secondary w-50" :class="{'active': showNextDay, 'text-body-secondary': !showNextDay}"
             @click="showNextDay = true">
          <h5 class="m-0">Завтра</h5>
          <span class="text-body-secondary">{{toDateString("EEEEEE, d MMMM", addDays(today, 1))}}</span>
        </div>
      </div>

      <div class="card">
        <div class="card-body p-0 schedule-list-border">
          <ScheduleItem :sfu-t-t="schedule" v-for="schedule in currentSchedule" show-time/>
        </div>
      </div>

      <div class="d-flex gap-3 align-items-start">
        <div class="btn-group">
          <button class="btn btn-outline-primary" :class="{'active': !settingsStore.settings.gridView}"
                  @click="settingsStore.settings.gridView = false">
            <i class="fa-solid fa-list"></i>
          </button>
          <button class="btn btn-outline-primary" :class="{'active': settingsStore.settings.gridView}"
                  @click="settingsStore.settings.gridView = true">
            <i class="fa-solid fa-grip"></i>
          </button>
        </div>
        <div class="d-flex gap-3 overflow-x-auto" v-if="showFavorites">
          <button class="btn btn-outline-primary flex-shrink-0" v-for="i in profilesStore.profiles" v-if="profilesStore.profiles.length !== 0">
            {{i.name}}
          </button>
        </div>
      </div>

      <template v-if="!settingsStore.settings.gridView">
        <div class="d-flex gap-3" v-if="rawAitTT !== undefined">
          <button class="btn btn-outline-primary"><i class="fa-solid fa-house"></i></button>
          <div class="d-flex flex-grow-1 justify-content-between align-items-center">
            <button class="btn btn-outline-primary"><i class="fa-solid fa-arrow-left"></i></button>
            <span>6 неделя / 05.02 - 11.02</span>
            <button class="btn btn-outline-primary"><i class="fa-solid fa-arrow-right"></i></button>
          </div>
        </div>

        <div class="d-flex gap-3 bg-body" v-else>
          <button class="btn btn-outline-secondary w-50" :class="{'active': showAnotherWeek ? isEvenWeek: !isEvenWeek,'text-body-secondary': !showAnotherWeek ? isEvenWeek: !isEvenWeek}"
                  @click="showAnotherWeek = !showAnotherWeek">Нечетная неделя</button>
          <button class="btn btn-outline-secondary w-50" :class="{'active': !showAnotherWeek ? isEvenWeek: !isEvenWeek, 'text-body-secondary': showAnotherWeek ? isEvenWeek: !isEvenWeek}"
                  @click="showAnotherWeek = !showAnotherWeek">Четная неделя</button>
        </div>

        <ScheduleListCard :data="day" :day-of-week="days[key - 1]" date-string="" v-for="(day, key) in weeklyScheduleList"/>
      </template>

      <ScheduleGridCard :data="day" :day-of-week="days[key - 1]" :highlight-even="isEvenWeek" v-for="(day, key) in weeklyScheduleGrid" v-else/>

    </template>
</template>
<script setup>
import {institutesShortNameObj, useSearchStore} from "@/stores/search.js";
import ScheduleHeader from "@/components/Schedule/ScheduleHeader.vue";
import ScheduleHeaderPlaceholder from "@/components/Placeholder/ScheduleHeaderPlaceholder.vue";
import {computed, onMounted, ref, watch} from "vue";
import {fetchSfuTT} from "@/utils/requests.js";
import ScheduleItem from "@/components/Schedule/ScheduleItem.vue";
import {useSettingsStore} from "@/stores/settings.js";
import ScheduleListCard from "@/components/Schedule/ScheduleListCard.vue";
import ScheduleGridCard from "@/components/Schedule/ScheduleGridCard.vue";
import {currentDayOfWeek, currentWeek, isEvenWeek, toDateString, today} from "../utils/date.js";
import {addDays} from "date-fns";
import {useProfilesStore} from "@/stores/profiles.js";
import ScheduleItemPlaceholder from "@/components/Placeholder/ScheduleItemPlaceholder.vue";
import ScheduleListCardPlaceholder from "@/components/Placeholder/ScheduleListCardPlaceholder.vue";
import ScheduleGridCardPlaceholder from "@/components/Placeholder/ScheduleGridCardPlaceholder.vue";

const settingsStore = useSettingsStore()
const profilesStore = useProfilesStore()

const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

const showNextDay = ref(false)
const showAnotherWeek = ref(false)

const currentSchedule = computed(() => {
  if (props.loading) return null;
  return props.rawSfuTT.timetable.filter(item => parseInt(item.week) === (currentWeek % 2 ? 1 : 2) &&
      parseInt(item.day) === addDays(today, showNextDay.value ? 1 : 0).getDay())
})

const weeklyScheduleGrid = computed(() => {
  if (props.loading) return null;
  return props.rawSfuTT.timetable.reduce((accumulator, item) => {
    if (!accumulator[item.day]) {
      accumulator[item.day] = {}
    }

    if (!accumulator[item.day][item.time]) {
      accumulator[item.day][item.time] = []
    }

    accumulator[item.day][item.time].push(item)
    return accumulator
  }, {});
})

const weeklyScheduleList = computed(() => {
  if (props.loading) return null;
  return props.rawSfuTT.timetable.reduce((accumulator, item) => {
    if (item.week === ((showAnotherWeek.value ? !isEvenWeek : isEvenWeek) ? "1" : "2")) return accumulator;

    if (!accumulator[item.day]) {
      accumulator[item.day] = []
    }

    accumulator[item.day].push(item)
    return accumulator
  }, {});
})

const props = defineProps({
  rawSfuTT: Object,
  rawAitTT: Object,
  showFavorites: Boolean,
  loading: Boolean,
})

</script>