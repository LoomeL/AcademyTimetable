<script setup>
import SearchAutocomplete from '@/pages/SearchAutocomplete.vue'
</script>

<template>
  <div class="d-flex flex-column gap-1">
    <h4 class="m-0">Радектирование профиля</h4>
    <p class="text-body-tertiary m-0">
      Здесь можно изменить имя или группу профиля. Что-бы отключить слияние расписаний, достаточно
      оставить поле академии ИТ пустым.
    </p>
  </div>

  <div>
    <label for="profileName" class="form-label">Имя профиля</label>
    <input type="text" class="form-control is-invalid" id="profileName" />
    <div class="invalid-feedback">Поле не может быть пустым</div>
  </div>

  <div class="position-relative">
    <label for="primaryGroup" class="form-label">Основная группа</label>
    <input type="text" class="form-control is-invalid" id="primaryGroup" />

    <div class="invalid-feedback">Группа не найдена</div>

    <transition>
      <SearchAutocomplete />
    </transition>
  </div>

  <div class="position-relative">
    <label for="secondaryGroup" class="form-label">Группа академии ИТ</label>
    <input type="text" class="form-control is-valid" id="secondaryGroup" />

    <div class="invalid-feedback">Группа не найдена</div>

    <transition>
      <SearchAutocomplete />
    </transition>
  </div>

  <div class="d-flex justify-content-between">
    <button class="btn btn-outline-danger">
      <i class="fa-solid fa-remove"></i> Удалить профиль
    </button>
    <button class="btn btn-outline-primary"><i class="fa-solid fa-save"></i> Сохранить</button>
  </div>
</template>
