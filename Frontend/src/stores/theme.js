import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(localStorage.getItem('theme') || 'dark')

  function setTheme() {
    document.body.setAttribute('data-bs-theme', theme.value)
  }
  function changeTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', theme.value)
    setTheme()
  }

  return {
    theme,
    changeTheme,
    setTheme
  }
})
