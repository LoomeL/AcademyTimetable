<template>
  <div class="d-flex flex-column gap-2">
    <div
        class="d-flex justify-content-between align-items-center"
        @click="showCourses = !showCourses"
    >
      <div class="d-flex flex-column">
        <span class="fs-5">{{ shortName }}</span>
        <span class="text-body-tertiary">{{ name }}</span>
      </div>
      <div class="px-2 text-body-tertiary">
        <i
            :class="{ 'fa-chevron-down': (show || !showCourses), 'fa-chevron-up': (show || showCourses) }"
            class="fa-solid fs-5"
        ></i>
      </div>
    </div>

    <slot v-if="show || showCourses"/>
  </div>
</template>
<script setup>
import {ref} from 'vue'

const showCourses = ref(false)

const props = defineProps({
  name: String,
  shortName: String,
  show: Boolean
})
</script>
