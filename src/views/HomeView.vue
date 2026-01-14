<template>
  <!-- Loading 動畫層 -->
  <Transition name="fade-out">
    <div v-if="isLoading" class="loading-overlay">
          <div class="tech-loader">
            <div class="glitch-wrapper">
              <div class="glitch" :data-text="loadingText">{{ loadingText }}<span class="loading-cursor">_</span></div>
            </div>
            
            <div class="loader-track">
            <div class="pixel-cat-container">
              <div class="pixel-cat"></div>
            </div>
            
            <div class="progress-bar-container">
              <div class="progress-bar"></div>
            </div>
          </div>
        </div>
    </div>
  </Transition>

  <div class="home-container" v-show="!isLoading">
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
        <a @click="copyDiscordId" class="social-link discord-link" aria-label="Discord" data-tooltip="Discord ID">
          <font-awesome-icon :icon="['fab', 'discord']" />
        </a>
        <a href="https://github.com/ElvisLo030" class="social-link" aria-label="GitHub" data-tooltip="Github">
          <font-awesome-icon :icon="['fab', 'github']" />
        </a>
        <a href="https://t.me/elvislo030" class="social-link" aria-label="Telegram" data-tooltip="Telegram">
          <font-awesome-icon :icon="['fab', 'telegram']" />
        </a>
      </div>
    </section>
  </div>
  
  <!-- 複製成功提示 -->
  <div class="copy-toast" :class="{ 'show': isCopyToastVisible }" data-nosnippet>
    <font-awesome-icon :icon="['fas', 'check-circle']" /> Discord ID 已複製
  </div>
</template>

<script setup>

import { ref, onMounted, onUnmounted } from 'vue';

// 打字機效果的文字陣列
const typewriterTexts = [
  '努力在這個世界留下足跡...',
  '大學生一隻',
  'Rhythm Gamer',
  '汪嗚',
  '橘貓最可愛ㄌ！'
];

// 打字機效果相關狀態
const displayText = ref('');
const currentTextIndex = ref(0);
const currentCharIndex = ref(0);
const isDeleting = ref(false);
const showCursor = ref(true);
const typewriterSpeed = ref(100); // 打字速度（毫秒）
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
const isLoading = ref(true);
const loadingText = ref('');

onMounted(async () => {
  const targetText = 'Loading...';
  let charIndex = 0;
  
  const loadingTypeWriter = () => {
    // 如果已經載入完成，就停止打字動畫
    if (!isLoading.value) return;

    if (charIndex <= targetText.length) {
      loadingText.value = targetText.substring(0, charIndex);
      charIndex++;
      setTimeout(loadingTypeWriter, 100); 
    } else {
      setTimeout(() => {
        if (!isLoading.value) return;
        charIndex = 0;
        loadingTypeWriter();
      }, 800);
    }
  };
  
  loadingTypeWriter();

  const minTimePromise = new Promise(resolve => setTimeout(resolve, 1500));
  
  const resourceLoadPromise = new Promise(resolve => {
    if (document.readyState === 'complete') {
      resolve();
    } else {
      window.addEventListener('load', resolve);
    }
  });

  const imagesLoadedPromise = Promise.all(
    Array.from(document.images)
      .filter(img => !img.complete)
      .map(img => new Promise(resolve => {
        img.onload = img.onerror = resolve;
      }))
  );

  await Promise.all([minTimePromise, resourceLoadPromise, imagesLoadedPromise]);
  
  isLoading.value = false;
  
  // 載入完成後啟動打字機效果
  setTimeout(() => {
    typeWriter();
    startCursorBlink();
  }, 500);
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
  margin-bottom: 0.2rem; 
}

.profile-subtitle {
  font-size: 1.2rem;
  color: var(--text-color);
  max-width: 600px;
  margin-bottom: 0.8rem; 
  min-height: 1.5em; 
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 打字機效果樣式 */
.typewriter-text {
  display: inline-block;
  font-family:"LXGW WenKai TC", "Noto Sans TC", sans-serif;
  font-weight: 500;
  font-style: normal;
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
  margin-bottom: 1.2rem;
  margin-top: 0.3rem;
}

.social-link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--card-bg);
  color: var(--text-color);
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  margin: 0 6px;
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

/* Loading 動畫樣式 */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bg-color);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.tech-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

