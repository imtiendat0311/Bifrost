import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/vol2',
      name: 'vol2',
      component: () => import('../views/Vol2View.vue')
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../views/ShopView.vue')
    },
    { path: '/admin', name: 'admin', component: () => import('../views/AdminView.vue') },
    { path: '/success', name: 'success', component: () => import('../views/SuccessView.vue') },
    { path: '/canceled', name: 'cancel', component: () => import('../views/CancelView.vue') },
    { path: '/account', name: 'account', component: () => import('../views/AccountView.vue') }
  ]
})

export default router
