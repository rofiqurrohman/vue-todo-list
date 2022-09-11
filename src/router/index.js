import { createRouter, createWebHistory } from 'vue-router'
import ActivityView from '../views/ActivityView.vue'
import DetailView from '../views/DetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ActivityView
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailView,
    }
  ]
})

export default router
