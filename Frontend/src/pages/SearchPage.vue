<template>
  <template v-if="searchStore.selectedGroup === ''">
    <SearchField/>

    <InstitutePlaceholder v-if="searchStore.loading" v-for="i in 7"/>

    <SearchInstitute :short-name="institutesShortNameObj[name]" :name="name" :show="Object.keys(searchStore.institutes).length === 1" v-for="(departments, name) in searchStore.institutes">
      <div class="d-flex gap-2 flex-column" v-for="(courses, departmentName) in departments">
        <h5 class="ms-3 mb-0">
          {{departmentName}}
        </h5>
        <SearchInstituteCourse :show="Object.keys(courses).length === 1" :name="courseName" v-for="(groups, courseName) in courses">
          <SearchInstituteGroup v-for="group in groups" @click="searchStore.selectedGroup = group">
            {{group}}
          </SearchInstituteGroup>
        </SearchInstituteCourse>
      </div>
    </SearchInstitute>
  </template>

  <template v-else>
    <div class="d-flex justify-content-between text-body-tertiary">
      <div class="d-flex gap-2 align-items-center fs-5" @click="searchStore.selectedGroup=''">
        <i class="fa-solid fa-chevron-left"></i>Назад
      </div>
      <div class="d-flex gap-2 align-items-center fs-5" @click="addToProfiles()" v-if="sfu">
        <i class="fa-bookmark" :class="{'fa-regular': !isExistInProfiles, 'fa-solid': isExistInProfiles }"></i>Сохранить
      </div>
    </div>

    <Schedule :raw-sfu-t-t="sfu" v-if="sfu && Object.keys(sfu).length !== 0"/>
    <ScheduleHeaderPlaceholder v-else/>

  </template>
</template>

<script setup>
import SearchField from '@/components/Search/SearchField.vue'
import SearchInstituteGroup from '@/components/Search/SearchInstituteGroup.vue'
import SearchInstituteCourse from '@/components/Search/SearchInstituteCourse.vue'
import SearchInstitute from '@/components/Search/SearchInstitute.vue'
import InstitutePlaceholder from '@/components/Placeholder/SearchInstitutePlaceholder.vue'
import { institutesShortNameObj, useSearchStore} from "@/stores/search.js";
import {computed, onMounted, ref, watch} from "vue";
import Schedule from "@/components/Schedule.vue";
import {useProfilesStore} from "@/stores/profiles.js";
import {fetchSfuTT} from "@/utils/requests.js";
import ScheduleHeaderPlaceholder from "@/components/Placeholder/ScheduleHeaderPlaceholder.vue";
import {computedAsync} from "@vueuse/core";

const searchStore = useSearchStore();
const profilesStore = useProfilesStore();

const isExistInProfiles = computed(() => {
  return profilesStore.profiles.find(i => i.sfu === searchStore.selectedGroup && i.ait === "") !== undefined
})

const sfu = computedAsync( async () => {
   return searchStore.selectedGroup ? await fetchSfuTT(searchStore.selectedGroup) : {}
})

const addToProfiles = () => {
  if (!isExistInProfiles.value) profilesStore.profiles.push({id: profilesStore.profiles.length, name: searchStore.selectedGroup, sfu: searchStore.selectedGroup, ait: ""})
}

onMounted(() => {
  searchStore.fetchInstitutes()
})

</script>