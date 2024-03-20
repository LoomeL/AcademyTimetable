<script setup>
import { Sortable } from 'sortablejs-vue3'
import {computed, ref} from 'vue'
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
      <i class="text-body-tertiary fa-regular fs-4 pe-1" :class="{'fa-sun': settingsStore.settings.darkTheme, 'fa-moon': !settingsStore.settings.darkTheme}"
      @click="settingsStore.settings.darkTheme = !settingsStore.settings.darkTheme"></i>
    </div>
    <p class="text-body-tertiary m-0">Здесь можно добавить удалить или отредактировать профили.</p>
  </div>

  <Sortable
    :list="list"
    item-key="id"
    :options="options"
    class="d-flex flex-column gap-3"
    @update="onUpdate($event)"
    v-if="profilesStore.profiles.length !== 0"
  >
    <template #item="{ element }">
      <div :key="element.id" class="card">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="mb-0">
              {{ element.name }}
            </h5>
            <i class="fa-solid fa-pencil fs-5 text-body-tertiary" @click="profilesStore.editorSelectedProfile = element"></i>
          </div>
          <hr class="my-2 mb-1" />
          <small class="text-body-tertiary">Основная группа</small> <br />
          {{ element.sfu }}<br />
          <small class="text-body-tertiary" v-if="element.ait">Группа академии ИТ<br /></small>
          {{ element.ait }}
        </div>
      </div>
    </template>
  </Sortable>

  <div class="text-center my-3" v-else>
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
    Сделано с любовью чтобы заменить таблицы с расписанием для Академии ИТ <br />
    © 2024 Георгий Т.
    <a
      href="https://github.com/LoomeL/AcademyTimetable"
      class="text-body-tertiary fs-5 text-decoration-none"
    >
      <i class="fa-brands fa-github"></i> GitHub</a
    >
  </div>
</template>
