import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // lazy-loaded
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/chart',
      name: 'chart',
      // lazy-loaded
      component: () => import('../views/ChartView.vue'),
    },
  ],
})

export default router
