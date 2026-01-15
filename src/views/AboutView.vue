<template>
  <div class="about-container">
    <div class="about-header">
    </div>

    <section class="about-section">
      <h2 class="section-title"><font-awesome-icon :icon="['fas', 'id-card']" class="section-icon" /> About</h2>
      <div class="section-content">
        <ul class="info-list">
          <li><font-awesome-icon :icon="['fas', 'user']" />你可以叫我：小羅 / Elvis</li>
          <li><font-awesome-icon :icon="['fas', 'map-marker-alt']" /> 出沒地：高雄</li>
          <li><font-awesome-icon :icon="['fas', 'book']" /> MBTI：INFJ-T</li>
          <li><font-awesome-icon :icon="['fas', 'graduation-cap']" /> 學校：CSU-MIS</li>
          <li @click="openCSUMIS" class="clickable-list-item">
            <font-awesome-icon :icon="['fas', 'scroll']" />
            <span>23屆資管系學會活動長、24屆資管系學會會長</span>
            <font-awesome-icon :icon="['fas', 'external-link-alt']" class="external-icon" />
          </li>
          <li><font-awesome-icon :icon="['fas', 'tags']" /> KPWC 高屏聯賽負責人、草衙B1傳閱本管理人</li>
        </ul>
      </div>
    </section>

    <section class="about-section">
      <h2 class="section-title"><font-awesome-icon :icon="['fas', 'share-alt']" class="section-icon" /> Social Media</h2>
      <div class="section-content">
        <div class="social-links">
          <a href="mailto:me@elvislo.tw" class="social-link" aria-label="Email">
            <font-awesome-icon :icon="['fas', 'envelope']" />
            <span>me@elvislo.tw</span>
          </a>
          <a href="https://instagram.com/elvis._.lo" target="_blank" class="social-link" aria-label="Instagram">
            <font-awesome-icon :icon="['fab', 'instagram']" />
            <span>elvis._.lo</span>
          </a>
          <a href="https://discord.com/users/491249566750998529" class="social-link" aria-label="Discord">
            <font-awesome-icon :icon="['fab', 'discord']" />
            <span>elvislo_030</span>
          </a>
          <a href="https://github.com/ElvisLo030" target="_blank" class="social-link" aria-label="GitHub">
            <font-awesome-icon :icon="['fab', 'github']" />
            <span>ElvisLo030</span>
          </a>
          <a href="https://www.linkedin.com/in/elvislo030/" target="_blank" class="social-link" aria-label="Linkedin">
            <font-awesome-icon :icon="['fab', 'linkedin']" />
            <span>Elvis Lo</span>
          </a>
          <a href="https://t.me/elvislo030" target="_blank" class="social-link" aria-label="Telegram">
            <font-awesome-icon :icon="['fab', 'telegram']" />
            <span>elvislo030</span>
          </a>
        </div>
      </div>
    </section>

    <section class="about-section">
      <h2 class="section-title"><font-awesome-icon :icon="['fas', 'star']" class="section-icon" /> More</h2>
      <div class="section-content">
        <div class="skills-container">
          <div class="skill-category">
            <h3 class="skill-title"><font-awesome-icon :icon="['fas', 'heart']" /> Favorite </h3>
            <div class="skill-tags">
              <span class="skill-tag" @click="OrangeCatClick">橘貓</span>
              <span class="skill-tag">虎斑貓</span>
              <span class="skill-tag">咖波</span>
              <span class="skill-tag">喵喵怪</span>
              <span class="skill-tag">小八</span>
              <span class="skill-tag" @click="AnotherProfileClick">狗勾</span>
              <span class="skill-tag">鮭魚</span>
              <span class="skill-tag">日式料理</span>
              <span class="skill-tag">拉麵！</span>
              <span class="skill-tag">電腦程式相關</span>
              <span class="skill-tag">手作的東東</span>
            </div>
          </div>

          <div class="skill-category">
            <h3 class="skill-title"><font-awesome-icon :icon="['fas', 'gamepad']" /> Game </h3>
            <div class="skill-tags">
              <span class="skill-tag" @click="gameClick">崩壞：星穹鐵道</span>
              <span class="skill-tag" @click="gameClick">原神</span>
              <span class="skill-tag" @click="gameClick">TCGP</span>
              <span class="skill-tag" @click="gameClick">MaiMai</span>
              <span class="skill-tag" @click="gameClick">Chunithm</span>
              <span class="skill-tag" @click="gameClick">Cytus 2</span>
              <span class="skill-tag" @click="gameClick">Arcaea</span>
              <span class="skill-tag" @click="gameClick">Project Sekai</span>
            </div>
          </div>
          
          <div class="skill-category">
            <h3 class="skill-title"><font-awesome-icon :icon="['fas', 'code']" /> Skill </h3>
            <div class="skill-tags">
              <span class="skill-tag">C++</span>
              <span class="skill-tag">Python</span>
              <span class="skill-tag">Java</span>
              <span class="skill-tag">JavaScript</span>
              <span class="skill-tag">HTML</span>
              <span class="skill-tag">Vue</span>
              <span class="skill-tag">Swift</span>
              <span class="skill-tag">GCP</span>
            </div>
            <p class="skill-note">努力學習中...</p>
          </div>
          
          <div class="skill-category">
            <h3 class="skill-title"><font-awesome-icon :icon="['fas', 'music']" /> Music </h3>
            <div class="skill-tags">
              <span class="skill-tag">J POP</span>
              <span class="skill-tag">電音</span>
              <span class="skill-tag">ACG</span>
              <span class="skill-tag">Vocaloid</span>
              <span class="skill-tag">DECO*27</span>
              <span class="skill-tag">YOASOBI</span>
              <span class="skill-tag">Ado</span>
              <span class="skill-tag">ReoNa</span>
              <span class="skill-tag">USAO</span>
              <span class="skill-tag">Xi</span>
              <span class="skill-tag">*Luna</span>
              <span class="skill-tag">打打だいず</span>
              <span class="skill-tag">初音ミク</span>
            </div>
          </div>
          <div class="skill-category">
            <h3 class="skill-title"><font-awesome-icon :icon="['fas', 'film']" /> Anime</h3>
            <div class="skill-tags">
              <span class="skill-tag">MyGo!!!!!</span>
              <span class="skill-tag">Ave Mujica</span>
              <span class="skill-tag">Grils Band Cry</span>
              <span class="skill-tag">孤獨搖滾</span>
              <span class="skill-tag">Re:Zero</span>
              <span class="skill-tag">魔法少女小圓</span>
              <span class="skill-tag">我推的孩子</span>
              <span class="skill-tag">明日方舟</span>
              <span class="skill-tag">我獨自升級</span>
              <span class="skill-tag">葬送的芙莉蓮</span>
            </div>
          </div>
          <div class="skill-category">
            <h3 class="skill-title"><font-awesome-icon :icon="['fas', 'bars']" /> Other</h3>
            <div class="skill-tags">
              <span class="skill-tag">輕微社恐👉👈</span>
              <span class="skill-tag">歡迎揪吃飯！</span>
              <span class="skill-tag">不挑食的乖小孩</span>
              <span class="skill-tag" style="background-color: #ff0000;"><font-awesome-icon :icon="['fas', 'triangle-exclamation']"/> 超嚴重訊息拖延症！</span>
              <span class="skill-tag" style="background-color: #ff0000;"><font-awesome-icon :icon="['fas', 'triangle-exclamation']"/> 超嚴重臉盲！</span>             
            </div>
          </div>
          <div class="skill-category wide-category">
            <h3 class="skill-title">
              <span class="title-text"><font-awesome-icon :icon="['fas', 'headphones']" /> Recently Played Music</span>
              <div class="header-controls">
                <button class="control-btn" @click="toggleShowAllSongs" :title="isShowAllSongs ? '恢復跑馬燈顯示' : '顯示所有歌曲'">
                  <font-awesome-icon :icon="isShowAllSongs ? ['fas', 'undo'] : ['fas', 'list']" />
                </button>
                <button v-if="!isShowAllSongs" class="control-btn" @click="toggleSpeed" :class="{ 'active': isFastSpeed }" title="切換顯示速度">
                  {{ isFastSpeed ? '2x' : '1x' }}
                </button>
              </div>
            </h3>
            <transition name="content-transition" mode="out-in">
              <div v-if="isShowAllSongs" class="songs-grid" key="grid">
                <span 
                  v-for="(song, index) in recentSongs" 
                  :key="index" 
                  class="song-tag" 
                  @click="openSong(song.url)"
                >
                  <font-awesome-icon :icon="['fas', 'play']" class="play-icon" />
                  {{ song.name }} - {{ song.artist }}
                </span>
              </div>
              <div v-else class="marquee-container" key="marquee">
                <div class="marquee-content" :style="{ animationDuration: isFastSpeed ? '15s' : '30s' }">
                  <span 
                    v-for="(song, index) in [...recentSongs, ...recentSongs]" 
                    :key="index" 
                    class="song-tag" 
                    @click="openSong(song.url)"
                  >
                    <font-awesome-icon :icon="['fas', 'play']" class="play-icon" />
                    {{ song.name }} - {{ song.artist }}
                  </span>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>

    <section class="about-section">
      <h2 class="section-title"><font-awesome-icon :icon="['fas', 'info-circle']" class="section-icon" /> Site Info</h2>
      <div class="section-content">
        <ul class="info-list">
          <li @click="router.push('/changelog')" class="clickable-list-item">
            <font-awesome-icon :icon="['fas', 'history']" />
            <span>網站更新紀錄</span>
            <font-awesome-icon :icon="['fas', 'chevron-right']" class="external-icon" />
          </li>
          <li @click="router.push('/cookie')" class="clickable-list-item">
            <font-awesome-icon :icon="['fas', 'cookie-bite']" />
            <span>Cookie 使用說明</span>
            <font-awesome-icon :icon="['fas', 'chevron-right']" class="external-icon" />
          </li>
          <li @click="router.push('/sm')" class="clickable-list-item">
            <font-awesome-icon :icon="['fas', 'message']" />
            <span>螢幕訊息</span>
            <font-awesome-icon :icon="['fas', 'chevron-right']" class="external-icon" />
          </li>
        </ul>
      </div>
    </section>
  </div>
  
