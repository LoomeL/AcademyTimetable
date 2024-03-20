<template>
  <div class="position-relative">
    <div class="input-group">
      <input class="form-control" type="text" placeholder="Начни вводить группу или фамилию" v-model="searchValueModel" @focusin="showAutoComplete = true" @focusout="showAutoComplete = false" />
      <button class="btn btn-outline-secondary" @click="searchValueModel = ''"><i class="fa-regular fa-x"></i></button>
    </div>

    <transition>
      <SearchAutocomplete :handler="handleSelect" :list="searchStore.autoCompleteData" v-if="showAutoComplete && searchStore.autoCompleteData.length > 0" />
    </transition>
  </div>
</template>

<script setup>
import SearchAutocomplete from '@/components/Search/SearchAutocomplete.vue'
import {useSearchStore} from "@/stores/search.js";
import {computed, ref} from "vue";

const showAutoComplete = ref(false)

const searchStore = useSearchStore()

const searchValueModel = computed({
  get: () => searchStore.searchValue,
  set: (nv) => {
    if(nv === '') searchStore.selectedGroup = ''
    searchStore.searchValue = nv
  }
})

const handleSelect = (group) => {
  searchStore.selectedGroup = group
}

</script>
