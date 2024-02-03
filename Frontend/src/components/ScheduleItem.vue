<template>
  <li class="list-group-item fw-light position-relative">
    <ul class="list-unstyled d-flex gap-1 flex-column my-1">
      <li>
        <h6 class="m-0 fw-medium">{{ data.subject }}</h6>
      </li>
      <li class="d-flex align-items-center gap-2 "  v-if="data.subject !== 'День военной подготовки' && compact">
        <span class="text-success fw-normal">{{ data.type }}</span>
        <div class="dot-separator"/>
        {{ data.sync }}
      </li>

      <li v-if="compact">
        {{ data.time }}
      </li>

      <li class="d-flex align-items-center gap-2 flex-wrap"  v-if="data.subject !== 'День военной подготовки' && !compact">
        {{ data.time }}
        <div class="dot-separator"/>
        <span class="text-success fw-normal">{{ data.type }}</span>
        <div class="dot-separator"/>
        {{ data.sync }}
      </li>

      <li v-if="data.subject !== 'День военной подготовки'">
        {{ data.place }}
      </li>
      <li  v-if="data.subject !== 'День военной подготовки'">
        <a href="#" class="text-decoration-none text-body-emphasis">
          {{ data.teacher }}
        </a>
      </li>
<!--      <li class="fw-normal text-primary">
        До конца ленты сталось 10 минут
      </li>-->
    </ul>
<!--    <div class="position-absolute end-0 top-0 m-2">
      <div class="position-relative" style="width: 20px; height: 20px; fill: var(&#45;&#45;bs-primary)">
&lt;!&ndash;        <sfu-logo/>&ndash;&gt;
        <academy-logo class="position-absolute top-0 start-0"/>
&lt;!&ndash;        <i class="fa-regular fa-circle-exclamation text-danger fs-5"></i>&ndash;&gt;
&lt;!&ndash;        По клику открывать модалку в которой будет говориться что за накладка&ndash;&gt;
      </div>
    </div>-->
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