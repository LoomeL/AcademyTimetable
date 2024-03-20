<template>
  <div
    class="d-flex fs-4 py-3 px-5"
    :class="{ 'text-body-tertiary': !active, 'text-body-color': active }"
  >
    <slot />
  </div>
</template>
<script setup>
defineProps({
  active: Boolean
})
</script>
