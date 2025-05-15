<template>
  <div class="about-container">
    <div class="about-header">
    </div>

    <section class="about-section">
      <h2 class="section-title"><font-awesome-icon :icon="['fas', 'id-card']" class="section-icon" /> About</h2>
      <div class="section-content">
        <ul class="info-list">
          <li><font-awesome-icon :icon="['fas', 'user']" />你可以叫我：小羅</li>
          <li><font-awesome-icon :icon="['fas', 'map-marker-alt']" /> 居住地：高雄</li>
          <li><font-awesome-icon :icon="['fas', 'brain']" /> MBTI：INFJ-T</li>
          <li><font-awesome-icon :icon="['fas', 'graduation-cap']" /> 學校：CSU-MIS</li>
        </ul>
      </div>
    </section>

    <section class="about-section">
      <h2 class="section-title"><font-awesome-icon :icon="['fas', 'share-alt']" class="section-icon" /> Soacial Media</h2>
      <div class="section-content">
        <div class="social-links">
          <a href="mailto:elvislo.work@gmail.com" class="social-link" aria-label="Email">
            <font-awesome-icon :icon="['fas', 'envelope']" />
            <span>Email</span>
          </a>
          <a href="https://instagram.com/elvis._.lo" target="_blank" class="social-link" aria-label="Instagram">
            <font-awesome-icon :icon="['fab', 'instagram']" />
            <span>@elvis._.lo</span>
          </a>
          <a href="https://t.me/elvislo030" target="_blank" class="social-link" aria-label="Telegram">
            <font-awesome-icon :icon="['fab', 'telegram']" />
            <span>@elvislo030</span>
          </a>
          <a href="#" class="social-link" aria-label="Discord">
            <font-awesome-icon :icon="['fab', 'discord']" />
            <span>elvislo_030</span>
          </a>
          <a href="https://github.com/ElvisLo030" target="_blank" class="social-link" aria-label="GitHub">
            <font-awesome-icon :icon="['fab', 'github']" />
            <span>ElvisLo030</span>
          </a>
          <a href="https://x.com/ElvisLo030" target="_blank" class="social-link" aria-label="Twitter">
            <font-awesome-icon :icon="['fab', 'twitter']" />
            <span>@ElvisLo030</span>
          </a>
        </div>
      </div>
    </section>

    <section class="about-section">
      <h2 class="section-title"><font-awesome-icon :icon="['fas', 'star']" class="section-icon" /> More</h2>
      <div class="section-content">
        <div class="skills-container">
          <div class="skill-category">
            <h3 class="skill-title"><font-awesome-icon :icon="['fas', 'gamepad']" /> 遊戲</h3>
            <div class="skill-tags">
              <span class="skill-tag">崩壞：星穹鐵道</span>
              <span class="skill-tag">原神</span>
              <span class="skill-tag">TCGP</span>
              <span class="skill-tag">MaiMai</span>
              <span class="skill-tag">Chunithm</span>
              <span class="skill-tag">Cytus 2</span>
              <span class="skill-tag">Arcaea</span>
              <span class="skill-tag">Project Sekai</span>
            </div>
          </div>
          
          <div class="skill-category">
            <h3 class="skill-title"><font-awesome-icon :icon="['fas', 'code']" /> 程式</h3>
            <div class="skill-tags">
              <span class="skill-tag">C++</span>
              <span class="skill-tag">Java</span>
              <span class="skill-tag">JavaScript</span>
              <span class="skill-tag">Python</span>
              <span class="skill-tag">Vue</span>
              <span class="skill-tag">Swift</span>
            </div>
            <p class="skill-note">以上努力學習中...<br>希望能好好學會這些</p>
          </div>
          
          <div class="skill-category">
            <h3 class="skill-title"><font-awesome-icon :icon="['fas', 'music']" /> 音樂</h3>
            <p class="skill-desc">主要以日文歌、電音為主，或者V家/動漫/音遊相關類型</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// 可以在這裡添加更多的交互邏輯
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
  width: 60%;
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

.skill-note {
  margin-top: 1rem;
  font-style: italic;
  color: var(--text-color-secondary);
}

.skill-desc {
  line-height: 1.6;
}

/* 自訂各項技能的圖標顏色 */
.skill-title .fa-gamepad {
  color: #ff6b6b;
}

.skill-title .fa-code {
  color: #1c9cea;
}

.skill-title .fa-music {
  color: #ae3ec9;
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
</style>
