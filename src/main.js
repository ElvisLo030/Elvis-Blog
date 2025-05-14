import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 處理 GitHub Pages 路由重定向
const redirectPath = sessionStorage.getItem('redirectPath');
if (redirectPath) {
  sessionStorage.removeItem('redirectPath');
  router.push(redirectPath);
}

const app = createApp(App)
app.use(router)
app.mount('#app')
