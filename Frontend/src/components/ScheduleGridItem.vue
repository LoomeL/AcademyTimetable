<template>
  <li class="list-group-item p-0" v-if="compare()">
    <ul class="list-group list-group-horizontal ">
      <ScheduleItem :data="objA"  class="w-50 border-start-0 border-top-0 border-bottom-0  rounded-0" :class="{'bg-primary bg-opacity-10': week}" compact v-if="objA !== undefined"/>
      <li class="list-group-item w-50 border-start-0 border-top-0 border-bottom-0  rounded-0" :class="{'bg-primary bg-opacity-10': week}" v-else></li>
      <ScheduleItem :data="objB"  class="w-50 border-0  rounded-0" compact v-if="objB !== undefined"  :class="{'bg-primary bg-opacity-10': !week}"/>
      <li class="list-group-item w-50 border-end-0 border-top-0 border-bottom-0  rounded-0" :class="{'bg-primary bg-opacity-10': !week}" v-else></li>
    </ul>
  </li>
  <ScheduleItem :data="objA"  class="bg-primary bg-opacity-10" compact v-else/>
</template>
<script>
import ScheduleItem from "@/components/ScheduleItem.vue"

export default {
  name: 'ScheduleGridItem',
  components: {ScheduleItem},
  props: {
    objA: Object,
    objB: Object,
    week: Number,
  },
  methods: {
    compare() {
      if (this.objA === undefined || this.objB === undefined) return true
      const { week: week1, ...rest1 } = this.objA;
      const { week: week2, ...rest2 } = this.objB;
      return JSON.stringify(rest1) !== JSON.stringify(rest2);
    }
  }
}
</script>