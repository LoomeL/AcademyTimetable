<template>
 <div class="container">
   <div class="row justify-content-center" v-if="this.sfuTimetable !== null">
     <div class="col-12 col-md-8 col-lg-5 d-flex flex-column gap-3">
       <div class="d-flex gap-3">
         <div class="btn btn-outline-secondary border-0 flex-grow-1 w-50 py-2" :class="{'active': !showNextDay}" @click="showNextDay = false">
           <div class="text-center">
             <h5 class="mb-0">Сегодня</h5>
             <small>{{ dateFormat(0) }}</small>
           </div>
         </div>
         <div class="btn btn-outline-secondary border-0 flex-grow-1 w-50 py-2" :class="{'active': showNextDay}" @click="showNextDay = true">
           <div class="text-center">
             <h5 class="mb-0">Завтра</h5>
             <small>{{ dateFormat(1) }}</small>
           </div>
         </div>
       </div>
       <div class="card">
         <div class="card-body p-0">
           <ul class="list-group rounded-2 list-group-flush" v-if="this.sfuTimetable.timetable
                .filter(item => item.week == (this.currentWeek % 2 ? 1 : 2) && item.day == this.today.getDay() + (this.showNextDay ? 1 : 0)).length !== 0">
             <schedule-item :data="i" v-for="i in [...this.sfuTimetable.timetable
                .filter(item => item.week == (this.currentWeek % 2 ? 1 : 2) && item.day == this.today.getDay() + (this.showNextDay ? 1 : 0)),
                ...selectedAcademyTimetable.filter(f => f.date === getFormattedDateOfToday((this.showNextDay ? 1 : 0), 'yyyy.M.dd'))]"/>
           </ul>
            <h5 class="w-100 text-center my-4" v-else>Лент нет, можно отдыхать</h5>
         </div>
       </div>

<!--       <div class="d-flex overflow-y-auto gap-2">
         <button class="btn btn-outline-primary flex-shrink-0" v-for="i in 4">КИ21-21Б (1 подгруппа)</button>
       </div>-->

       <div class="card">
         <div class="card-body">
           <h4>{{ this.sfuTimetable.target }}</h4>
           {{ this.toShortInstituteName(this.sfuTimetable.institute) }} - {{ this.sfuTimetable.institute }}
           <hr class="m-0 my-2">
           Идет {{ (currentWeek % 2) ? "нечетная" : "четная" }} неделя
         </div>
       </div>

       <div class="d-flex justify-content-between">
         <div class="btn-group">
           <button class="btn btn-outline-primary" :class="{'active': !gridMode}" @click="gridMode = false"><i class="fa-regular fa-list"></i></button>
           <button class="btn btn-outline-primary" :class="{'active': gridMode}" @click="gridMode = true"><i class="fa-regular fa-grid-2"></i></button>
         </div>
         <div>
<!--           <button class="btn btn-outline-danger"><i class="fa-regular fa-heart"></i> В избранное</button>-->
           <select class="form-select" v-model="groupSelector" v-if="academyTimetable !== null" v-on:change="handleSelector()">
            <option value="0" selected>Выберете...</option>
             <option v-for="item in  [...new Set(academyTimetable.map(item => item.group))].sort()">{{item}}</option>
           </select>
         </div>
       </div>

       <div class="d-flex" v-if="!this.gridMode">
         <button class="btn btn-outline-primary me-2" @click="resetWeekSelector()"><i class="fa-regular fa-home"></i></button>
         <div class="d-flex justify-content-between flex-grow-1 align-items-center">
           <button class="btn btn-outline-primary" @click="changeWeek(-1)" :disabled="selectedWeek===1"><i class="fa-regular fa-arrow-left"></i></button>
           <h6 class="m-0">{{ this.selectedWeek }} неделя / {{ format(startOfISOWeek(this.startOfSelectedWeek), "dd.MM") }} -
             {{ format(endOfISOWeek(this.startOfSelectedWeek), "dd.MM") }}
           </h6>
           <button class="btn btn-outline-primary" @click="changeWeek(1)"><i class="fa-regular fa-arrow-right"></i></button>
         </div>
       </div>

       <div class="card" v-if="!this.gridMode" v-for="item in getTimetableAsObject()">
         <div class="card-header fs-5 fw-bold d-flex justify-content-between">
           <span>{{ this.days[item[0].day - 1] }}</span>
           <span class="fs-6 text-secondary d-flex align-items-center">{{ getForamatedDateOfWeek(item[0].day - 1, "d MMMM") }}</span>
         </div>
         <div class="card-body p-0">
           <ul class="list-group rounded-2 list-group-flush">
             <schedule-item :data="i" compact v-for="i in [...item, ...selectedAcademyTimetable.filter(f => f.date === getForamatedDateOfWeek(item[0].day - 1, 'yyyy.M.dd'))]"/>
           </ul>
         </div>
       </div>

       <div class="card" v-if="this.gridMode" v-for="item in Object.groupBy(this.sfuTimetable.timetable, ({day}) => day)">
         <div class="card-header fs-5 fw-bold d-flex justify-content-between">
           <span>{{this.days[item[0].day -1]}}</span>
         </div>
         <div class="card-body p-0">
           <ul class="list-group rounded-2 list-group-flush">
             <li class="list-group-item p-0">
               <ul class="list-group list-group-horizontal text-center">
                <li class="list-group-item w-50 border-start-0 border-top-0 border-bottom-0  rounded-0" :class="{'bg-primary bg-opacity-10': currentWeek % 2}"> Нечетная неделя</li>
                <li class="list-group-item w-50 border-0  rounded-0" :class="{'bg-primary bg-opacity-10': !(currentWeek % 2)}"> Четная неделя</li>
               </ul>
             </li>

             <ScheduleGridItem :obj-a="i.filter(x => x.week == 1)[0]" :obj-b="i.filter(x => x.week == 2)[0]" :week="currentWeek % 2" v-for="i in Object.groupBy(item, ({time}) => time)"/>

           </ul>
         </div>
       </div>
     </div>
   </div>
 </div>