</template>

<script setup>
import { ref, onMounted } from 'vue';
import googleSheetService from '../services/GoogleSheetService';

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

const OrangeCatClick = () => {
  setTimeout(() => {
    window.open('https://purr.tw/', '_blank');
    toast.remove();
  }, ); 
}

const AnotherProfileClick = () => {
  setTimeout(() => {
    window.open('https://elvislo030.notion.site/meow?pvs=4', '_blank');
    toast.remove();
  }, ); 
}

// 處理遊戲標籤點擊
import { useRouter } from 'vue-router';

const router = useRouter();
const gameClick = () => {
  router.push('/post/game_id');
}

const openCSUMIS = () => {
  window.open('https://www.instagram.com/csu._.mis/', '_blank');
}

const SONGS_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQWZgG_Bc2g1TtCIQWduP6UqwCefaxMtWGvTJs_v5YiADX4YTLNfk1SezrLhzAi0CTZJvSKAJciirvA/pub?gid=24220043&single=true&output=csv';

// 最近常聽的音樂
const recentSongs = ref([]);

onMounted(async () => {
  if (SONGS_SHEET_URL) {
    const data = await googleSheetService.fetchData(SONGS_SHEET_URL);
    if (data && data.length > 0) {
      recentSongs.value = data;
    }
  }
});

