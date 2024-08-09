import { createWebHashHistory, createRouter } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/upLoad' // 将根路径重定向到 /poetry
  },
  { path: '/poetry', component: () => import('@/page/poetry/index.vue') },
  { path: '/upLoad', component: () => import('@/page/upLoad/index.vue') },
  { path: '/test/', component: () => import('@/page/test.vue') },
]
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});
export default router

