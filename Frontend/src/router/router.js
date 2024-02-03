import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ScheduleView from "@/views/ScheduleView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/schedule/:name',
      name: 'schedule',
      component: ScheduleView
    },
    {
      path: '/event/:uuid',
      name: 'event',
      component: ScheduleView
    }
  ]
})

export default router
