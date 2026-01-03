<script setup>
import { RouterView, useRouter, useRoute } from 'vue-router';
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';

const router = useRouter();
const route = useRoute();

// 控制行動裝置導航選單
const isMenuOpen = ref(false);
// 設置深色模式狀態（預設為深色模式）
const isDarkMode = ref(true);
// 控制回到頂端按鈕的顯示
const showBackToTop = ref(false);

// 監聽路由變化，確保每次切換頁面都滾動到頂端
watch(() => router.currentRoute.value.path, async (newPath, oldPath) => {
  if (newPath !== oldPath) {
    // 等待 DOM 更新完成後再滾動
    await nextTick();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
});

// 處理滾動事件，控制回到頂端按鈕的顯示
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300;
};

// 回到頂端功能
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// 在組件掛載時初始化主題和滾動監聽
onMounted(() => {
  const loader = document.getElementById('loading-screen');
  if (loader) {
    nextTick(() => {
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.remove();
        }, 500);
      }, 500); 
    });
  }

  // 從本地存儲讀取主題設置（如果有）
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    isDarkMode.value = false;
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark-mode');
  } else {
    // 預設使用深色模式
    isDarkMode.value = true;
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  }
  
  // 添加滾動監聽器
  window.addEventListener('scroll', handleScroll);
});

// 在組件卸載時移除滾動監聽器
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// 切換選單顯示狀態
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// 關閉選單功能
const closeMenu = () => {
  isMenuOpen.value = false;
};

// 處理賣場連結點擊
const handleShopClick = () => {
  window.open('https://myship.7-11.com.tw/general/detail/GM2503255103525', '_blank');
  closeMenu();
};

// 切換主題模式
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
};
</script>

<template>
  <div v-if="!route.meta.hideLayout" class="app-container" :class="{ 'dark-mode': isDarkMode }">
    <header class="app-header">
      <div class="logo-container">
        <router-link to="/" class="logo-link">
          <img src="/assets/meow.png" alt="Logo" class="logo-image">
          <h1 class="site-title">小羅の窩</h1>
        </router-link>
      </div>
      
      <div class="right-section">
        <nav class="main-nav" :class="{ 'open': isMenuOpen }">
          <!-- 添加背景遮罩，點擊可關閉選單 -->
          <div class="nav-overlay" @click="closeMenu" v-if="isMenuOpen"></div>
          <ul>
            <li class="home-nav-item"><router-link to="/" @click="closeMenu">
              <font-awesome-icon :icon="['fas', 'home']" class="nav-icon" />
              首頁
            </router-link></li>
            <li><router-link to="/post" @click="closeMenu">
              <font-awesome-icon :icon="['fas', 'list']" class="nav-icon" />
              文章
            </router-link></li>
            <li><router-link to="/projects" @click="closeMenu">
              <font-awesome-icon :icon="['fas', 'folder-open']" class="nav-icon" />
              專案
            </router-link></li>
            <li><router-link to="/timeline" @click="closeMenu">
              <font-awesome-icon :icon="['fas', 'clock']" class="nav-icon" />
              時間軸
            </router-link></li>
            <li><router-link to="/invite" @click="closeMenu">
              <font-awesome-icon :icon="['fas', 'paper-plane']" class="nav-icon" />
              邀請碼
            </router-link></li>
            <li><a @click="handleShopClick" class="shop-link" style="cursor: pointer;">
              <font-awesome-icon :icon="['fas', 'shop']" class="nav-icon" />
              賣場
            </a></li>
            <li><router-link to="/about" @click="closeMenu">
              <font-awesome-icon :icon="['fas', 'user-circle']" class="nav-icon" />
              關於我
            </router-link></li>
          </ul>
        </nav>
        
        <div class="header-controls">
          <button class="theme-toggle" @click="toggleTheme" aria-label="切換主題模式">
            <font-awesome-icon :icon="isDarkMode ? ['fas', 'sun'] : ['fas', 'moon']" />
          </button>
          
          <div class="mobile-menu-button" @click="toggleMenu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </header>

    <main class="app-content">
      <RouterView />
    </main>

    <footer class="app-footer">
      <div class="footer-content">
        <p>&copy; {{ new Date().getFullYear() }} ElvisLo All Rights Reserved</p>
        <div class="footer-links">
          <span class="divider">|</span>
          <router-link to="/cookie" class="footer-link">Cookie 政策</router-link>
        </div>
      </div>
    </footer>
    
    <!-- 回到頂端按鈕 -->
    <Transition name="back-to-top">
      <button 
        v-if="showBackToTop"
        @click="scrollToTop"
        class="back-to-top-btn"
        aria-label="回到頂端"
      >
        <font-awesome-icon :icon="['fas', 'arrow-up']" />
      </button>
    </Transition>
  </div>
  <RouterView v-else />
</template>

<style>
:root {
  --primary-color: #4a9eff;
  --text-color: #333;
  --bg-color: #f5f5f5;
  --card-bg: #ffffff;
  --header-bg: #ffffff;
  --border-color: #e0e0e0;
  --shadow-color: rgba(0, 0, 0, 0.1);
  --animation-speed: 0.3s;
  --primary-rgb: 74, 158, 255;
  --primary-color-dark: #3a7fd6;
  --text-color-secondary: #666;
}