const openSong = (url) => {
  if (url) window.open(url, '_blank');
};

const isFastSpeed = ref(false);
const toggleSpeed = () => {
  isFastSpeed.value = !isFastSpeed.value;
};

const isShowAllSongs = ref(false);
const toggleShowAllSongs = () => {
  isShowAllSongs.value = !isShowAllSongs.value;
};
</script>

<style scoped>
.about-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem;
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
  margin-bottom: 0.5rem;
  position: relative;
  display: inline-block;
}

.page-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background-color: var(--primary-color);
  border-radius: 3px;
}

.page-subtitle {
  font-size: 1.2rem;
  color: var(--text-color-secondary);
  margin-top: 1rem;
}

.about-update {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  background-color: rgba(var(--primary-rgb), 0.1);
  border-radius: 20px;
}

.section-icon {
  margin-right: 0.5rem;
}

.about-section {
  margin-bottom: 3rem;
  animation: fadeIn 0.5s ease-out forwards;
}

.section-title {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-flex;
  align-items: center;
}

.section-title:after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 70px;
  height: 3px;
  background-color: var(--primary-color);
}

.section-content {
  background-color: var(--card-bg);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 6px 12px var(--shadow-color);
  transition: transform 0.3s, box-shadow 0.3s;
}

.section-content:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px var(--shadow-color);
}

.info-list {
  list-style: none;
  padding: 0;
}

.info-list li {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem;
  border-radius: 8px;
  background-color: rgba(var(--primary-rgb), 0.05);
  transition: background-color 0.3s;
}

.info-list li:hover {
  background-color: rgba(var(--primary-rgb), 0.1);
}

.info-list li .svg-inline--fa {
  width: 20px;
  text-align: center;
  flex-shrink: 0;
}

.clickable-list-item {
  cursor: pointer;
}

.clickable-list-item:hover {
  background-color: rgba(var(--primary-rgb), 0.15) !important;
}

.external-icon {
  margin-left: auto;
  font-size: 0.9rem;
  opacity: 0.6;
}

