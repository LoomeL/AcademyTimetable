<template>
  <div class="card" v-for="i in 5">
    <div class="card-header">Вторник</div>
    <div class="card-body p-0">
      <div class="grid-item__container text-center">
        <div class="grid-item__schedule py-2 grid-item--active">Нечетная неделя</div>
        <div class="grid-item__schedule py-2">Четная неделя</div>
      </div>
      <div class="grid-item__container">
        <ScheduleItem class="grid-item__schedule" />
        <div class="grid-item__placeholder"></div>
      </div>
      <div class="grid-item__container">
        <div class="grid-item__placeholder grid-item--active"></div>
        <ScheduleItem class="grid-item__schedule" />
      </div>
      <div class="grid-item__container grid-item__container--oneChild">
        <ScheduleItem class="grid-item__schedule grid-item--active" />
      </div>
    </div>
  </div>
</template>
<script setup>
import ScheduleItem from '@/components/Schedule/ScheduleItem.vue'
</script>

<style scoped lang="scss">
.card-body {
  > :first-child {
    border: none;
  }

  > :last-child {
    &:not(.grid-item__container--oneChild) {
      > :first-child {
        border-bottom-left-radius: var(--bs-border-radius);
      }
      > :last-child {
        border-bottom-right-radius: var(--bs-border-radius);
      }
    }
    &.grid-item__container--oneChild {
      > * {
        border-bottom-left-radius: var(--bs-border-radius);
        border-bottom-right-radius: var(--bs-border-radius);
      }
    }
  }
}
.grid-item__container {
  display: flex;
  border-top: 1px solid var(--bs-border-color);
  > :nth-child(even) {
    border-left: 1px solid var(--bs-border-color);
  }
}
.grid-item__placeholder {
  width: 50%;
}
.grid-item__container--oneChild {
  .grid-item__schedule {
    width: 100%;
  }
}
.grid-item__schedule {
  width: 50%;
}
.grid-item--active {
  background-color: rgba(var(--bs-primary-rgb), 0.2);
}
</style>
