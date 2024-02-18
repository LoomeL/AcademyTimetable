<script setup>
import SearchInstitute from '@/components/Search/SearchInstitute.vue'
import SearchInstituteCourse from '@/components/Search/SearchInstituteCourse.vue'
import SearchInstituteGroup from '@/components/Search/SearchInstituteGroup.vue'
import InstitutePlaceholder from '@/components/Placeholder/SearchInstitutePlaceholder.vue'
import SearchField from '@/components/Search/SearchField.vue'
</script>

<template>
  <div class="d-flex flex-column align-items-center">
    <h4 class="mt-3">
      Как-то здесь пустовато <span style="font-family: 'Noto Color Emoji', sans-serif">😕</span>
    </h4>
    <p class="text-body-tertiary px-3 text-center">
      У тебя нет сохраненного расписания, выбери институт ниже или начни вводить номер группы в поле
      поиска
    </p>
  </div>

  <SearchField />

  <InstitutePlaceholder v-for="item in 7" v-if="false" />

  <SearchInstitute v-for="item in 7" v-else>
    <SearchInstituteCourse v-for="item in 7">
      <SearchInstituteGroup v-for="item in 7" />
    </SearchInstituteCourse>
  </SearchInstitute>
</template>
