<template>
  <template v-if="searchStore.selectedGroup === ''">
    <SearchField />

    <template v-if="searchStore.loading">
      <InstitutePlaceholder v-for="_ in 12" />
    </template>

    <SearchInstitute
      v-for="(departments, name) in searchStore.institutes"
      v-else
      :name="name"
      :short-name="institutesShortNameObj[name]"
    >
      <div v-for="(courses, departmentName) in departments" class="d-flex gap-2 flex-column">
        <h5 class="ms-3 mb-0">
          {{ departmentName }}
        </h5>
        <SearchInstituteCourse v-for="(groups, courseName) in courses" :name="courseName">
          <SearchInstituteGroup v-for="group in groups" @click="searchStore.selectedGroup = group">
            {{ group }}
          </SearchInstituteGroup>
        </SearchInstituteCourse>
      </div>
    </SearchInstitute>
  </template>

  <template v-else>
    <div class="d-flex justify-content-between text-body-tertiary">
      <div class="d-flex gap-2 align-items-center fs-5" @click="searchStore.selectedGroup = ''">
        <i class="fa-solid fa-chevron-left"></i>Назад
      </div>
      <div v-if="sfu" class="d-flex gap-2 align-items-center fs-5" @click="addToProfiles()">
        <i
          :class="{ 'fa-regular': !isExistInProfiles, 'fa-solid': isExistInProfiles }"
          class="fa-bookmark"
        ></i
        >Сохранить
      </div>
    </div>

    <Schedule :loading="!sfu" :raw-sfu-t-t="sfu" />
  </template>
</template>

<script setup>
import SearchField from '@/components/Search/SearchField.vue'
import SearchInstituteGroup from '@/components/Search/SearchInstituteGroup.vue'
import SearchInstituteCourse from '@/components/Search/SearchInstituteCourse.vue'
import SearchInstitute from '@/components/Search/SearchInstitute.vue'
import InstitutePlaceholder from '@/components/Placeholder/SearchInstitutePlaceholder.vue'
import { institutesShortNameObj, useSearchStore } from '@/stores/search.js'
import { computed } from 'vue'
import Schedule from '@/components/Schedule.vue'
import { useProfilesStore } from '@/stores/profiles.js'
import { fetchSfuTT } from '@/utils/requests.js'
import { computedAsync } from '@vueuse/core'

const searchStore = useSearchStore()
const profilesStore = useProfilesStore()

const isExistInProfiles = computed(() => {
  return (
    profilesStore.profiles.find((i) => i.sfu === searchStore.selectedGroup && i.ait === '') !==
    undefined
  )
})

const sfu = computedAsync(async () => {
  return searchStore.selectedGroup !== '' ? await fetchSfuTT(searchStore.selectedGroup) : undefined
})

const addToProfiles = () => {
  if (!isExistInProfiles.value)
    profilesStore.profiles.push({
      id: profilesStore.profiles.length,
      name: searchStore.selectedGroup,
      sfu: searchStore.selectedGroup,
      ait: ''
    })
}
</script>
