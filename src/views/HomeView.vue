<template>
  <div class="home-container">
    <section class="profile-section">
      <div class="profile-image">
        <img src="/assets/profile.jpeg" alt="小羅的大頭照" class="profile-img" />
      </div>
      <h1 class="profile-title">小羅の窩</h1>
      <p class="profile-subtitle">
        <span class="typewriter-text">{{ displayText }}</span>
        <span class="typing-cursor" :class="{ 'blink': showCursor }"></span>
      </p>
      
      <div class="social-links">
        <a href="mailto:me@elvislo.tw" class="social-link" aria-label="Email" data-tooltip="Email">
          <font-awesome-icon :icon="['fas', 'envelope']" />
        </a>
        <a href="https://www.instagram.com/elvis._.lo/" class="social-link" aria-label="Instagram" data-tooltip="Instagram">
          <font-awesome-icon :icon="['fab', 'instagram']" />
        </a>
        <a href="https://x.com/ElvisLo030" class="social-link" aria-label="Twitter" data-tooltip="Twitter(X)">
          <font-awesome-icon :icon="['fab', 'twitter']" />
        </a>
        <a href="https://github.com/ElvisLo030" class="social-link" aria-label="GitHub" data-tooltip="Github">
          <font-awesome-icon :icon="['fab', 'github']" />
        </a>
        <a @click="copyDiscordId" class="social-link discord-link" aria-label="Discord" data-tooltip="Discord ID">
          <font-awesome-icon :icon="['fab', 'discord']" />
        </a>
        <a href="https://bumpnewzenly.com/p/pCcghkwJAh0iI" class="social-link" aria-label="Bump" data-tooltip="Bump !">
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

import { ref, onMounted, onUnmounted } from 'vue';

// 打字機效果的文字陣列
const typewriterTexts = [
  '努力在這個世界留下足跡',
  '大學生一隻',
  'Rhythm Gamer',
  '喵喵喵喵貓🐱',
  '橘貓最可愛ㄌ!'
];

// 打字機效果相關狀態
const displayText = ref('');
const currentTextIndex = ref(0);
const currentCharIndex = ref(0);
const isDeleting = ref(false);
const showCursor = ref(true);
const typewriterSpeed = ref(150); // 打字速度（毫秒）
let typewriterTimer = null;

// 打字機效果邏輯
const typeWriter = () => {
  const currentText = typewriterTexts[currentTextIndex.value];
  
  if (isDeleting.value) {
    // 刪除字符
    displayText.value = currentText.substring(0, currentCharIndex.value - 1);
    currentCharIndex.value--;
    typewriterSpeed.value = 75; // 刪除速度較快
    
    if (currentCharIndex.value === 0) {
      isDeleting.value = false;
      currentTextIndex.value = (currentTextIndex.value + 1) % typewriterTexts.length;
      typewriterSpeed.value = 500; // 換文字前的暫停
    }
  } else {
    // 添加字符
    displayText.value = currentText.substring(0, currentCharIndex.value + 1);
    currentCharIndex.value++;
    typewriterSpeed.value = 150; // 正常打字速度
    
    if (currentCharIndex.value === currentText.length) {
      isDeleting.value = true;
      typewriterSpeed.value = 2000; // 完整顯示後的暫停時間
    }
  }
  
  typewriterTimer = setTimeout(typeWriter, typewriterSpeed.value);
};

// 游標閃爍效果
const startCursorBlink = () => {
  setInterval(() => {
    showCursor.value = !showCursor.value;
  }, 530);
};

// 組件掛載時啟動效果
onMounted(() => {
  setTimeout(() => {
    typeWriter();
    startCursorBlink();
  }, 1000); // 延遲1秒開始打字效果
});

// 組件卸載時清理定時器
onUnmounted(() => {
  if (typewriterTimer) {
    clearTimeout(typewriterTimer);
  }
});

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
  color: var(--text-color);
  max-width: 600px;
  margin-bottom: 0.8rem; /* 縮小間距 */
  min-height: 1.5em; /* 確保高度一致，避免跳動 */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 打字機效果樣式 */
.typewriter-text {
  display: inline-block;
}

.typing-cursor {
  display: inline-block;
  width: 2px;
  height: 1.2em;
  background-color: var(--primary-color);
  margin-left: 3px;
  opacity: 1;
  transition: opacity 0.1s ease-in-out;
  animation: typing-cursor-blink 1.2s infinite;
  vertical-align: text-bottom;
}

.typing-cursor.blink {
  opacity: 0;
}

/* 打字機游標閃爍動畫 */
@keyframes typing-cursor-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
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
  border-radius: 50%;
}

.social-link:hover {
  transform: translateY(-5px);
  color: white;
  border-color: rgba(255, 255, 255, 0.2);
}

.social-link:hover::before {
  opacity: 1;
}

/* Tooltip 提示框樣式 */
.social-link::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 130%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.95);
  color: white;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  pointer-events: none;
  z-index: 9999;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* 懸停時顯示 tooltip */
.social-link:hover::after {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(-8px);
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
    width: 38px; /* 增大手機版圖標尺寸 */
    height: 38px; /* 增大手機版圖標尺寸 */
    font-size: 1rem; /* 增大圖標字體 */
    margin: 0 5px; /* 增加橫向間距 */
    margin-bottom: 8px; /* 增加下方間距 */
  }

  /* 手機版 tooltip 調整 */
  .social-link::after {
    font-size: 0.8rem;
    padding: 6px 10px;
    bottom: 130%;
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
