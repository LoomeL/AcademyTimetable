<template>
  <div
    :class="{ 'text-body-tertiary': !active, 'text-body-color': active }"
    class="d-flex fs-4 py-3 px-5"
  >
    <slot />
  </div>
</template>
<script setup>
defineProps({
  active: Boolean
})
</script>
