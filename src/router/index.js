import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Day1View from '../views/Day1View.vue'
import Day2View from '../views/Day2View.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/day1',
      name: 'day1',
      component: Day1View
    },
    {
      path: '/day2',
      name: 'day2',
      component: Day2View
    }
  ]
})

export default router
