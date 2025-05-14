<script setup>
import { RouterView } from 'vue-router';
import { ref } from 'vue';

// 控制行動裝置導航選單
const isMenuOpen = ref(false);

// 切換選單顯示狀態
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <div class="app-container dark-mode">
    <header class="app-header">
      <div class="logo-container">
        <h1 class="site-title">小羅の窩</h1>
      </div>
      
      <div class="mobile-menu-button" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <nav class="main-nav" :class="{ 'open': isMenuOpen }">
        <ul>
          <li><router-link to="/" @click="isMenuOpen = false">首頁</router-link></li>
          <li><router-link to="/posts" @click="isMenuOpen = false">文章</router-link></li>
          <li><router-link to="/projects" @click="isMenuOpen = false">專案</router-link></li>
          <li><router-link to="/about" @click="isMenuOpen = false">關於我</router-link></li>
        </ul>
      </nav>
    </header>

    <main class="app-content">
      <RouterView />
    </main>

    <footer class="app-footer">
      <p>&copy; {{ new Date().getFullYear() }} elvislo All Rights Reserved</p>
    </footer>
  </div>
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

.logo-container {
  display: flex;
  align-items: center;
  height: 100%;
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

.main-nav a:after {
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
.main-nav a.router-link-active:after {
  width: 100%;
}

.main-nav a:hover,
.main-nav a.router-link-active {
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
  
  .mobile-menu-button {
    display: flex;
    z-index: 200;
  }
  
  .main-nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: 70%;
    height: 100vh;
    background-color: var(--card-bg);
    box-shadow: -2px 0 5px var(--shadow-color);
    transition: right 0.3s ease-in-out;
    z-index: 150;
  }
  
  .main-nav.open {
    right: 0;
  }
  
  .main-nav ul {
    flex-direction: column;
    padding: 4rem 2rem 2rem;
    height: auto;
  }
  
  .main-nav li {
    margin: 1.5rem 0;
    height: auto;
  }
  
  .main-nav a {
    height: auto;
    padding: 0.5rem 0;
  }
}
</style>
