<template>
  <li class="list-group-item fw-light position-relative">
    <ul class="list-unstyled d-flex gap-1 flex-column my-1">
      <li>
        <h6 class="m-0 fw-medium">{{ data.subject }}</h6>
      </li>

      <li class="d-flex align-items-center column-gap-2 flex-wrap"  v-if="(data.type !== '' && data.type !== undefined) && compact">
        <span class="text-success fw-normal">{{ data.type }}</span>
        <div class="dot-separator" v-if="data.sync !== ''"/>
        {{ data.sync }}
      </li>

      <li v-if="compact">
        {{ data.time }}
      </li>

      <li class="d-flex align-items-center gap-2 flex-wrap"  v-if="!compact">
        {{ data.time }}
        <div class="dot-separator" v-if="data.type !== ''"/>
        <span class="text-success fw-normal">{{ data.type }}</span>
        <div class="dot-separator" v-if="data.sync !== ''"/>
        {{ data.sync }}
      </li>

      <li v-if="data.place !== ''">
        {{ data.place }}
      </li>
      <li  v-if="data.teacher !== ''">
        <a href="#" class="text-decoration-none text-body-emphasis">
          {{ data.teacher }}
        </a>
      </li>
      <li class="fw-normal text-primary" v-if="false && !compact">
        До конца ленты сталось 10 минут
      </li>
    </ul>
    <div class="position-absolute end-0 top-0 m-2" v-if="academyData !== undefined">
      <div class="position-relative" style="width: 20px; height: 20px; fill: var(--bs-primary)">
        <academy-logo class="position-absolute top-0 start-0" v-if="data === undefined"/>
        <i class="fa-regular fa-circle-exclamation text-danger fs-5" v-if="data !== undefined"></i>
<!--        По клику открывать модалку в которой будет говориться что за накладка-->
      </div>
    </div>
  </li>
</template>
<script>
import SfuLogo from "@/components/logos/SfuLogo.vue";
import AcademyLogo from "@/components/logos/AcademyLogo.vue";

export default {
  name: 'ScheduleItem',
  components: {AcademyLogo, SfuLogo},
  props: {
    data: Object,
    compact: Boolean,
    academyData: Object,
    error: Boolean
  }
}
</script>
<style>
.dot-separator {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: var(--bs-body-color)
}
</style>