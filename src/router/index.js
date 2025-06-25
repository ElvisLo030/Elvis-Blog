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
]

export default routes
