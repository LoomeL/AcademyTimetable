<template>
  <div class="card" v-if="true">
    <div class="card-body">
      <h5 class="mb-0">{{ target }}</h5>
      {{ait}}
      <hr class="my-2"/>
      <span v-if="!teacher">{{instituteShortName !== undefined ? instituteShortName + ' - ' + instituteName : instituteName}}</span>
      <span v-else>Преподователь</span>
      <br/>
      <small class="text-body-tertiary">Идет четная неделя</small>
    </div>
  </div>
</template>
<script setup>

defineProps({
  teacher: Boolean,
  target: String,
  ait: String,
  instituteName: String,
  instituteShortName: String,
})

</script>