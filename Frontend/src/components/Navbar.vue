<template>
  <nav class="navbar shadow-sm bg-body-tertiary">
    <div class="container-lg justify-content-center">
      <div class="row w-100 g-0">
        <div class="d-flex col-6 col-lg-4 align-items-center pb-1 mb-1 mb-lg-0">
          <div style="width: 24px; height: 24px; fill: var(--bs-secondary)" class="me-2">
            <AcademyLogo/>
          </div>
          <div style="width: 24px; height: 24px; fill: var(--bs-secondary)" class="me-2">
            <RusalLogo/>
          </div>
          <div style="width: 24px; height: 24px; fill: var(--bs-secondary)">
            <SfuLogo/>
          </div>
        </div>
        <div class="col-lg-4 order-2 order-lg-0 position-relative">
          <div class="input-group">
            <span class="input-group-text text-secondary" id="basic-addon1"><i class="fa fa-search"></i></span>
            <input type="text" class="form-control" placeholder="Поиск по группам"
                   v-model="searchData"
                   v-on:input="this.fetchAutocomplete()"
                   v-on:focusin="this.showAutocomplete = true"
                   v-on:focusout="this.showAutocomplete = false">
            <button class="btn btn-outline-secondary border-secondary-subtle" type="button" id="button-addon2" v-on:click="searchData = ''"><i
                class="fa fa-x"></i></button>
          </div>
          <transition>
            <div
                class="mt-2 position-absolute top-100 start-0 w-100 z-1 bg-body-tertiary shadow-lg d-flex flex-column rounded-2"
                v-if="this.showAutocomplete && this.autocompleteData.length !== 0">
              <button class="btn btn-outline-secondary border-0 text-start text-body-emphasis"
                      v-for="item in this.autocompleteData"
                      v-on:click="this.$router.push({name: 'schedule', params: {name: item}})"
              >{{ item }}</button>
            </div>
          </transition>
        </div>
        <div class="col-6 col-lg-4 d-flex justify-content-end mb-1 mb-lg-0">
          <button class="btn btn-sm align-items-center" v-on:click="changeTheme">
            <i class="fa fa-moon h4 m-0 text-secondary"></i></button>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>

import {useThemeStore} from "@/stores/theme.js";
import AcademyLogo from "@/components/logos/AcademyLogo.vue";
import RusalLogo from "@/components/logos/RusalLogo.vue";
import SfuLogo from "@/components/logos/SfuLogo.vue";

export default {
  name: "HomeView",
  components: {SfuLogo, RusalLogo, AcademyLogo},
  data() {
    return {
      showAutocomplete: false,
      searchData: "",
      autocompleteData: [],
    }
  },
  methods: {
    changeTheme() {
      const themeStore = useThemeStore()
      themeStore.changeTheme()
    },
    fetchAutocomplete() {
      if (this.searchData === "") {
        this.autocompleteData = []
        return
      }
      fetch("https://edu.sfu-kras.ru/api/timetable/autocomplete_new/" + this.searchData)
          .then(response => response.json())
          .then(data => {
            this.autocompleteData = Object.keys(data).slice(0, 6)
          })
    }
  },
  beforeRouteEnter(to, from, next) {
    this.searchData = this.$route.params.name
    console.log(to.params.name)
    next();
  }
}
</script>
<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>