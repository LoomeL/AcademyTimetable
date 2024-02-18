<template>
  <div class="position-relative fw-light">
    <div class="d-flex flex-column gap-1 p-3 z-1">
      <span class="fw-normal">Мобильные приложения</span>
      <div class="d-flex flex-wrap column-gap-2 align-items-center">
        <span><span class="fw-normal">12:00</span>-13:35</span>
        <div class="dot-separator" />
        <span>пр. занятие</span>
        <div class="dot-separator" />
        синхронно
      </div>
      <span>Корпус №17, <span class="fw-normal">ауд. 4-02</span></span>
      <a href="" class="text-decoration-none text-body">Раевич К. В.</a>
    </div>

    <div class="position-absolute end-0 top-0 p-3" v-if="false">
      <i class="text-danger fs-5 fa-solid fa-exclamation" v-if="true"></i>
      <academy-logo style="width: 24px; height: 24px" class="text-primary" v-else />
    </div>

    <div class="position-absolute end-0 bottom-0 z-0 text-body-tertiary opacity-25" v-if="false">
      <academy-logo style="width: 70px; height: 70px" v-if="false" />
      <sfu-logo style="width: 70px; height: 70px" class="text-body-tertiary opacity-50" v-else />
    </div>
  </div>
</template>
<script setup>
import AcademyLogo from '@/components/Logos/AcademyLogo.vue'
import SfuLogo from '@/components/Logos/SfuLogo.vue'
</script>
<style scoped>
.dot-separator {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: var(--bs-tertiary-color);
}
</style>