/* 深色模式變數定義 */
:root.dark, body.dark-mode, .dark-mode {
  --primary-color: #5eafff;
  --text-color: #e0e0e0;
  --bg-color: #121212;
  --card-bg: #1e1e1e;
  --header-bg: #1a1a1a;
  --border-color: #2c2c2c;
  --shadow-color: rgba(0, 0, 0, 0.5);
  --primary-rgb: 94, 175, 255;
  --primary-color-dark: #4a9eff;
  --text-color-secondary: #aaa;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0;
  padding: 0;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color var(--animation-speed), color var(--animation-speed);
  min-height: 100vh;
  width: 100%;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: var(--header-bg);
  padding: 1rem 2rem;
  box-shadow: 0 2px 8px var(--shadow-color);
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color var(--animation-speed), box-shadow var(--animation-speed);
  height: 60px; /* 固定高度確保一致性 */
}

.right-section {
  display: flex;
  align-items: center;
  height: 100%;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.theme-toggle {
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.2rem;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  background-color: rgba(var(--primary-rgb), 0.1);
  color: var(--primary-color);
}

.logo-container {
  display: flex;
  align-items: center;
  height: 100%;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 10px;
}

.logo-image {
  height: 36px;
  width: auto;
  border-radius: 50%;
}

.site-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  line-height: 1;
}

.main-nav {
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 1rem;
}

.main-nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  align-items: center;
}

.main-nav li {
  margin-left: 2rem;
  display: flex;
  align-items: center;
  height: 100%;
}

.main-nav a {
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
}

.main-nav a:after,
.shop-link:after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: var(--primary-color);
  transition: width 0.3s;
}

.main-nav a:hover:after,
.main-nav a.router-link-active:after,
.shop-link:hover:after {
  width: 100%;
}

.main-nav a:hover,
.main-nav a.router-link-active,
.shop-link:hover {
  color: var(--primary-color);
}

.theme-button {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s;
}

.theme-button:hover {
  background-color: rgba(128, 128, 128, 0.2);
}

.shop-link {
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
}

.app-content {
  flex: 1;
  padding: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}

.app-footer {
  text-align: center;
  padding: 1.5rem;
  background-color: var(--header-bg);
  box-shadow: 0 -2px 8px var(--shadow-color);
  margin-top: auto;
  transition: background-color var(--animation-speed), box-shadow var(--animation-speed);
}

.footer-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0;
}

.divider {
  color: var(--text-color-secondary);
  opacity: 0.5;
}

.footer-link {
  color: var(--text-color-secondary);
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-link:hover {
  color: var(--primary-color);
  text-decoration: underline;
}

.mobile-menu-button {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.mobile-menu-button span {
  width: 2rem;
  height: 0.25rem;
  background-color: var(--text-color);
  border-radius: 10px;
  transition: all 0.3s linear;
}

@media (max-width: 768px) {
  .app-header {
    height: auto;  /* 在移動設備上調整高度 */
    padding: 0.8rem 1.5rem;
  }
  
  .logo-image {
    height: 28px;
  }
  
  .site-title {
    font-size: 1.3rem;
  }
  
  .theme-toggle {
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
  }
  
  .header-controls {
    gap: 1rem;
  }
  
  .mobile-menu-button {
    display: flex;
    z-index: 200;
  }
  
  .right-section {
    order: 3;
  }
  
  .main-nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: 45%;
    height: 100vh;
    margin-right: 0;
    background-color: var(--card-bg);
    box-shadow: -2px 0 5px var(--shadow-color);
    transition: right 0.3s ease-in-out;
    z-index: 150;
  }
  
  .main-nav.open {
    right: 0;
  }
  
  /* 背景遮罩樣式 */
  .nav-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    z-index: -1;
  }
  
  .main-nav ul {
    flex-direction: column;
    padding: 4rem 2rem 2rem;
    height: auto;
    align-items: flex-start;
  }
  
  .main-nav li {
    margin: 1.5rem 0;
    height: auto;
  }
  
  .main-nav a,
  .shop-link {
    height: auto;
    padding: 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  /* 手機版顯示導航圖示 */
  .nav-icon {
    font-size: 1.2rem;
    width: 2rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  /* 手機版頁尾調整：縮小字體並確保不換行 */
  .footer-content {
    flex-wrap: nowrap;
    gap: 0.25rem;
    width: 100%;
    justify-content: center;
  }
  
  .footer-content p {
    font-size: 0.8rem;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .footer-links {
    gap: 0.25rem;
  }

  .footer-link {
    font-size: 0.7rem;
    white-space: nowrap;
  }
  
  .divider {
    font-size: 0.7rem;
    margin: 0 0.1rem;
  }
}

/* 桌面版隱藏導航圖示 */
@media (min-width: 769px) {
  .nav-icon {
    display: none;
  }
  
  /* 桌面版隱藏首頁導航項目 - 使用多種方法確保隱藏 */
  .main-nav ul .home-nav-item {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    width: 0 !important;
    height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  
  /* 額外確保使用 :first-child 選擇器 */
  .main-nav ul li:first-child.home-nav-item {
    display: none !important;
  }
}

/* 回到頂端按鈕樣式 */
.back-to-top-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3rem;
  height: 3rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 12px var(--shadow-color);
  transition: all 0.3s ease;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.back-to-top-btn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 16px var(--shadow-color);
  background-color: var(--primary-color-dark);
}

.back-to-top-btn:active {
  transform: translateY(0);
}

/* 回到頂端按鈕動畫 */
.back-to-top-enter-active,
.back-to-top-leave-active {
  transition: all 0.3s ease;
}

.back-to-top-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.back-to-top-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

/* 手機版適配 */
@media (max-width: 768px) {
  .back-to-top-btn {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 2.8rem;
    height: 2.8rem;
    font-size: 1.1rem;
  }
}

/* 深色模式下的按鈕樣式 */
.dark-mode .back-to-top-btn {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
}

.dark-mode .back-to-top-btn:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.8);
}
</style>
