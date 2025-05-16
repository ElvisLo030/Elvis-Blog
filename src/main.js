import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

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

// 在 DOM 內容載入完成後加載圖片
document.addEventListener('DOMContentLoaded', preloadImages)

// 處理 GitHub Pages 路由重定向
const redirectPath = sessionStorage.getItem('redirectPath');
if (redirectPath) {
  sessionStorage.removeItem('redirectPath');
  router.push(redirectPath);
}

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.mount('#app')
