<template>
  <div class="position-relative">
    <div class="input-group">
      <input class="form-control" type="text" placeholder="Начни вводить группу или фамилию" />
      <button class="btn btn-outline-secondary"><i class="fa-regular fa-x"></i></button>
    </div>

    <SearchAutocomplete :list="['1', '2']" />
  </div>
</template>

<script setup>
import SearchAutocomplete from '@/components/Search/SearchAutocomplete.vue'
</script>