.social-links {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  text-decoration: none;
  color: var(--text-color);
  background-color: rgba(var(--primary-rgb), 0.05);
  transition: all 0.3s ease;
  font-weight: 500;
}

.social-link:hover {
  transform: translateY(-3px);
  background-color: var(--primary-color);
  color: white;
  box-shadow: 0 4px 8px rgba(var(--primary-rgb), 0.3);
}

.social-link .svg-inline--fa {
  font-size: 1.5rem;
  width: 1.5rem;
  text-align: center;
  flex-shrink: 0;
}

.skills-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.skill-category {
  padding: 1rem;
  border-radius: 8px;
  background-color: rgba(var(--primary-rgb), 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.skill-category:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 10px var(--shadow-color);
  background-color: rgba(var(--primary-rgb), 0.1);
}

.skill-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
  font-size: 1.4rem;
}

.skill-title .svg-inline--fa {
  width: 1.5rem;
  text-align: center;
  flex-shrink: 0;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.skill-tag {
  background-color: var(--primary-color);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  transition: transform 0.2s;
}

.skill-tag:hover {
  transform: scale(1.05);
}

/* 遊戲標籤特殊樣式 */
.skill-category .skill-tags .skill-tag {
  cursor: pointer;
}

.skill-category:has(.skill-title .fa-gamepad) .skill-tag:hover {
  background-color: var(--primary-color-dark);
  transform: scale(1.08);
  box-shadow: 0 2px 8px rgba(var(--primary-rgb), 0.4);
}

.skill-note {
  margin-top: 1rem;
  font-style: italic;
  color: var(--text-color-secondary);
}

.skill-desc {
  line-height: 1.6;
}

/* Discord 連結樣式 */
.discord-link {
  cursor: pointer;
}

/* 自訂各項技能的圖標顏色 */

.skill-title .fa-heart {
  color: #ff4757;
}

.skill-title .fa-gamepad {
  color: #0077ff;
}

.skill-title .fa-code {
  color: #00ffee;
}

.skill-title .fa-music {
  color: #ae3ec9;
}

.skill-title .fa-film {
  color: #ff8d1b;
}

.title-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.header-controls {
  margin-left: auto;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.control-btn {
  background: transparent;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  min-width: 24px;
}

.control-btn:hover, .control-btn.active {
  background-color: var(--primary-color);
  color: white;
}

/* 動畫 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.about-section:nth-child(1) { animation-delay: 0.1s; }
.about-section:nth-child(2) { animation-delay: 0.2s; }
.about-section:nth-child(3) { animation-delay: 0.3s; }
.about-section:nth-child(4) { animation-delay: 0.4s; }
.about-section:nth-child(5) { animation-delay: 0.5s; }

@media (max-width: 768px) {
  .skills-container {
    grid-template-columns: 1fr;
  }
  
  .social-links {
    grid-template-columns: 1fr;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .section-content {
    padding: 1rem;
  }
  
  .skill-tags {
    margin-bottom: 0.5rem;
  }
  
  .social-link {
    padding: 0.8rem;
  }
}

/* Wide category for marquee */
.wide-category {
  grid-column: 1 / -1;
  overflow: hidden;
  background-color: rgba(var(--primary-rgb), 0.08);
}

@media (min-width: 1024px) {
  .wide-category {
    grid-column: span 3;
  }
}

.marquee-container {
  width: 100%;
  overflow: hidden;
  padding: 0.5rem 0;
  mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
}

.songs-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  padding: 1rem 0;
  justify-content: center;
  width: 100%;
  max-height: 50vh;
  overflow: auto;
}

@media (max-width: 768px) {
  .songs-grid {
    justify-content: flex-start;
  }
}

.content-transition-enter-active,
.content-transition-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.content-transition-enter-from,
.content-transition-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.marquee-content {
  display: inline-flex;
  gap: 2rem;
  animation: scroll 30s linear infinite;
  white-space: nowrap;
  padding-left: 100%; /* Start from outside */
  animation-delay: -30s; /* Start immediately */
}

/* Override animation for seamless loop with duplicated content */
.marquee-content {
  padding-left: 0;
  animation: scroll 40s linear infinite;
}

.marquee-content:hover {
  animation-play-state: paused;
}

.song-tag {
  cursor: pointer;
  padding: 0.5rem 1rem;
  background-color: var(--card-bg);
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s, color 0.2s, background-color 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  white-space: nowrap;
}

.song-tag:hover {
  transform: scale(1.05);
  color: var(--primary-color);
  background-color: rgba(var(--primary-rgb), 0.15);
}

.play-icon {
  font-size: 0.8rem;
  opacity: 0.7;
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>
