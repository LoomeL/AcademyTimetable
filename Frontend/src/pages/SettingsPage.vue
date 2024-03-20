<script setup>
import {Sortable} from 'sortablejs-vue3'
import {computed} from 'vue'
import {useSettingsStore} from "@/stores/settings.js";
import {useProfilesStore} from "@/stores/profiles.js";

const profilesStore = useProfilesStore();
const settingsStore = useSettingsStore();

const onUpdate = (event) => {
  const item = profilesStore.profiles.splice(event.oldIndex, 1)[0];
  profilesStore.profiles.splice(event.newIndex, 0, item);
}

const list = computed(() => {
  return profilesStore.profiles
})

const options = {
  animation: 200
}

</script>

<template>
  <div class="d-flex flex-column gap-1">
    <div class="d-flex justify-content-between align-items-center">
      <h4 class="m-0">Сохраненые профили</h4>
      <i :class="{'fa-sun': settingsStore.settings.darkTheme, 'fa-moon': !settingsStore.settings.darkTheme}"
         class="text-body-tertiary fa-regular fs-4 pe-1"
         @click="settingsStore.settings.darkTheme = !settingsStore.settings.darkTheme"></i>
    </div>
    <p class="text-body-tertiary m-0">Здесь можно добавить удалить или отредактировать профили.</p>
  </div>

  <Sortable
      v-if="profilesStore.profiles.length !== 0"
      :list="list"
      :options="options"
      class="d-flex flex-column gap-3"
      item-key="id"
      @update="onUpdate($event)"
  >
    <template #item="{ element }">
      <div :key="element.id" class="card">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="mb-0">
              {{ element.name }}
            </h5>
            <i class="fa-solid fa-pencil fs-5 text-body-tertiary"
               @click="profilesStore.editorSelectedProfile = JSON.parse(JSON.stringify(element))"></i>
          </div>
          <hr class="my-2 mb-1"/>
          <small class="text-body-tertiary">Основная группа</small> <br/>
          {{ element.sfu }}<br/>
          <small v-if="element.ait" class="text-body-tertiary">Группа академии ИТ<br/></small>
          {{ element.ait }}
        </div>
      </div>
    </template>
  </Sortable>

  <div v-else class="text-center my-3">
    Нет ни одного профиля
  </div>

  <small class="text-body-tertiary"
  >* перетаскивая можно изменить порядок. Первый профиль в списке будет выводиться при открытии
    приложения</small
  >
  <small class="text-body-tertiary"
  >** чтобы добавить профиль достаточно найти в поиске нужную группу и нажать сохранить.</small
  >

  <div class="d-flex flex-column gap-2 align-items-center text-body-tertiary text-center px-2 mt-3">
    Сделано с любовью чтобы заменить таблицы с расписанием для Академии ИТ <br/>
    © 2024 Георгий Т.
    <a
        class="text-body-tertiary fs-5 text-decoration-none"
        href="https://github.com/LoomeL/AcademyTimetable"
    >
      <i class="fa-brands fa-github"></i> GitHub</a
    >
  </div>
</template>
