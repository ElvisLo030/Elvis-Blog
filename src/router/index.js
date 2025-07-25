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
  // 404 路由 - 必須放在最後
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: () => {
      // 在客戶端重定向到 404.html
      if (typeof window !== 'undefined') {
        window.location.href = '/404.html'
        return false
      }
      return '/404.html'
    }
  }
]

export default routes
