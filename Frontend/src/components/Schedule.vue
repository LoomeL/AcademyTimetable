<template>
  <template v-if="loading">
    <ScheduleHeaderPlaceholder />

    <div class="d-flex gap-3">
      <div
        v-for="_ in 2"
        class="card w-50 d-flex justify-content-center align-items-center flex-column gap-2 p-2"
      >
        <div class="placeholder placeholder-wave col-5 rounded-2"></div>
        <div class="placeholder placeholder-sm placeholder-wave col-7 rounded-2"></div>
      </div>
    </div>

    <div class="card">
      <div class="card-body p-0 schedule-list-border">
        <ScheduleItemPlaceholder v-for="_ in 3" />
      </div>
    </div>

    <div class="d-flex gap-3 align-items-start">
      <div class="btn-group">
        <button
          :class="{ active: !settingsStore.settings.gridView }"
          class="btn btn-outline-primary"
          @click="settingsStore.settings.gridView = false"
        >
          <i class="fa-solid fa-list"></i>
        </button>
        <button
          :class="{ active: settingsStore.settings.gridView }"
          class="btn btn-outline-primary"
          @click="settingsStore.settings.gridView = true"
        >
          <i class="fa-solid fa-grip"></i>
        </button>
      </div>
    </div>

    <template v-if="!settingsStore.settings.gridView">
      <div class="d-flex gap-3">
        <div
          class="card w-50 d-flex justify-content-center align-items-center flex-column gap-2 p-2"
        >
          <div class="placeholder placeholder-wave col-7 rounded-2"></div>
        </div>
        <div
          class="card w-50 d-flex justify-content-center align-items-center flex-column gap-2 p-2"
        >
          <div class="placeholder placeholder-wave col-7 rounded-2"></div>
        </div>
      </div>

      <ScheduleListCardPlaceholder />
    </template>

    <ScheduleGridCardPlaceholder v-else />
  </template>

  <template v-else>
    <ScheduleHeader
      :institute-name="rawSfuTT.institute"
      :institute-short-name="institutesShortNameObj[rawSfuTT.institute]"
      :target="rawSfuTT.target"
      :teacher="rawSfuTT.type === 'teacher'"
      :ait="profilesStore.selectedProfile.ait"
    />

    <div class="d-flex gap-3">
      <div
        :class="{ active: !showNextDay, 'text-body-secondary': showNextDay }"
        class="btn btn-outline-secondary w-50"
        @click="showNextDay = false"
      >
        <h5 class="m-0">Сегодня</h5>
        <span class="text-body-secondary">{{ toDateString('EEEEEE, d MMMM', today) }}</span>
      </div>
      <div
        :class="{ active: showNextDay, 'text-body-secondary': !showNextDay }"
        class="btn btn-outline-secondary w-50"
        @click="showNextDay = true"
      >
        <h5 class="m-0">Завтра</h5>
        <span class="text-body-secondary">{{
          toDateString('EEEEEE, d MMMM', addDays(today, 1))
        }}</span>
      </div>
    </div>

    <div class="card">
      <div class="card-body p-0 schedule-list-border">
        <template v-for="time in times">
          <ScheduleItem
            v-if="currentSchedule[time] || (currentAitSchedule && currentAitSchedule[time])"
            :sfu-t-t="currentSchedule[time]"
            :ait-t-t="currentAitSchedule ? currentAitSchedule[time] : undefined"
            :show-time="!showNextDay"
          />
        </template>
        <div class="d-flex justify-content-center align-items-center flex-column py-3" v-if="(currentSchedule && Object.keys(currentSchedule).length === 0) && (currentAitSchedule && Object.keys(currentAitSchedule).length === 0)">
          <h5>Занятий нет</h5>
          <p class="m-0">{{showNextDay? "Завтра" : "Сегодня"}} можно отдыхать</p>
        </div>
      </div>
    </div>

    <div class="d-flex gap-3 align-items-start">
      <div class="btn-group">
        <button
          :class="{ active: !settingsStore.settings.gridView }"
          class="btn btn-outline-primary"
          @click="settingsStore.settings.gridView = false"
        >
          <i class="fa-solid fa-list"></i>
        </button>
        <button
          :class="{ active: settingsStore.settings.gridView }"
          class="btn btn-outline-primary"
          @click="settingsStore.settings.gridView = true"
        >
          <i class="fa-solid fa-grip"></i>
        </button>
      </div>
      <div
        v-if="showFavorites && profilesStore.profiles.length !== 0"
        class="d-flex gap-3 overflow-x-auto"
      >
        <button
          v-for="i in profilesStore.profiles"
          :class="{ active: profilesStore.selectedProfile.id === i.id }"
          class="btn btn-outline-primary flex-shrink-0"
          @click="profilesStore.selectedProfile = i"
        >
          {{ i.name }}
        </button>
      </div>
    </div>

    <template v-if="!settingsStore.settings.gridView">
      <div v-if="rawAitTT !== undefined" class="d-flex gap-3">
        <button class="btn btn-outline-primary" @click="selectedWeek = currentWeek">
          <i class="fa-solid fa-house"></i>
        </button>
        <div class="d-flex flex-grow-1 justify-content-between align-items-center">
          <button
            class="btn btn-outline-primary"
            @click="selectedWeek--"
            :disabled="selectedWeek === 1"
          >
            <i class="fa-solid fa-arrow-left"></i>
          </button>
          <span
            >{{ selectedWeek }} неделя / {{ format(firstDayOfSelectedWeek, 'dd.MM') }} -
            {{ format(addDays(firstDayOfSelectedWeek, 5), 'dd.MM') }}</span
          >
          <button
            class="btn btn-outline-primary"
            @click="selectedWeek++"
            :disabled="selectedWeek === 52"
          >
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <div v-else class="d-flex gap-3 bg-body">
        <button
          :class="{
            active: !showEvenWeek,
            'text-body-secondary': showEvenWeek
          }"
          class="btn btn-outline-secondary w-50"
          @click="showEvenWeek = false"
        >
          Нечетная неделя
        </button>
        <button
          :class="{
            active: showEvenWeek,
            'text-body-secondary': !showEvenWeek
          }"
          class="btn btn-outline-secondary w-50"
          @click="showEvenWeek = true"
        >
          Четная неделя
        </button>
      </div>

      <template v-for="(day, key) in 7">
        <ScheduleListCard
          v-if="
            weeklyScheduleList[key.toString()] ||
            (rawAitTT && rawAitTT[format(addDays(firstDayOfSelectedWeek, key - 1), 'yyyy.M.d')])
          "
          :sfuData="weeklyScheduleList[key.toString()]"
          :ait-data="
            rawAitTT
              ? rawAitTT[format(addDays(firstDayOfSelectedWeek, key - 1), 'yyyy.M.d')]
              : undefined
          "
          :day-of-week="days[key - 1]"
          :date-string="
            rawAitTT
              ? format(addDays(firstDayOfSelectedWeek, key - 1), 'dd MMMM', { locale: ru })
              : ''
          "
        />
      </template>
    </template>

    <ScheduleGridCard
      v-for="(day, key) in weeklyScheduleGrid"
      v-else
      :data="day"
      :day-of-week="days[key - 1]"
      :highlight-even="isEvenWeek"
    />
  </template>
