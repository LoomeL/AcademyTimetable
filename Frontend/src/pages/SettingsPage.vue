<script setup>
import { Sortable } from 'sortablejs-vue3'
import { ref } from 'vue'

const sampleProfiles = ref([
  {
    name: 'Имя профайла',
    sfu: 'КИ21-21Б (1 подгруппа)',
    ait: 'АИТ22-05',
    id: 1
  },
  {
    name: 'Имя другого профайла',
    sfu: 'ПП21-21Б (1 подгруппа)',
    ait: '',
    id: 2
  }
])

const options = {
  animation: 200
}
</script>

<template>
  <div class="d-flex flex-column gap-1">
    <div class="d-flex justify-content-between align-items-center">
      <h4 class="m-0">Сохраненые профили</h4>
      <i class="text-body-tertiary fa-regular fa-sun fs-4 pe-1"></i>
    </div>
    <p class="text-body-tertiary m-0">Здесь можно добавить удалить или отредактировать профили.</p>
  </div>

  <Sortable
    :list="sampleProfiles"
    :item-key="name"
    :options="options"
    class="d-flex flex-column gap-3"
  >
    <template #item="{ element }">
      <div class="card">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="mb-0">
              {{ element.name }}
            </h5>
            <i class="fa-solid fa-pencil fs-5 text-body-tertiary"></i>
          </div>
          <hr class="my-2 mb-1" />
          <small class="text-body-tertiary">Основная группа</small> <br />
          {{ element.sfu }}<br />
          <small class="text-body-tertiary">Группа академии ИТ</small> <br />
          {{ element.ait }}
        </div>
      </div>
    </template>
  </Sortable>

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
