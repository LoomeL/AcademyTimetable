import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', () => {
  const getSettings = () => {
    let defaults = {
      darkTheme: true,
      gridView: false
    }
    const settings = JSON.parse(localStorage.getItem('settings')) || {}
    if (settings) {
      Object.keys(defaults).forEach((key) => {
        if (settings.hasOwnProperty(key)) {
          defaults[key] = settings[key]
        }
      })
    }
    return defaults
  }

  const settings = ref(getSettings())

  watch(
    settings,
    (nv) => {
      document.body.setAttribute('data-bs-theme', nv.darkTheme ? 'dark' : '')
      localStorage.setItem('settings', JSON.stringify(nv))
    },
    { deep: true }
  )

  return { settings }
})