</template>
<script setup>
import { institutesShortNameObj } from '@/stores/search.js'
import ScheduleHeader from '@/components/Schedule/ScheduleHeader.vue'
import ScheduleHeaderPlaceholder from '@/components/Placeholder/ScheduleHeaderPlaceholder.vue'
import { computed, ref } from 'vue'
import ScheduleItem from '@/components/Schedule/ScheduleItem.vue'
import { useSettingsStore } from '@/stores/settings.js'
import ScheduleListCard from '@/components/Schedule/ScheduleListCard.vue'
import ScheduleGridCard from '@/components/Schedule/ScheduleGridCard.vue'
import { currentWeek, isEvenWeek, toDateString, today } from '../utils/date.js'
import { addDays, addWeeks, format } from 'date-fns'
import { useProfilesStore } from '@/stores/profiles.js'
import ScheduleItemPlaceholder from '@/components/Placeholder/ScheduleItemPlaceholder.vue'
import ScheduleListCardPlaceholder from '@/components/Placeholder/ScheduleListCardPlaceholder.vue'
import ScheduleGridCardPlaceholder from '@/components/Placeholder/ScheduleGridCardPlaceholder.vue'
import { times } from '@/stores/schedule.js'
import { ru } from 'date-fns/locale/ru'

const settingsStore = useSettingsStore()
const profilesStore = useProfilesStore()

const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']

const showNextDay = ref(false)
const showEvenWeek = ref(isEvenWeek)

const selectedWeek = ref(currentWeek)

const firstDayOfSelectedWeek = computed(() => {
  return addWeeks(new Date(today.getFullYear(), 0, 1), selectedWeek.value - 1)
})

const currentSchedule = computed(() => {
  if (props.loading) return null
  return props.rawSfuTT.timetable
    .filter(
      (item) =>
        parseInt(item.week) === (currentWeek % 2 ? 1 : 2) &&
        parseInt(item.day) === addDays(today, showNextDay.value ? 1 : 0).getDay()
    )
    .reduce((accumulator, item) => {
      accumulator[item.time] = item
      return accumulator
    }, {})
})

const currentAitSchedule = computed(() => {
  if (!props.rawAitTT) return {}
  return props.rawAitTT[format(showNextDay.value ? addDays(today, 1) : today, 'yyyy.M.d')]
})

const weeklyScheduleGrid = computed(() => {
  if (props.loading) return null
  return props.rawSfuTT.timetable.reduce((accumulator, item) => {
    if (!accumulator[item.day]) {
      accumulator[item.day] = {}
    }

    if (!accumulator[item.day][item.time]) {
      accumulator[item.day][item.time] = []
    }

    accumulator[item.day][item.time].push(item)
    return accumulator
  }, {})
})

const weeklyScheduleList = computed(() => {
  if (props.loading) return null
  return props.rawSfuTT.timetable.reduce((accumulator, item) => {
    if (!props.rawAitTT) {
      if (item.week === (showEvenWeek.value ? '1' : '2'))
        return accumulator
    } else {
      if (item.week === (!(selectedWeek.value % 2) ? '1' : '2')) return accumulator
    }

    if (!accumulator[item.day]) {
      accumulator[item.day] = {}
    }

    accumulator[item.day][item.time] = item
    return accumulator
  }, {})
})

const props = defineProps({
  rawSfuTT: Object,
  rawAitTT: Object,
  showFavorites: Boolean,
  loading: Boolean
})
</script>
