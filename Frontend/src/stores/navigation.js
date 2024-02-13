import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import SchedulePage from '@/pages/SchedulePage.vue'

export const useNavigationStore = defineStore('navigation', () => {
  const currentPage = ref('SchedulePage')

  return { currentPage }
})
