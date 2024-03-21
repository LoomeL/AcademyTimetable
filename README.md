# Гибридное расписание СФУ + Академия IT

![license](https://img.shields.io/github/license/LoomeL/AcademyTimetable)
![crutches](https://img.shields.io/badge/crutches-yes-green)
![website](https://img.shields.io/website?url=https%3A%2F%2Facademy.loomel.tech)

<p align="center">
  <img src="/screens/1.jpg" width="200" />
  <img src="/screens/2.jpg" width="200" />
  <img src="/screens/3.jpg" width="200" />
</p>

<p align="center">
  <img src="/screens/4.jpg" width="300" />
  <img src="/screens/5.jpg" width="300" />
</p>

Этот репозиторий содержит приложение, объединяющее расписание университета и Академии ИТ, а также позволяет увидеть накладки расписания. 

> [!WARNING]
> `Пожалуйста, обратите внимание`, что предоставленное расписание может содержать неточности или изменения, которые могут произойти в ходе академического процесса. `Автор рекомендует сверить расписание в гугл таблице.` Пока не реализована система актуализации расписания, `автор не несет ответственности за потери или неудобства`, возникшие в результате использования этого приложения. Спасибо за понимание.

Если есть какие-то идеи, предложения или вы нашли баг, то их можно и нужно оставлять [здесь](https://github.com/LoomeL/AcademyTimetable/issues). Если есть желание помочь проекту, то у каждого есть возможность сделать форк и открыть [запрос на слияние](https://github.com/LoomeL/AcademyTimetable/pulls).

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

Временно не используется, в скором времени напишу парсер расписания из гугл таблиц.
