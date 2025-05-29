<template>
  <div class="home-container">
    <section class="profile-section">
      <div class="profile-image">
        <img src="/assets/profile.jpeg" alt="小羅的大頭照" class="profile-img" />
      </div>
      <h1 class="profile-title">小羅の窩</h1>
      <p class="profile-subtitle">一隻可憐ㄉ大學生</p>
      
      <div class="social-links">
        <a href="mailto:me@elvislo.tw" class="social-link" aria-label="Email">
          <font-awesome-icon :icon="['fas', 'envelope']" />
        </a>
        <a href="https://www.instagram.com/elvis._.lo/" class="social-link" aria-label="Instagram">
          <font-awesome-icon :icon="['fab', 'instagram']" />
        </a>
        <a href="https://x.com/ElvisLo030" class="social-link" aria-label="Twitter">
          <font-awesome-icon :icon="['fab', 'twitter']" />
        </a>
        <a href="https://github.com/ElvisLo030" class="social-link" aria-label="GitHub">
          <font-awesome-icon :icon="['fab', 'github']" />
        </a>
        <a @click="copyDiscordId" class="social-link discord-link" aria-label="Discord">
          <font-awesome-icon :icon="['fab', 'discord']" />
        </a>
        <a href="https://bumpnewzenly.com/p/pCcghkwJAh0iI" class="social-link" aria-label="Bump">
          <font-awesome-icon :icon="['fas', 'location-dot']" />
        </a>
      </div>
    </section>
  </div>
  
  <!-- 複製成功提示 -->
  <div class="copy-toast" :class="{ 'show': isCopyToastVisible }">
    <font-awesome-icon :icon="['fas', 'check-circle']" /> Discord ID 已複製
  </div>
</template>

<script setup>
// 不需要之前的文章相關代碼
// 保留基本的 Vue 引入
import { ref } from 'vue';

// Discord ID複製功能
const copyDiscordId = () => {
  const discordId = 'elvislo_030';
  
  // 複製到剪貼簿
  navigator.clipboard.writeText(discordId)
    .then(() => {
      // 顯示複製成功訊息
      showCopyToast();
    })
    .catch(err => {
      console.error('複製失敗：', err);
    });
};

// 顯示複製成功的提示
const isCopyToastVisible = ref(false);
const showCopyToast = () => {
  isCopyToastVisible.value = true;
  setTimeout(() => {
    isCopyToastVisible.value = false;
  }, 2000); // 2秒後隱藏提示
};
</script>

<style scoped>
.home-container {
  max-width: 900px;
  min-height: 75vh; /* 稍微縮減高度 */
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 1rem; /* 縮減上下間距 */
}

.profile-section {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem; /* 縮減整體間距 */
}

.profile-image {
  width: 120px; /* 縮小頭像尺寸 */
  height: 120px; /* 縮小頭像尺寸 */
  border-radius: 50%;
  background-color: var(--card-bg);
  margin-bottom: 0.5rem; /* 縮小間距 */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: 3px solid var(--primary-color);
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.2rem; /* 縮小間距 */
}

.profile-subtitle {
  font-size: 1.2rem;
  color: var(--text-color-secondary);
  max-width: 600px;
  margin-bottom: 0.8rem; /* 縮小間距 */
}

.social-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1.2rem; /* 縮減下方間距 */
  margin-top: 0.3rem; /* 縮減上方間距 */
}

.social-link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px; /* 縮小圖標尺寸 */
  height: 50px; /* 縮小圖標尺寸 */
  border-radius: 50%;
  background-color: var(--card-bg);
  color: var(--text-color);
  font-size: 1.1rem; /* 稍微縮小圖標 */
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  margin: 0 6px; /* 縮減橫向間距 */
  position: relative;
  overflow: hidden;
  z-index: 1;
  border: 2px solid transparent;
}

.social-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-dark) 100%);
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s ease;
}

.social-link:hover {
  transform: translateY(-5px);
  color: white;
  border-color: rgba(255, 255, 255, 0.2);
}

.social-link:hover::before {
  opacity: 1;
}

.tags-section {
  margin-top: 0.5rem; /* 縮減上方間距 */
}

.tag {
  background-color: rgba(var(--primary-rgb), 0.1);
  color: var(--primary-color);
  padding: 0.4rem 0.8rem; /* 縮減內部間距 */
  border-radius: 20px;
  font-size: 0.9rem; /* 稍微縮小字體 */
}

@media (max-width: 768px) {
  .profile-title {
    font-size: 2rem;
  }
  
  .social-links {
    margin-bottom: 1rem; /* 縮減間距 */
  }
  
  .social-link {
    width: 38px; /* 在手機上更小 */
    height: 38px; /* 在手機上更小 */
    font-size: 0.9rem; /* 縮小字體 */
    margin: 0 5px;
    margin-bottom: 8px; /* 縮減下方間距 */
  }
}

/* 添加一些動畫效果 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.profile-section > * {
  animation: fadeIn 0.5s ease-out forwards;
}

.profile-title {
  animation-delay: 0.1s;
}

.profile-subtitle {
  animation-delay: 0.2s;
}

.social-links {
  animation-delay: 0.3s;
}

.tags-section {
  animation-delay: 0.4s;
}

/* Discord 相關樣式 */
.discord-link {
  cursor: pointer;
}

/* 複製成功提示樣式 */
.copy-toast {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  background-color: rgba(47, 47, 47, 0.9);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  z-index: 1000;
  opacity: 0;
  transition: transform 0.3s, opacity 0.3s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.copy-toast.show {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}

.copy-toast .svg-inline--fa {
  color: #4ade80;
}
</style>
