import { createWebHashHistory, createRouter } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home' // 将根路径重定向到 /poetry
  },
  {
    path: '/home',
    component: () => import('@/page/home.vue'),
    meta: { title: '首页' }
  },
  { path: '/poetry', component: () => import('@/page/poetry/index.vue'), meta: { title: '诗词页' } },
  { path: '/upLoad', component: () => import('@/page/upLoad/index.vue'), meta: { title: '文件上传' } },
  { path: '/course_ware_inquiry', component: () => import('@/page/course_ware_inquiry/index.vue'), meta: { title: '课件查询' } },
]
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});
export default router

