<template>
  <div class="bg-secondary bg-opacity-25 rounded-2 p-2 d-flex flex-column gap-2 ms-3">
    <div
      class="d-flex justify-content-between"
      :class="{ 'mb-1': showGroups }"
      @click="showGroups = !showGroups"
    >
      <h6 class="m-0">1 Курс</h6>
      <i
        class="fa-solid fs-5"
        :class="{ 'fa-chevron-down': !showGroups, 'fa-chevron-up': showGroups }"
      ></i>
    </div>

    <slot v-if="showGroups" />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const showGroups = ref(false)
</script>
