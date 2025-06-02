import './assets/main.css'

import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import routes from './router'

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
  { routes },
  ({ app, router, isClient }) => {
    // 在客戶端才執行的代碼
    if (isClient) {
document.addEventListener('DOMContentLoaded', preloadImages)

const redirectPath = sessionStorage.getItem('redirectPath');
if (redirectPath) {
  sessionStorage.removeItem('redirectPath');
  router.push(redirectPath);
      }
}

app.component('font-awesome-icon', FontAwesomeIcon)
  }
)