/* 像素貓咪樣式 */
.loader-track {
  width: 200px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px; /* 貓咪跟進度條的距離 */
}

.pixel-cat-container {
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 6px; /* 調整到底部，貼近進度條 */
  left: 0;
  transform: translateX(-50%) scaleX(-1) scale(1.4); /* 水平翻轉 + 放大 */
  transform-origin: bottom center; /* 確保放大時腳底位置不變 */
  z-index: 10;
  animation: cat-move 2s ease-in-out forwards;
  
  /* 讓貓咪元素位於容器底部 */
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.pixel-cat {
  width: 2px;
  height: 2px;
  background: transparent;
  
  /* 貓咪配色變數 */
  --c-o: #eb8d30; /* 身體橘色 */
  --c-d: #8b4513; /* 深色細節 */
  --c-l: #eb8d30; /* 亮色肚子 */
  --c-b: #222222; /* 眼睛/鼻子 */
  
  animation: cat-run 0.4s infinite steps(2); /* 加快跑步頻率 */
  
  /* 初始幀 (Frame 1) */
  box-shadow: 
    /* Frame 1: 腳張開 */
    /* 耳朵 */
    -2px -14px 0 0 var(--c-d), 4px -14px 0 0 var(--c-d),
    /* 頭部 */
    -2px -12px 0 0 var(--c-o), 0px -12px 0 0 var(--c-o), 2px -12px 0 0 var(--c-o), 4px -12px 0 0 var(--c-o),
    -4px -10px 0 0 var(--c-o), -2px -10px 0 0 var(--c-b), 0px -10px 0 0 var(--c-o), 2px -10px 0 0 var(--c-o), 4px -10px 0 0 var(--c-b), 6px -10px 0 0 var(--c-o),
    -4px -8px 0 0 var(--c-o), -2px -8px 0 0 var(--c-o), 0px -8px 0 0 var(--c-b), 2px -8px 0 0 var(--c-o), 4px -8px 0 0 var(--c-o), 6px -8px 0 0 var(--c-o),
    -2px -6px 0 0 var(--c-o), 0px -6px 0 0 var(--c-o), 2px -6px 0 0 var(--c-o), 4px -6px 0 0 var(--c-o),
    /* 身體 & 尾巴 */
    6px -6px 0 0 var(--c-o), 8px -6px 0 0 var(--c-o), 10px -6px 0 0 var(--c-o), 12px -6px 0 0 var(--c-d), 14px -8px 0 0 var(--c-d),
    0px -4px 0 0 var(--c-o), 2px -4px 0 0 var(--c-o), 4px -4px 0 0 var(--c-o), 6px -4px 0 0 var(--c-o), 8px -4px 0 0 var(--c-o), 10px -4px 0 0 var(--c-o), 12px -4px 0 0 var(--c-o), 14px -6px 0 0 var(--c-o), 14px -10px 0 0 var(--c-o),
    0px -2px 0 0 var(--c-o), 2px -2px 0 0 var(--c-l), 4px -2px 0 0 var(--c-l), 6px -2px 0 0 var(--c-l), 8px -2px 0 0 var(--c-o), 10px -2px 0 0 var(--c-o), 12px -2px 0 0 var(--c-o), 14px -12px 0 0 var(--c-d),
    /* 腳 (Frame 1) */
    0px 0px 0 0 var(--c-d), 2px 0px 0 0 var(--c-d), 10px 0px 0 0 var(--c-d), 12px 0px 0 0 var(--c-d);
}

@keyframes cat-move {
  0% { left: 0%; }
  30% { left: 40%; }
  60% { left: 70%; }
  80% { left: 85%; }
  100% { left: 100%; }
}

@keyframes cat-run {
  0% {
    box-shadow: 
      /* Frame 1: 腳張開 */
      -2px -14px 0 0 var(--c-d), 4px -14px 0 0 var(--c-d),
      -2px -12px 0 0 var(--c-o), 0px -12px 0 0 var(--c-o), 2px -12px 0 0 var(--c-o), 4px -12px 0 0 var(--c-o),
      -4px -10px 0 0 var(--c-o), -2px -10px 0 0 var(--c-b), 0px -10px 0 0 var(--c-o), 2px -10px 0 0 var(--c-o), 4px -10px 0 0 var(--c-b), 6px -10px 0 0 var(--c-o),
      -4px -8px 0 0 var(--c-o), -2px -8px 0 0 var(--c-o), 0px -8px 0 0 var(--c-b), 2px -8px 0 0 var(--c-o), 4px -8px 0 0 var(--c-o), 6px -8px 0 0 var(--c-o),
      -2px -6px 0 0 var(--c-o), 0px -6px 0 0 var(--c-o), 2px -6px 0 0 var(--c-o), 4px -6px 0 0 var(--c-o),
      6px -6px 0 0 var(--c-o), 8px -6px 0 0 var(--c-o), 10px -6px 0 0 var(--c-o), 12px -6px 0 0 var(--c-d), 14px -8px 0 0 var(--c-d),
      0px -4px 0 0 var(--c-o), 2px -4px 0 0 var(--c-o), 4px -4px 0 0 var(--c-o), 6px -4px 0 0 var(--c-o), 8px -4px 0 0 var(--c-o), 10px -4px 0 0 var(--c-o), 12px -4px 0 0 var(--c-o), 14px -6px 0 0 var(--c-o), 14px -10px 0 0 var(--c-o),
      0px -2px 0 0 var(--c-o), 2px -2px 0 0 var(--c-l), 4px -2px 0 0 var(--c-l), 6px -2px 0 0 var(--c-l), 8px -2px 0 0 var(--c-o), 10px -2px 0 0 var(--c-o), 12px -2px 0 0 var(--c-o), 14px -12px 0 0 var(--c-d),
      0px 0px 0 0 var(--c-d), 2px 0px 0 0 var(--c-d), 10px 0px 0 0 var(--c-d), 12px 0px 0 0 var(--c-d);
  }
  50% {
    /* 輕微上下跳動 */
    transform: translateY(-2px);
    box-shadow: 
      /* Frame 2: 腳收攏 */
      -2px -14px 0 0 var(--c-d), 4px -14px 0 0 var(--c-d),
      -2px -12px 0 0 var(--c-o), 0px -12px 0 0 var(--c-o), 2px -12px 0 0 var(--c-o), 4px -12px 0 0 var(--c-o),
      -4px -10px 0 0 var(--c-o), -2px -10px 0 0 var(--c-b), 0px -10px 0 0 var(--c-o), 2px -10px 0 0 var(--c-o), 4px -10px 0 0 var(--c-b), 6px -10px 0 0 var(--c-o),
      -4px -8px 0 0 var(--c-o), -2px -8px 0 0 var(--c-o), 0px -8px 0 0 var(--c-b), 2px -8px 0 0 var(--c-o), 4px -8px 0 0 var(--c-o), 6px -8px 0 0 var(--c-o),
      -2px -6px 0 0 var(--c-o), 0px -6px 0 0 var(--c-o), 2px -6px 0 0 var(--c-o), 4px -6px 0 0 var(--c-o),
      6px -6px 0 0 var(--c-o), 8px -6px 0 0 var(--c-o), 10px -6px 0 0 var(--c-o), 12px -6px 0 0 var(--c-d), 14px -8px 0 0 var(--c-d),
      0px -4px 0 0 var(--c-o), 2px -4px 0 0 var(--c-o), 4px -4px 0 0 var(--c-o), 6px -4px 0 0 var(--c-o), 8px -4px 0 0 var(--c-o), 10px -4px 0 0 var(--c-o), 12px -4px 0 0 var(--c-o), 14px -6px 0 0 var(--c-o), 14px -10px 0 0 var(--c-o),
      0px -2px 0 0 var(--c-o), 2px -2px 0 0 var(--c-l), 4px -2px 0 0 var(--c-l), 6px -2px 0 0 var(--c-l), 8px -2px 0 0 var(--c-o), 10px -2px 0 0 var(--c-o), 12px -2px 0 0 var(--c-o), 14px -12px 0 0 var(--c-d),
      /* Frame 2: 腳位置變化 */
      2px 0px 0 0 var(--c-d), 4px 0px 0 0 var(--c-d), 8px 0px 0 0 var(--c-d), 10px 0px 0 0 var(--c-d);
  }
}

/* 故障文字效果 */
.glitch-wrapper {
  position: relative;
}

.glitch {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
  letter-spacing: 2px;
  position: relative;
  font-family: 'Press Start 2P', 'Courier New', cursive; /* 更改為像素風格字體 */
  text-transform: uppercase;
  line-height: 1.5;
  display: inline-block; /* 確保 cursor 跟隨 */
}

.loading-cursor {
  animation: blink 0.5s infinite;
  margin-left: 2px;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch::before {
  left: 2px;
  text-shadow: -1px 0 #ff00c1;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim 5s infinite linear alternate-reverse;
}

.glitch::after {
  left: -2px;
  text-shadow: -1px 0 #00fff9;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim2 5s infinite linear alternate-reverse;
}

@keyframes glitch-anim {
  0% { clip: rect(31px, 9999px, 98px, 0); }
  5% { clip: rect(69px, 9999px, 86px, 0); }
  10% { clip: rect(7px, 9999px, 20px, 0); }
  15% { clip: rect(89px, 9999px, 16px, 0); }
  20% { clip: rect(2px, 9999px, 92px, 0); }
  25% { clip: rect(54px, 9999px, 7px, 0); }
  30% { clip: rect(47px, 9999px, 30px, 0); }
  35% { clip: rect(41px, 9999px, 79px, 0); }
  40% { clip: rect(28px, 9999px, 16px, 0); }
  45% { clip: rect(66px, 9999px, 43px, 0); }
  50% { clip: rect(38px, 9999px, 91px, 0); }
  55% { clip: rect(11px, 9999px, 64px, 0); }
  60% { clip: rect(96px, 9999px, 3px, 0); }
  65% { clip: rect(59px, 9999px, 73px, 0); }
  70% { clip: rect(76px, 9999px, 55px, 0); }
  75% { clip: rect(8px, 9999px, 49px, 0); }
  80% { clip: rect(23px, 9999px, 14px, 0); }
  85% { clip: rect(35px, 9999px, 83px, 0); }
  90% { clip: rect(62px, 9999px, 26px, 0); }
  95% { clip: rect(44px, 9999px, 97px, 0); }
  100% { clip: rect(82px, 9999px, 10px, 0); }
}

@keyframes glitch-anim2 {
  0% { clip: rect(65px, 9999px, 100px, 0); }
  5% { clip: rect(52px, 9999px, 74px, 0); }
  10% { clip: rect(79px, 9999px, 85px, 0); }
  15% { clip: rect(75px, 9999px, 5px, 0); }
  20% { clip: rect(67px, 9999px, 61px, 0); }
  25% { clip: rect(14px, 9999px, 79px, 0); }
  30% { clip: rect(1px, 9999px, 66px, 0); }
  35% { clip: rect(86px, 9999px, 30px, 0); }
  40% { clip: rect(23px, 9999px, 98px, 0); }
  45% { clip: rect(85px, 9999px, 72px, 0); }
  50% { clip: rect(71px, 9999px, 75px, 0); }
  55% { clip: rect(2px, 9999px, 48px, 0); }
  60% { clip: rect(30px, 9999px, 16px, 0); }
  65% { clip: rect(59px, 9999px, 50px, 0); }
  70% { clip: rect(41px, 9999px, 62px, 0); }
  75% { clip: rect(2px, 9999px, 82px, 0); }
  80% { clip: rect(47px, 9999px, 73px, 0); }
  85% { clip: rect(3px, 9999px, 27px, 0); }
  90% { clip: rect(26px, 9999px, 55px, 0); }
  95% { clip: rect(42px, 9999px, 97px, 0); }
  100% { clip: rect(38px, 9999px, 49px, 0); }
}

/* 進度條 */
.progress-bar-container {
  width: 100%; /* 讓進度條填滿 loader-track 容器 */
  height: 4px;
  background-color: rgba(128, 128, 128, 0.2);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}

.progress-bar {
  height: 100%;
  background-color: var(--primary-color);
  width: 0%;
  animation: progress-fill 2s ease-in-out forwards;
  box-shadow: 0 0 10px var(--primary-color);
}

@keyframes progress-fill {
  0% { width: 0%; }
  30% { width: 40%; }
  60% { width: 70%; }
  80% { width: 85%; }
  100% { width: 100%; }
}

/* 離開動畫 */
.fade-out-leave-active {
  transition: opacity 0.5s ease;
}

.fade-out-leave-to {
  opacity: 0;
}
</style>
