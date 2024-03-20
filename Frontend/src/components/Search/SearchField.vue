<template>
  <div class="position-relative">
    <div class="input-group">
      <input v-model="searchValueModel" class="form-control" placeholder="Начни вводить группу или фамилию" type="text"
             @focusin="showAutoComplete = true" @focusout="showAutoComplete = false"/>
      <button class="btn btn-outline-secondary" @click="searchValueModel = ''"><i class="fa-regular fa-x"></i></button>
    </div>

    <transition>
      <SearchAutocomplete v-if="showAutoComplete && searchStore.autoCompleteData.length > 0" :handler="handleSelect"
                          :list="searchStore.autoCompleteData"/>
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
    if (nv === '') searchStore.selectedGroup = ''
    searchStore.searchValue = nv
  }
})

const handleSelect = (group) => {
  searchStore.selectedGroup = group
}

</script>
