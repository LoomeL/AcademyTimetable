<template>
  <div class="d-flex flex-column gap-2 p-3" v-if="!compact">
    <div class="placeholder placeholder-wave col-7 rounded-2 mb-1"></div>
    <div class="d-flex flex-wrap column-gap-2 align-items-center mb-1">
      <div class="placeholder placeholder-sm placeholder-wave col-3 rounded-2"></div>
      <div class="dot-separator" />
      <div class="placeholder placeholder-sm placeholder-wave col-3 rounded-2"></div>
      <div class="dot-separator" />
      <div class="placeholder placeholder-sm placeholder-wave col-3 rounded-2"></div>
    </div>
    <div class="placeholder placeholder-sm placeholder-wave col-6 rounded-2 mb-1"></div>
    <div class="placeholder placeholder-sm placeholder-wave col-4 rounded-2"></div>
  </div>
  <div class="d-flex flex-column gap-2 p-3" v-else>
    <div class="placeholder placeholder-wave col-10 rounded-2 mb-1"></div>
    <div class="d-flex flex-wrap gap-2 align-items-center mb-1">
      <div class="placeholder placeholder-sm placeholder-wave col-5 rounded-2"></div>
      <div class="dot-separator" />
      <div class="placeholder placeholder-sm placeholder-wave col-4 rounded-2"></div>
      <div class="dot-separator" />
      <div class="placeholder placeholder-sm placeholder-wave col-7 rounded-2 mt-1"></div>
    </div>
    <div class="placeholder placeholder-sm placeholder-wave col-9 rounded-2 mb-1"></div>
    <div class="placeholder placeholder-sm placeholder-wave col-7 rounded-2"></div>
  </div>
</template>

<script setup>
defineProps({
  compact: Boolean
})
</script>
