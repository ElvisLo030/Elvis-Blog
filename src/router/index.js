import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'

// 路由配置
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/post',
    name: 'PostList',
    component: () => import('../views/PostsView.vue')
  },
  {
    path: '/post/:slug',
    name: 'PostDetail',
    component: () => import('../views/PostView.vue'),
    props: true
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('../views/ProjectsView.vue')
  },
  {
    path: '/invite',
    name: 'Invite',
    component: () => import('../views/InviteView.vue')
  },
  {
    path: '/sm',
    name: 'SimpleMessage',
    component: () => import('../views/SimpleMessageView.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue')
  }
]

// 創建路由器實例 - 根據環境選擇歷史模式
const router = createRouter({
  // 在 SSR 環境中使用 MemoryHistory，在客戶端使用 WebHistory
  history: typeof window !== 'undefined' 
    ? createWebHistory(import.meta.env.BASE_URL)
    : createMemoryHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置（例如瀏覽器返回），則恢復到該位置
    if (savedPosition) {
      return savedPosition
    }
    // 對於所有路由切換，滾動到頁面頂部
    return { top: 0, behavior: 'smooth' }
  }
})

export default router
