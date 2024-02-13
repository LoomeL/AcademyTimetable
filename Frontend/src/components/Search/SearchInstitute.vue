<template>
  <div class="d-flex flex-column gap-2">
    <div
      class="d-flex justify-content-between align-items-center"
      @click="showCourses = !showCourses"
    >
      <div class="d-flex flex-column">
        <span class="fs-5">ИКИТ</span>
        <span class="text-body-tertiary">Институт космических и информационных технологий</span>
      </div>
      <div class="px-2 text-body-tertiary">
        <i
          class="fa-solid fs-5"
          :class="{ 'fa-chevron-down': !showCourses, 'fa-chevron-up': showCourses }"
        ></i>
      </div>
    </div>

    <slot v-if="showCourses" />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const showCourses = ref(false)
</script>
