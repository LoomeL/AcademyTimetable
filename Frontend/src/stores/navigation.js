import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNavigationStore = defineStore('navigation', () => {
  const currentPage = ref('SchedulePage')

  return { currentPage }
})
