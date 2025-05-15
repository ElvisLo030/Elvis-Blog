import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

// 添加到庫中
library.add(fas, far, fab)

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
