<script setup>
import ScheduleItem from '@/components/Schedule/ScheduleItem.vue'
import ScheduleGridCard from '@/components/Schedule/ScheduleGridCard.vue'
import ScheduleListCard from '@/components/Schedule/ScheduleListCard.vue'
</script>

<template>
  <div class="d-flex justify-content-between text-body-tertiary">
    <div class="d-flex gap-2 align-items-center fs-5">
      <i class="fa-solid fa-chevron-left"></i>Назад
    </div>
    <div class="d-flex gap-2 align-items-center fs-5">
      <i class="fa-regular fa-bookmark"></i>Сохранить
    </div>
  </div>

  <div class="card">
    <div class="card-body">
      <h5 class="mb-0">КИ21-21Б (1 подгруппа)</h5>
      Совмещено с АИТ22-05
      <hr class="my-2" />
      ИКИТ - институт космических и информационных технологий
      <br />
      <small class="text-body-tertiary">Идет четная неделя</small>
    </div>
  </div>

  <div class="card">
    <div class="card-body">
      <h5 class="mb-0">Иванов И.И.</h5>
      <hr class="my-2" />
      Преподователь
      <br />
      <small class="text-body-tertiary">Идет четная неделя</small>
    </div>
  </div>

  <div class="d-flex gap-3">
    <div class="btn btn-outline-secondary w-50 active">
      <h5 class="m-0">Сегодня</h5>
      <span class="text-body-secondary">пн, 1 января</span>
    </div>
    <div class="btn btn-outline-secondary w-50 text-body-secondary">
      <h5 class="m-0">Завтра</h5>
      <span class="text-body-secondary">вт, 2 января</span>
    </div>
  </div>

  <div class="card">
    <div class="card-body p-0 schedule-list-border">
      <ScheduleItem v-for="i in 3" />
    </div>
  </div>

  <div class="d-flex gap-3">
    <div class="btn-group">
      <button class="btn btn-outline-primary">
        <i class="fa-solid fa-list"></i>
      </button>
      <button class="btn btn-outline-primary">
        <i class="fa-solid fa-grip"></i>
      </button>
    </div>
    <div class="d-flex gap-3 overflow-x-auto">
      <button class="btn btn-outline-primary flex-shrink-0" v-for="i in 2">
        КИ21-21Б (1 подгруппа)
      </button>
    </div>
  </div>

  <div class="d-flex gap-3" v-if="false">
    <button class="btn btn-outline-primary"><i class="fa-solid fa-house"></i></button>
    <div class="d-flex flex-grow-1 justify-content-between align-items-center">
      <button class="btn btn-outline-primary"><i class="fa-solid fa-arrow-left"></i></button>
      <span>6 неделя / 05.02 - 11.02</span>
      <button class="btn btn-outline-primary"><i class="fa-solid fa-arrow-right"></i></button>
    </div>
  </div>

  <div class="d-flex gap-3 bg-body">
    <button class="btn btn-outline-secondary w-50 active">Нечетная неделя</button>
    <button class="btn btn-outline-secondary text-body-secondary w-50">Четная неделя</button>
  </div>

  <!--  <ScheduleAlert/>-->

  <ScheduleListCard />

  <ScheduleGridCard v-for="i in 5" />
</template>
