<template>
  <div class="card">
    <div class="card-header">{{ dayOfWeek }}</div>
    <div class="card-body p-0">
      <div class="grid-item__container text-center">
        <div class="grid-item__schedule py-2" :class="{'grid-item--active' : !highlightEven}">Нечетная неделя</div>
        <div class="grid-item__schedule py-2" :class="{'grid-item--active' : highlightEven}">Четная неделя</div>
      </div>
      <div class="grid-item__container" v-for="(item, i) in data">
        <template v-if="item.length === 1">
          <div class="grid-item__placeholder" v-if="item[0].week === '2'" :class="{'grid-item--active': !highlightEven}"></div>
          <ScheduleItem class="grid-item__schedule" :sfu-t-t="item[0]" :class="{'grid-item--active': (item[0].week === (highlightEven ? '2' : '1'))}"/>
          <div class="grid-item__placeholder" v-if="item[0].week === '1'" :class="{'grid-item--active': highlightEven}"></div>
        </template>

        <template v-else>
          <ScheduleItem class="grid-item__schedule" :sfu-t-t="item[0]" :class="{'w-100 grid-item--active': !compare(item[0], item[1]), 'grid-item--active': !highlightEven}"/>
          <ScheduleItem class="grid-item__schedule" :sfu-t-t="item[1]" :class="{'grid-item--active': highlightEven}" v-if="compare(item[0], item[1])"/>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup>
import ScheduleItem from '@/components/Schedule/ScheduleItem.vue'
import {onMounted} from "vue";

const compare = (even, odd) => {
  const { week: week1, ...rest1 } = even;
  const { week: week2, ...rest2 } = odd;
  return JSON.stringify(rest1) !== JSON.stringify(rest2);
}

defineProps({
  data: Array,
  dayOfWeek: String,
  highlightEven: Boolean
})
</script>
