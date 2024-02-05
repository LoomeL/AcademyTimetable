# Гибридное расписание СФУ + Академия IT

![license](https://img.shields.io/github/license/LoomeL/AcademyTimetable)
![crutches](https://img.shields.io/badge/crutches-yes-green)
![website](https://img.shields.io/website?url=https%3A%2F%2Facademy.loomel.tech)

`Смотреть код не рекомендуется потому, что могут вытечь глаза.` Это первая версия приложения, написано на скоряк, просто что бы можно было пользоваться. Уже есть видение для обновленной версии с абсолютно другим подходом к построению интерфейса. Если есть какие-то идеи, предложения или вы нашли баг, то их можно и нужно оставлять [здесь](https://github.com/LoomeL/AcademyTimetable/issues). Если есть желание помочь проекту, то у каждого есть возможность сделать форк и открыть [запрос на слияние](https://github.com/LoomeL/AcademyTimetable/pulls).

В ветке `dev` лежит код который находится в разработке. В ветке `prod` лежит код который был собран и запущен в проде (авто деплой) [academy.loomel.tech](https://academy.loomel.tech)

## Сборка и запуск

### Docker

```bash
docker compose up --detach
```

### Фронтэнд

Vue.js + Bootstrap

```bash
npm install
npm run dev
```

### Бэкэнд

Asp.net core

Временно используется как веб сервер, в следующей версии будет задействован по назначению
