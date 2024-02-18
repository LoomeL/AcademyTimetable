<script setup>
import SearchField from '@/components/Search/SearchField.vue'
import SearchInstituteGroup from '@/components/Search/SearchInstituteGroup.vue'
import SearchInstituteCourse from '@/components/Search/SearchInstituteCourse.vue'
import SearchInstitute from '@/components/Search/SearchInstitute.vue'
import InstitutePlaceholder from '@/components/Placeholder/SearchInstitutePlaceholder.vue'
</script>

<template>
  <SearchField />

  <SearchInstitute v-for="item in 7">
    <SearchInstituteCourse v-for="item in 7">
      <SearchInstituteGroup v-for="item in 7" />
    </SearchInstituteCourse>
  </SearchInstitute>
</template>

<style scoped></style>
