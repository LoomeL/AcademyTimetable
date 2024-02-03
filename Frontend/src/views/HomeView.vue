<template>
  <div class="container-sm">
    <div class="row gap-3 gap-lg-0" v-if="loaded">
      <div class="col-12 col-lg-4">
        <div class="card max-h">
          <div class="card-header fw-semibold text-body-secondary fs-6">
            Институты - {{ institutesCount }}
          </div>
          <div class="card-body overflow-auto">
            <div class="d-flex flex-column gap-1">
              <div role="button" class="btn btn-outline-secondary border-0"
                   :class="{'active': currentInstitute === item}"
                   v-for="item in institutes"
                   v-on:click="setInstitute(item)">
                <div class="text-start">
                  <h5 class="mb-0">{{ toShortInstituteName(item[0].institute) }}</h5>
                  <small>{{ item[0].institute }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="card max-h" id="selectCourse" v-if="currentInstitute !== null">
          <div class="card-header fw-semibold text-body-secondary fs-6">
            Курсы и отделения
          </div>
          <div class="card-body overflow-auto d-flex flex-column gap-3">
            <div v-for="departments in Object.groupBy(this.currentInstitute, ({department}) => department)">
              <h6 class="mb-2" v-if="departments[0].department">{{ departments[0].department }}</h6>
              <!-- Превозмогая трудности xD -->
              <div class="d-flex flex-wrap gap-2">
                <button class="btn btn-outline-primary"
                        :class="{'active': JSON.stringify(this.currentCourse) === JSON.stringify(course)}"
                        v-for="course in Object.groupBy(departments, ({course}) => course)"
                        v-on:click="this.currentCourse = course; setTimeout(() => this.scrollToAnchor('selectGroup'), 100)">
                  {{ course[0].course >= 7 ? course[0].course - 6 : course[0].course }} курс
                  <span class="badge bg-primary bg-opacity-75 fw-normal" v-if="course[0].course >= 7">Магистратура</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4" v-if="this.currentCourse">
        <div class="card max-h" id="selectGroup" v-if="currentInstitute !== null">
          <div class="card-header fw-semibold text-body-secondary fs-6">
            Группы
          </div>
          <div class="card-body overflow-auto d-flex flex-column gap-2">
            <button role="button" class="btn btn-outline-primary bg-primary bg-opacity-25 border-0"
                    v-for="group in this.currentCourse"
                    v-on:click="this.$router.push({name: 'schedule', params: {name: group.name}})">
              {{ group.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!loaded">
      <div class="card placeholder-wave">
        <div class="card-header fw-semibold text-body-secondary fs-6">
          <span class="placeholder rounded-5 col-3"></span>
        </div>
        <div class="card-body overflow-auto" style="max-height: 75vh;">
          <div class="row g-2">
            <div role="button" class="btn btn-outline-secondary border-0 col-12 col-sm-6 col-lg-4 col-xl-3 disabled"
                 v-for="x in placeholders">
              <div class="text-start d-flex flex-column">
                <h5 class="mb-0 placeholder rounded-5 " :class="['col-'+getRandomNumber(3,5)]"></h5>
                <small class="placeholder rounded-5 mt-2" :class="['col-'+getRandomNumber(7,11)]"></small>
                <small class="placeholder rounded-5 mt-2" :class="['col-'+getRandomNumber(3,5)]"
                       v-if="getRandomNumber(1,3) % 2 === 0"></small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media screen and (min-width: 992px) {
  .max-h {
    max-height: 80vh;
    min-height: 80vh;
  }
}
</style>

<script>

export default {
  name: "HomeView",
  data() {
    return {
      loaded: false,
      placeholders: 7,

      fetchData: null,
      institutes: null,
      institutesCount: 0,
      currentInstitute: null,
      currentCourse: null,
    }
  },
  methods: {
    async fetchInstitutes() {
      const response = await fetch("https://edu.sfu-kras.ru/api/timetable/get_insts")
      if (response.status === 200) {
        this.fetchData = await response.json()
        this.loaded = true
      }
      this.institutes = Object.groupBy(this.fetchData, ({institute}) => institute);
      this.institutesCount = Object.keys(this.institutes).length
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
    setInstitute(institute) {
      if (institute === this.currentInstitute) return
      this.currentInstitute = institute;
      this.currentCourse = null;
      setTimeout(() => this.scrollToAnchor('selectCourse'), 100)
    },
    getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    scrollToAnchor(anchorId) {
      const anchor = document.getElementById(anchorId);
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth' });
      }
    }
  },
  mounted() {
    setTimeout(this.fetchInstitutes, 300)
  }
}
</script>