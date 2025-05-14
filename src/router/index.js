import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

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
    path: '/posts',
    name: 'Posts',
    component: () => import('../views/PostsView.vue')
  },
  {
    path: '/post/:slug',
    name: 'Post',
    component: () => import('../views/PostView.vue'),
    props: true
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('../views/ProjectsView.vue')
  }
]

// 創建路由實例
const router = createRouter({
  // 使用 history 模式實現乾淨的 URL
  history: createWebHistory(),
  routes
})

export default router
