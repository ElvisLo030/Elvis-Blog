import './assets/main.css'
import './assets/loading.css'

import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import router from './router'
import postService from './services/PostService'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

// 添加到庫中
library.add(fas, far, fab)

// 預加載圖片
const preloadImages = () => {
  const images = [
    '/assets/logo.svg',
    '/assets/profile.jpeg',
    '/assets/meow.png',
    '/assets/default-repo.png'
  ]
  
  images.forEach(src => {
    const img = new Image()
    img.src = src
  })
}

// 創建 SSG 應用
export const createApp = ViteSSG(
  App,
  { 
    routes: router.options.routes,
    base: router.options.history.base
  },
  ({ app, router: ssrRouter, isClient }) => {
    // 在客戶端才執行的代碼
    if (isClient) {
      document.addEventListener('DOMContentLoaded', preloadImages)

      // 檢查是否有重定向路徑
      const redirectPath = sessionStorage.getItem('redirectPath');
      if (redirectPath) {
        sessionStorage.removeItem('redirectPath');
        // 使用 nextTick 確保路由已經準備好
        ssrRouter.isReady().then(() => {
          ssrRouter.push(redirectPath);
        });
      }
    }

    app.component('font-awesome-icon', FontAwesomeIcon)
  }
)
