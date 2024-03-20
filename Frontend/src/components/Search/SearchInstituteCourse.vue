<template>
  <div class="bg-secondary bg-opacity-25 rounded-2 p-2 d-flex flex-column gap-2 ms-3">
    <div
      class="d-flex justify-content-between"
      :class="{ 'mb-1': (show || showGroups) }"
      @click="showGroups = !showGroups"
    >
      <h6 class="m-0">{{ (name >= 7 ? name - 6 : name) + " Курс"}} <span class="badge bg-primary bg-opacity-75 fw-normal" v-if="name >= 7">Магистратура</span></h6>
      <i
        class="fa-solid fs-5"
        :class="{ 'fa-chevron-down': (show || !showGroups), 'fa-chevron-up': (show || showGroups) }"
      ></i>
    </div>

    <slot v-if="show || showGroups" />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const showGroups = ref(false)

defineProps({
  name: String,
  show: Boolean
})
</script>
