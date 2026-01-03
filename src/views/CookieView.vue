<template>
  <div class="about-container">
    <div class="about-header">
      <h1 class="page-title">Cookie 使用說明</h1>
    </div>

    <section class="about-section">
      <div class="section-content text-content">
        <h2>1. Cookie 是什麼？</h2>
        <p>Cookie 是您瀏覽網站時，網站傳送給瀏覽器的一小段文字檔案。它能幫助網站記住您的資訊，讓您下次瀏覽時更方便。</p>

        <h2>2. 我們如何使用 Cookie</h2>
        <p>本網站使用 Cookie 來提升您的使用體驗。我們主要將 Cookie 用於以下目的：</p>
        <ul class="cookie-list">
          <li><strong>必要性 Cookie：</strong> 維持網站運作所需的基本功能。</li>
          <li><strong>分析性 Cookie (Google Analytics)：</strong> 我們使用 Google Analytics 來分析網站流量和使用者行為，這幫助我們了解使用者如何與網站互動，進而改進網站內容與功能。這些資料是匿名的，無法直接識別您的個人身分。</li>
        </ul>
        
        <h2>3. Cookie 設定</h2>
        <p>我們尊重您的隱私選擇。您可以選擇是否允許我們收集 Google Analytics 的分析資料。此設定僅影響分析性 Cookie，必要性 Cookie 將持續運作以維持網站功能。</p>
        
        <div class="cookie-settings">
          <div class="setting-item">
            <div class="setting-info">
              <h3>Google Analytics 分析</h3>
              <p>{{ isGaDisabled ? '已停用' : '已啟用' }}</p>
            </div>
            <button 
              class="toggle-btn" 
              :class="{ 'active': !isGaDisabled }" 
              @click="toggleGa"
              aria-label="切換 Google Analytics"
            >
              <div class="toggle-circle"></div>
            </button>
          </div>
        </div>

        <h2>4. 如何在瀏覽器中管理 Cookie</h2>
        <p>除了上述設定外，您也可以隨時透過瀏覽器設定來拒絕或刪除 Cookie。請注意，若您完全停用所有 Cookie（包括必要性 Cookie），本網站的部分功能可能無法正常運作。</p>
        <ul class="cookie-list">
          <li><a href="https://support.google.com/chrome/answer/95647?hl=zh-Hant" target="_blank" rel="noopener">Google Chrome</a></li>
          <li><a href="https://support.apple.com/zh-tw/guide/safari/sfri11471/mac" target="_blank" rel="noopener">Safari</a></li>
          <li><a href="https://support.mozilla.org/zh-TW/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener">Firefox</a></li>
          <li><a href="https://support.microsoft.com/zh-tw/microsoft-edge/刪除-microsoft-edge-中的-cookie-63947406-40ac-cdd2-860f-0e61390632cd" target="_blank" rel="noopener">Microsoft Edge</a></li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const GA_MEASUREMENT_ID = 'G-CC385LNFSY';
const isGaDisabled = ref(false);

const checkGaStatus = () => {
  // 檢查 localStorage
  const optOut = localStorage.getItem('ga_opt_out');
  // 如果有設定 opt-out，或者 window 屬性已經被設為 true
  if (optOut === 'true' || window['ga-disable-' + GA_MEASUREMENT_ID] === true) {
    isGaDisabled.value = true;
  } else {
    isGaDisabled.value = false;
  }
};

const toggleGa = () => {
  if (isGaDisabled.value) {
    // 目前是停用，要改為啟用
    localStorage.removeItem('ga_opt_out');
    window['ga-disable-' + GA_MEASUREMENT_ID] = false;
    isGaDisabled.value = false;
  } else {
    // 目前是啟用，要改為停用
    localStorage.setItem('ga_opt_out', 'true');
    window['ga-disable-' + GA_MEASUREMENT_ID] = true;
    isGaDisabled.value = true;
  }
};

onMounted(() => {
  window.scrollTo(0, 0);
  checkGaStatus();
});
</script>

<style scoped>
.about-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.about-header {
  text-align: center;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  position: relative;
  display: block;
  text-align: center;
  width: 100%;
}

.page-title:after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 3px;
  background-color: var(--primary-color);
}

.page-subtitle {
  font-size: 1.2rem;
  color: var(--text-color-secondary);
  margin-top: 1rem;
}

.about-section {
  margin-bottom: 3rem;
  animation: fadeIn 0.5s ease-out forwards;
}

.section-content {
  background-color: var(--card-bg);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 12px var(--shadow-color);
}

.text-content h2 {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.text-content h2:first-child {
  margin-top: 0;
}

.text-content p {
  line-height: 1.8;
  color: var(--text-color-secondary);
  margin-bottom: 1.5rem;
  text-align: justify;
}

.cookie-list {
  padding-left: 20px;
  margin-bottom: 1.5rem;
  color: var(--text-color-secondary);
}

.cookie-list li {
  margin-bottom: 0.5rem;
  list-style-type: disc;
}

/* New styles for toggle */
.cookie-settings {
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
}

.setting-info h3 {
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
  color: var(--text-color);
}

.setting-info p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-color-secondary);
}

.toggle-btn {
  width: 50px;
  height: 28px;
  border-radius: 14px;
  background-color: #ccc;
  position: relative;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s;
  flex-shrink: 0;
}

.toggle-btn.active {
  background-color: var(--primary-color);
}

.toggle-circle {
  width: 24px;
  height: 24px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.3s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
}

.toggle-btn.active .toggle-circle {
  transform: translateX(22px);
}

.setting-note {
  font-size: 0.9rem;
  color: var(--text-color-secondary);
  margin-top: 0.5rem;
  font-style: italic;
}

a {
  color: var(--primary-color);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
}
</style>
