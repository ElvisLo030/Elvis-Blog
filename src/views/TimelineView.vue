<template>
  <div class="timeline-container">
    <div class="timeline-header">
      <h1 class="page-title">Timeline</h1>
    </div>
    <div class="timeline-content">
      <p>準備中... 敬請期待</p>
    </div>
  </div>
</template>

<style scoped>
.timeline-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem 4rem 1rem;
}

.timeline-header {
  text-align: center;
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 0.8s ease-out forwards;
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

/* 時間軸主體 */
.timeline {
  position: relative;
  width: 100%;
  margin: 0 auto;
}

/* 中央垂直線 */
.timeline-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 4px;
  background-color: var(--border-color); /* 使用變數 */
  transform: translateX(-50%);
  border-radius: 2px;
}

/* 時間軸項目容器 */
.timeline-item {
  position: relative;
  width: 50%;
  padding: 0 40px;
  box-sizing: border-box;
  margin-bottom: 3rem;
  animation: slideUp 0.6s ease-out forwards;
  opacity: 0; /* 初始隱藏，由動畫顯示 */
}

/* 左側項目 */
.timeline-item.left {
  left: 0;
  text-align: right;
}

.timeline-item.left .timeline-content {
  margin-left: auto; /* 靠右對齊容器內 */
}

.timeline-item.left .timeline-tags {
  justify-content: flex-end;
}

/* 右側項目 */
.timeline-item.right {
  left: 50%;
  text-align: left;
}

.timeline-item.right .timeline-tags {
  justify-content: flex-start;
}

/* 時間點圖標圓圈 */
.timeline-dot {
  position: absolute;
  top: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--card-bg);
  border: 4px solid var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  color: var(--primary-color);
  font-size: 1.2rem;
  box-shadow: 0 0 0 4px var(--bg-color); /* 創造間隔感 */
  transition: transform 0.3s, background-color 0.3s;
}

.timeline-item.left .timeline-dot {
  right: -20px; /* 寬度的一半 */
}

.timeline-item.right .timeline-dot {
  left: -20px; /* 寬度的一半 */
}

.timeline-item:hover .timeline-dot {
  transform: scale(1.15);
  background-color: var(--primary-color);
  color: white;
}

/* 內容卡片 */
.timeline-content {
  background-color: var(--card-bg);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px var(--shadow-color);
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;
}

.timeline-content:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px var(--shadow-color);
}

/* 左側箭頭 */
.timeline-item.left .timeline-content::after {
  content: '';
  position: absolute;
  top: 15px;
  right: -10px;
  border-width: 10px 0 10px 10px;
  border-style: solid;
  border-color: transparent transparent transparent var(--card-bg);
}

/* 右側箭頭 */
.timeline-item.right .timeline-content::after {
  content: '';
  position: absolute;
  top: 15px;
  left: -10px;
  border-width: 10px 10px 10px 0;
  border-style: solid;
  border-color: transparent var(--card-bg) transparent transparent;
}

.timeline-date {
  color: var(--primary-color);
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  display: inline-block;
  padding: 0.2rem 0.6rem;
  background-color: rgba(var(--primary-rgb), 0.1);
  border-radius: 15px;
}

.timeline-title {
  margin: 0.5rem 0;
  font-size: 1.4rem;
  color: var(--text-color);
}

.timeline-desc {
  color: var(--text-color-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.timeline-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.timeline-tag {
  background-color: var(--bg-color);
  color: var(--text-color-secondary);
  font-size: 0.8rem;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  transition: color 0.2s;
}

.timeline-item:hover .timeline-tag {
  color: var(--primary-color);
}

/* 動畫設定 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 依序執行動畫 */
.timeline-item:nth-child(2) { animation-delay: 0.1s; } /* 包含 line 所以從 2 開始 */
.timeline-item:nth-child(3) { animation-delay: 0.3s; }
.timeline-item:nth-child(4) { animation-delay: 0.5s; }
.timeline-item:nth-child(5) { animation-delay: 0.7s; }
.timeline-item:nth-child(6) { animation-delay: 0.9s; }

/* 響應式設計 (平板與手機) */
@media (max-width: 768px) {
  .timeline-line {
    left: 30px; /* 線移到左側 */
  }

  .timeline-item {
    width: 100%;
    padding-left: 70px; /* 為左側線和點留出空間 */
    padding-right: 10px;
    text-align: left; /* 全部靠左對齊 */
  }

  .timeline-item.left, 
  .timeline-item.right {
    left: 0;
    text-align: left;
  }

  .timeline-item.left .timeline-content {
    margin-left: 0;
  }

  /* 調整圓點位置 */
  .timeline-item.left .timeline-dot,
  .timeline-item.right .timeline-dot {
    left: 10px; /* 線在 30px, 點寬 40px, 中心對齊: 30 - 20 = 10 */
    right: auto;
  }

  /* 調整內容箭頭，全部指向左側 */
  .timeline-item.left .timeline-content::after,
  .timeline-item.right .timeline-content::after {
    right: auto;
    left: -10px;
    border-width: 10px 10px 10px 0;
    border-color: transparent var(--card-bg) transparent transparent;
  }

  .timeline-tags,
  .timeline-item.left .timeline-tags {
    justify-content: flex-start;
  }

  .page-title {
    font-size: 2rem;
  }
}
</style>

