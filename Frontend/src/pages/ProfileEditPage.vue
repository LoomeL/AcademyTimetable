<template>
  <div class="d-flex flex-column gap-1">
    <div class="d-flex justify-content-between align-items-center">
      <h4 class="m-0">Радектирование профиля</h4>
      <i class="fa-close fa-solid fs-3 pe-1" @click="profilesStore.editorSelectedProfile = {}"></i>
    </div>
    <p class="text-body-tertiary m-0">
      Здесь можно изменить имя или группу профиля. Что-бы отключить слияние расписаний, достаточно
      оставить поле академии ИТ пустым.
    </p>
  </div>

  <div>
    <label class="form-label" for="profileName">Имя профиля</label>
    <input
      id="profileName"
      v-model="profile.name"
      :class="isValidName"
      class="form-control"
      type="text"
    />
    <div class="invalid-feedback">Поле не может быть пустым</div>
  </div>

  <div class="position-relative">
    <label class="form-label" for="primaryGroup">Основная группа</label>
    <input
      id="primaryGroup"
      v-model="profile.sfu"
      :class="isValidSfuGroup"
      class="form-control"
      type="text"
      @focusin="sfuShowAutoComplete = true"
      @focusout="sfuShowAutoComplete = false"
    />

    <transition>
      <SearchAutocomplete
        v-if="sfuShowAutoComplete && sfuAutoCompleteData.length > 0"
        :handler="selectSfuGroup"
        :list="sfuAutoCompleteData"
      />
    </transition>
  </div>

  <div class="position-relative">
    <label class="form-label" for="secondaryGroup">Группа академии ИТ</label>
    <input
      id="secondaryGroup"
      v-model="profile.ait"
      :class="isValidAitGroup"
      class="form-control"
      type="text"
      @focusin="aitShowAutoComplete = true"
      @focusout="aitShowAutoComplete = false"
    />

    <transition>
      <SearchAutocomplete
        v-if="aitShowAutoComplete && aitAutoCompleteData.length > 0"
        :handler="selectAitGroup"
        :list="aitAutoCompleteData"
      />
    </transition>
  </div>

  <div class="d-flex justify-content-between">
    <button class="btn btn-outline-danger" @click="profilesStore.removeSelected()">
      <i class="fa-solid fa-remove"></i> Удалить профиль
    </button>
    <button
      :disabled="!isValidForm"
      class="btn btn-outline-primary"
      @click="profilesStore.handleSave()"
    >
      <i class="fa-solid fa-save"></i> Сохранить
    </button>
  </div>
</template>

<script setup>
import SearchAutocomplete from '@/components/Search/SearchAutocomplete.vue'
import { useProfilesStore } from '@/stores/profiles.js'
import { computedAsync } from '@vueuse/core'
import { fetchAutoComplete } from '@/utils/requests.js'
import { computed, ref } from 'vue'
import { useScheduleStore } from '@/stores/schedule.js'

const profilesStore = useProfilesStore()
const scheduleStore = useScheduleStore()

const profile = profilesStore.editorSelectedProfile

const isValidName = computed(() => {
  return profile.name.trim() !== '' ? 'is-valid' : 'is-invalid'
})

const sfuShowAutoComplete = ref(false)

const sfuAutoCompleteData = computedAsync(async () => {
  if (profile.sfu === '') return []
  const data = await fetchAutoComplete(profile.sfu)
  return Object.keys(data).splice(0, 6)
}, [profile.sfu])

const isValidSfuGroup = computed(() => {
  if (sfuAutoCompleteData.value && Array.from(sfuAutoCompleteData.value).includes(profile.sfu))
    return 'is-valid'
  return 'is-invalid'
})

const selectSfuGroup = (g) => {
  profile.sfu = g
}

const aitShowAutoComplete = ref(false)

const aitAutoCompleteData = computed(() => {
  if (profile.ait === '') return []
  return scheduleStore.aitGroups
    .filter((item) => item.toLowerCase().startsWith(profile.ait.toLowerCase()))
    .sort()
})

const isValidAitGroup = computed(() => {
  if (profile.ait === '') return ''
  if (aitAutoCompleteData.value && Array.from(aitAutoCompleteData.value).includes(profile.ait))
    return 'is-valid'
  return 'is-invalid'
})

const selectAitGroup = (g) => {
  profile.ait = g
}

const isValidForm = computed(() => {
  let score = 0
  if (isValidName.value === 'is-valid') score++
  if (isValidSfuGroup.value === 'is-valid') score++
  if (isValidAitGroup.value !== 'is-invalid') score++
  return score === 3
})
</script>
