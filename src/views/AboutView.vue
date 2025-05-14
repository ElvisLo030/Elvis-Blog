<template>
  <div class="about-container">
    <div class="about-header">
      <h1 class="page-title">小羅ㄉ自介！ʕ •ᴥ•ʔ</h1>
      <p class="page-subtitle">
        <span class="about-update">最後更新時間：1140222</span>
      </p>
    </div>

    <section class="about-section">
      <h2 class="section-title">簡介</h2>
      <div class="section-content">
        <ul>
          <li>你可以叫我：小羅</li>
          <li>居住地：高雄</li>
          <li>MBTI：INFJ-T</li>
          <li>學校：CSU-MIS</li>
          <li>工作：N</li>
        </ul>
      </div>
    </section>

    <section class="about-section">
      <h2 class="section-title">社群媒體</h2>
      <div class="section-content">
        <ul>
          <li>IG：<a href="https://instagram.com/elvis._.lo" target="_blank">@elvis._.lo</a></li>
          <li>TG：<a href="https://t.me/elvislo030" target="_blank">@elvislo030</a></li>
          <li>Discord：elvislo_030</li>
          <li>Github：<a href="https://github.com/ElvisLo030" target="_blank">ElvisLo030</a></li>
        </ul>
      </div>
    </section>

    <section class="about-section">
      <h2 class="section-title">興趣與技能</h2>
      <div class="section-content">
        <ul>
          <li>遊戲：崩鐵、原神、TCGP</li>
          <li>程式：C++ / Java / JavaScript / Python / Vue / Swift<br>努力學習中...<br>最近開發 DC bot 中，歡迎到我的 github 參觀（？</li>
          <li>音樂：主要以日文歌、電音為主，V家/動漫/音遊相關類型</li>
          <li>動畫：MyGo!!!!! / Ave Mujica / 我推 / 朋友方舟 / Re:0 / 魔法少女小圓 / 少女樂團 咖啡吧 / 煙夜姬</li>
          <li>更多功能：會下廚、高是屬家好男人、很會整理和空間規劃、對於整齊排列狂打勾（自認為）、主辦過maimai大型聯動，個別家族聯動聚餐</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem;
}

.about-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  font-size: 1.2rem;
  color: var(--text-color-secondary);
}

.about-section {
  margin-bottom: 3rem;
  animation: fadeIn 0.5s ease-out forwards;
}

.section-title {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
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
  border-radius: 8px;
  box-shadow: 0 4px 6px var(--shadow-color);
}

.section-content p {
  line-height: 1.6;
  margin-bottom: 1rem;
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
  
  .timeline {
    padding-left: 1.5rem;
  }
  
  .timeline-date {
    position: static;
    display: block;
    width: auto;
    text-align: left;
    margin-bottom: 0.5rem;
  }
  
  .contact-methods {
    flex-direction: column;
    gap: 1rem;
  }
}

/* 使用全局定義的 CSS 變量，移除重複定義 */
</style>
