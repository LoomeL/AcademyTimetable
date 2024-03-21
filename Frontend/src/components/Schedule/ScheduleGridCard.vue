<template>
  <div class="card">
    <div class="card-header">{{ dayOfWeek }}</div>
    <div class="card-body p-0">
      <div class="grid-item__container text-center">
        <div :class="{ 'grid-item--active': !highlightEven }" class="grid-item__schedule py-2">
          Нечетная неделя
        </div>
        <div :class="{ 'grid-item--active': highlightEven }" class="grid-item__schedule py-2">
          Четная неделя
        </div>
      </div>
      <div v-for="(item, i) in data" class="grid-item__container">
        <template v-if="item.length === 1">
          <div
            v-if="item[0].week === '2'"
            :class="{ 'grid-item--active': !highlightEven }"
            class="grid-item__placeholder"
          ></div>
          <ScheduleItem
            :class="{ 'grid-item--active': item[0].week === (highlightEven ? '2' : '1') }"
            :sfu-t-t="item[0]"
            class="grid-item__schedule"
          />
          <div
            v-if="item[0].week === '1'"
            :class="{ 'grid-item--active': highlightEven }"
            class="grid-item__placeholder"
          ></div>
        </template>

        <template v-else>
          <ScheduleItem
            :class="{
              'w-100 grid-item--active': !compare(item[0], item[1]),
              'grid-item--active': !highlightEven
            }"
            :sfu-t-t="item[0]"
            class="grid-item__schedule"
          />
          <ScheduleItem
            v-if="compare(item[0], item[1])"
            :class="{ 'grid-item--active': highlightEven }"
            :sfu-t-t="item[1]"
            class="grid-item__schedule"
          />
        </template>
      </div>
    </div>
  </div>
</template>
<script setup>
import ScheduleItem from '@/components/Schedule/ScheduleItem.vue'

const compare = (even, odd) => {
  const { week: week1, ...rest1 } = even
  const { week: week2, ...rest2 } = odd
  return JSON.stringify(rest1) !== JSON.stringify(rest2)
}

defineProps({
  data: Array,
  dayOfWeek: String,
  highlightEven: Boolean
})
</script>
