<template>
  <div
    class="mt-2 position-absolute top-100 start-0 w-100 z-1 bg-body-tertiary shadow-lg d-flex flex-column rounded-2"
  >
    <button
      v-for="item in list"
      class="btn btn-outline-secondary border-0 text-start text-body-emphasis"
      @click="handler(item)"
    >
      {{ item }}
    </button>
  </div>
</template>
<script setup>
defineProps({
  list: Array,
  handler: Function
})
</script>