</template>
<script>
import ScheduleItem from "@/components/ScheduleItem.vue";
import {addDays, addWeeks, endOfISOWeek, format, getISOWeek, startOfISOWeek} from "date-fns";
import {ru} from "date-fns/locale/ru";
import ScheduleGridItem from "@/components/ScheduleGridItem.vue";

export default {
  name: "ScheduleView",
  components: {ScheduleGridItem, ScheduleItem},
  data() {
    return {
      sfuTimetable: null,
      academyTimetable: null,
      days: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
      gridMode: false,
      currentWeek: 1,
      selectedWeek: 1,
      startOfSelectedWeek: null,
      today: new Date(),
      showNextDay: false,
      groupSelector: 0,
      selectedAcademyTimetable: [],
    }
  },
  methods: {
    endOfISOWeek,
    startOfISOWeek,
    format,

    handleSelector() {
      if (this.groupSelector === 0) {
        this.selectedAcademyTimetable = []
      } else {
        this.selectedAcademyTimetable = this.academyTimetable.filter(item => item.group === this.groupSelector)
        console.log(this.selectedAcademyTimetable)
      }
    },

    changeWeek(step) {
      if (this.selectedWeek + step === 0) return;
      this.selectedWeek += step
      this.startOfSelectedWeek = addWeeks(this.startOfSelectedWeek, step)
    },

    async fetchSfuTimetable() {
      const response = fetch("https://edu.sfu-kras.ru/api/timetable/get&target=" + this.$route.params.name)
          .then(result => result.json())
          .then(data => {
            this.sfuTimetable = data
          })
    },

    fetchAcademyTimetable() {
      fetch("/ait.json")
          .then(result => result.json())
          .then(data => {
            this.academyTimetable = data
          })
    },
    toShortInstituteName(name) {
      const institutes = [
        ["Институт архитектуры и дизайна", "ИАиД"],
        ["Институт фундаментальной биологии и биотехнологии", "ИФБиБТ"],
        ["Институт космических и информационных технологий", "ИКИТ"],
        ["Институт торговли и сферы услуг", "ИТиСУ"],
        ["Институт Севера и Арктики", "ИСиА"],
        ["Военный учебный центр", "ВУЦ"],
        ["Военно-инженерный институт", "ВИИ"],
        ["Институт филологии и языковой коммуникации", "ИФиЯК"],
        ["Институт экономики, государственного управления и финансов", "ИЭГУиФ"],
        ["Институт нефти и газа", "ИНиГ"],
        ["Институт горного дела, геологии и геотехнологий", "ИГДГиГ"],
        ["Гуманитарный институт", "ГИ"],
        ["Инженерно-строительный институт", "ИСИ"],
        ["Институт математики и фундаментальной информатики", "ИМиФИ"],
        ["Политехнический институт", "ПИ"],
        ["Институт управления бизнес-процессами", "ИУБП"],
        ["Институт инженерной физики и радиоэлектроники", "ИИФиРЭ"],
        ["Институт физической культуры, спорта и туризма", "ИФКСиТ"],
        ["Институт педагогики, психологии и социологии", "ИППС"],
        ["Институт цветных металлов и материаловедения", "ИЦМиМ"],
        ["Институт экологии и географии", "ИЭиГ"],
        ["Институт гастрономии", "ИГ"],
        ["Юридический институт", "ЮИ"]
      ]
      return institutes.find(([fullName]) => fullName === name)?.[1] ?? name
    },

    getTimetableAsObject() {
      return this.sfuTimetable.timetable
          .filter(item => item.week == (this.selectedWeek % 2 ? 1 : 2))
          .reduce((acc, item) => {
            const key = item.day;
            acc[key] = acc[key] || [];
            acc[key].push(item);
            return acc;
          }, {});
    },

    resetWeekSelector() {
      this.selectedWeek = this.currentWeek
      this.startOfSelectedWeek = addWeeks(new Date(this.today.getFullYear(), 0, 1), this.currentWeek - 1)
    },

    dateFormat(span = 0) {
      return format(addDays(this.today, span), "EEEE, d MMMM", { locale: ru });
    },

    getForamatedDateOfWeek(span, dateFormat) {
      return format(addDays(this.startOfSelectedWeek, span), dateFormat, { locale: ru });
    },

    getFormattedDateOfToday(span, dateFormat) {
      return format(addDays(this.today, span), dateFormat, { locale: ru });
    },
  },
  mounted() {
    this.currentWeek = getISOWeek(this.today)
    this.resetWeekSelector()
    this.fetchSfuTimetable()
    this.fetchAcademyTimetable()
  }
}
</script>
