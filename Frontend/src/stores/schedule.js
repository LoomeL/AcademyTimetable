import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { fetchAitTT } from '@/utils/requests.js'
import { computedAsync } from '@vueuse/core'

export const times = [
  '08:30-10:05',
  '10:15-11:50',
  '12:00-13:35',
  '14:10-15:45',
  '15:55-17:30',
  '17:40-19:15',
  '19:25-21:00'
]

export const useScheduleStore = defineStore('schedule', () => {
  const liveDate = ref(new Date())

  //TODO: МБ интервал должен отключаться при неиспользовании

  setInterval(() => {
    liveDate.value = new Date()
  }, 1000)

  const rawAitTT = computedAsync(async () => {
    return await fetchAitTT()
  }, [])

  const aitTT = computed(() => {
    return rawAitTT.value.reduce((accumulator, item) => {
      if (!accumulator[item.group]) {
        accumulator[item.group] = {}
      }

      if (!accumulator[item.group][item.date]) {
        accumulator[item.group][item.date] = {}
      }

      accumulator[item.group][item.date][item.time] = item
      return accumulator
    }, {})
  })

  const aitGroups = computed(() => {
    return aitTT.value ? Object.keys(aitTT.value) : []
  })

  return { liveDate, aitTT, aitGroups }
})
