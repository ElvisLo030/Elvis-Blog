<template>
  <div class="projects-container">
    <div class="projects-header">
      <h1 class="page-title">My Projects</h1>
      <p class="page-subtitle">我在 GitHub 上的開源專案</p>
      <div class="github-info">
        <a :href="`https://github.com/${githubUsername}`" target="_blank" class="github-link">
          <i class="fa-brands fa-github github-icon"></i> {{ githubUsername }}
        </a>
        <button @click="refreshProjects" class="refresh-btn" :disabled="isLoading">
          <span v-if="!isLoading"><font-awesome-icon :icon="['fas', 'rotate']" /></span>
          <span v-else><font-awesome-icon :icon="['fas', 'spinner']" spin /></span>
          重新整理
        </button>
      </div>
    </div>
    
    <!-- 載入狀態 -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner">
        <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" />
      </div>
      <p>正在從 GitHub 載入專案...</p>
    </div>
    
    <!-- 載入錯誤 -->
    <div v-else-if="loadingError" class="error-container">
      <p>{{ loadingError }}</p>
      <button @click="refreshProjects" class="refresh-btn" style="font: inherit;">
        <span><font-awesome-icon :icon="['fas', 'rotate']" /></span> 重試
      </button>
    </div>
    
    <template v-else>
      <!-- 沒有專案時顯示 -->
      <div v-if="projects.length === 0" class="no-projects">
        <p>未找到公開的 GitHub 專案。</p>
        <p class="suggestion">你可以在 GitHub 上創建一些公開專案，它們將自動顯示在這裡。</p>
      </div>
      
      <!-- 有專案時顯示 -->
      <template v-else>
        <div class="filter-container">
          <div class="filter-tabs">
            <button 
              v-for="category in categories" 
              :key="category"
              @click="currentCategory = category"
              :class="{ active: currentCategory === category }"
              class="filter-tab"
            >
              {{ category }}
            </button>
          </div>
        </div>
        
        <div class="projects-grid">
          <a 
            v-for="project in filteredProjects" 
            :key="project.id"
            :href="project.codeUrl"
            target="_blank"
            class="project-card"
            :class="{ featured: project.featured }"
          >
            <div class="project-image">
              <img 
                v-if="project.image" 
                :src="project.image" 
                :alt="project.title" 
                @error="handleImageError($event, project)"
              >
              <div v-else class="project-image-placeholder">
                <div class="project-icon">
                  <font-awesome-icon :icon="['fas', 'folder']" v-if="!project.language" />
                  <span v-else>{{ project.language }}</span>
                </div>
                <div class="project-type">{{ project.language || '其他' }}</div>
              </div>
            </div>
            <div class="project-content">
              <div class="project-tags">
                <span 
                  v-for="tag in project.tags" 
                  :key="tag"
                  class="project-tag"
                >
                  {{ tag }}
                </span>
              </div>
              <h2 class="project-title">{{ project.title }}</h2>
              <p class="project-description">{{ project.description }}</p>
              
              <!-- 專案統計信息 -->
              <div class="project-stats">
                <span class="stat-item" v-if="project.stars > 0">
                  <span class="stat-icon"><font-awesome-icon :icon="['fas', 'star']" /></span> {{ project.stars }}
                </span>
                <span class="stat-item" v-if="project.forks > 0">
                  <span class="stat-icon"><font-awesome-icon :icon="['fas', 'code-branch']" /></span> {{ project.forks }}
                </span>
                <span class="stat-item">
                  <span class="stat-icon"><font-awesome-icon :icon="['far', 'clock']" /></span> {{ formatDate(project.updatedAt) }}
                </span>
              </div>
              
              <div class="project-tech">
                <span 
                  v-for="tech in project.technologies" 
                  :key="tech"
                  class="tech-tag"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </a>
        </div>
      </template>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { fetchRepositories } from '../services/GitHubService';

// 載入狀態管理
const isLoading = ref(true);
const loadingError = ref(null);

// 用戶配置
const githubUsername = ref('ElvisLo030'); // 你的 GitHub 用戶名

// 專案列表
const projects = ref([]);

// 使用程式語言作為分類標籤
const categories = computed(() => {
  // 從項目中提取所有實際使用的程式語言
  const usedLanguages = ['全部'];
  projects.value.forEach(project => {
    if (project.language && !usedLanguages.includes(project.language)) {
      usedLanguages.push(project.language);
    }
  });
  
  return usedLanguages;
});

const currentCategory = ref('全部');

// 從 GitHub 獲取項目
async function loadGitHubProjects() {
  isLoading.value = true;
  loadingError.value = null;
  
  try {
    const repos = await fetchRepositories(githubUsername.value);
    
    if (repos.length === 0) {
      loadingError.value = '未找到公開專案，或者獲取專案時發生錯誤。';
    } else {
      projects.value = repos;
      console.log(`從 GitHub 載入了 ${repos.length} 個專案`);
    }
  } catch (error) {
    console.error('載入 GitHub 專案失敗:', error);
    loadingError.value = `載入專案時發生錯誤: ${error.message}`;
  } finally {
    isLoading.value = false;
  }
}

// 在頁面載入時獲取專案
onMounted(() => {
  loadGitHubProjects();
});

// 根據程式語言過濾專案
const filteredProjects = computed(() => {
  if (currentCategory.value === '全部') {
    return projects.value;
  }
  return projects.value.filter(project => project.language === currentCategory.value);
});

// 重新載入專案
function refreshProjects() {
  if (!isLoading.value) {
    loadGitHubProjects();
  }
}

// 處理圖片載入錯誤
function handleImageError(event, project) {
  // 隱藏圖片元素
  event.target.style.display = 'none';
  
  // 在圖片容器中插入文字替代內容
  const container = event.target.parentNode;
  
  // 創建一個文字替代容器
  const placeholder = document.createElement('div');
  placeholder.className = 'project-image-placeholder';
  
  // 添加專案圖標
  const icon = document.createElement('div');
  icon.className = 'project-icon';
  
  // 如果有語言，顯示語言；否則顯示資料夾圖標
  if (project.language) {
    icon.textContent = project.language;
  } else {
    // 創建 Font Awesome 圖標元素
    const folderIcon = document.createElement('i');
    folderIcon.className = 'fas fa-folder';
    icon.appendChild(folderIcon);
  }
  
  placeholder.appendChild(icon);
  
  // 添加專案類型
  const type = document.createElement('div');
  type.className = 'project-type';
  type.textContent = project.language || '其他';
  placeholder.appendChild(type);
  
  // 將替代內容添加到圖片容器中
  container.appendChild(placeholder);
}

// 格式化日期函數
function formatDate(date) {
  if (!date) return '未知日期';
  
  // 檢查是否是有效的日期對象
  if (!(date instanceof Date) || isNaN(date)) {
    return '未知日期';
  }
  
  const now = new Date();
  const diff = Math.floor((now - date) / 1000); // 差距（秒）
  
  // 不到一分鐘
  if (diff < 60) {
    return '剛剛更新';
  }
  
  // 不到一小時
  if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    return `${minutes} 分鐘前更新`;
  }
  
  // 不到一天
  if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} 小時前更新`;
  }
  
  // 不到一週
  if (diff < 604800) {
    const days = Math.floor(diff / 86400);
    return `${days} 天前更新`;
  }
  
  // 不到一個月
  if (diff < 2592000) {
    const weeks = Math.floor(diff / 604800);
    return `${weeks} 週前更新`;
  }
  
  // 不到一年
  if (diff < 31536000) {
    const months = Math.floor(diff / 2592000);
    return `${months} 個月前更新`;
  }
  
  // 超過一年
  const years = Math.floor(diff / 31536000);
  return `${years} 年前更新`;
}
</script>

<style scoped>
.projects-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem;
}

.projects-header {
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

.filter-container {
  margin-bottom: 2rem;
}

.filter-tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.filter-tab {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-tab:hover {
  border-color: var(--primary-color);
}

.filter-tab.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.project-card {
  background-color: var(--card-bg);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px var(--shadow-color);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  height: 100%;
  animation: fadeIn 0.5s ease-out forwards;
  text-decoration: none;
  color: var(--text-color);
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px var(--shadow-color);
}

.project-card.featured {
  border: 2px solid var(--primary-color);
  position: relative;
}

.project-card.featured:before {
  content: '';
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: var(--primary-color);
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-card.featured:before {
  font-family: 'Font Awesome 6 Free';
  font-weight: 900;
  content: '\f005';  /* 星星圖標的 Unicode */
}

.project-image {
  width: 100%;
  height: 180px;
  overflow: hidden;
  background-color: #f0f0f0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dark-mode .project-image {
  background-color: #2a2a2a;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.project-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
}

.project-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.project-type {
  font-size: 0.9rem;
  color: var(--text-color-secondary);
  font-weight: 500;
}

/* 這裡的樣式是為了讓圖片載入錯誤時顯示預設圖標和類型 */
/*.project-image::before {
  content: '';
  position: absolute;
  font-size: 2rem;
  opacity: 0.2;
  z-index: 0;
}*/

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.project-tag {
  background-color: rgba(var(--primary-rgb), 0.1);
  color: var(--primary-color);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.project-title {
  font-size: 1.4rem;
  margin: 0 0 1rem 0;
  color: var(--primary-color);
}

.project-description {
  margin-bottom: 1.5rem;
  flex-grow: 1;
  line-height: 1.6;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-tag {
  background-color: var(--border-color);
  color: var(--text-color);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

/* 已移除不需要的 project-links 和 相關樣式 */

/* README 相關樣式已移除 */

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* GitHub 資訊樣式 */
.github-info {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
  gap: 1rem;
}

.github-link, .refresh-btn {
  display: flex;
  align-items: center;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s;
  cursor: pointer;
  height: 40px;
  box-sizing: border-box;
  min-width: 120px;
  justify-content: center;
}

.github-link {
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
}

.github-link:hover {
  background-color: var(--primary-color);
  color: #fff;
}

.github-icon {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

.refresh-btn {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  color: var(--text-color);
}

.refresh-btn:hover:not(.disabled) {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.refresh-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.github-link i, .refresh-btn span {
  margin-right: 0.5rem;
}

/* 載入動畫 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
}

.loading-spinner {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  text-align: center;
}

/* Font Awesome 已經有 fa-spin 動畫，所以我們不需要定義 spin 動畫 */

/* 錯誤容器 */
.error-container {
  background-color: rgba(255, 0, 0, 0.1);
  color: #ff3333;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 2rem;
}

/* 沒有專案顯示 */
.no-projects {
  text-align: center;
  padding: 3rem;
  background-color: var(--card-bg);
  border-radius: 8px;
  margin-bottom: 2rem;
}

.suggestion {
  font-style: italic;
  color: var(--text-color-secondary);
  margin-top: 1rem;
}

/* 專案統計信息 */
.project-stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: var(--text-color-secondary);
}

.stat-icon {
  margin-right: 0.3rem;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-tabs {
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }
  
  .github-info {
    flex-direction: column;
  }
}

</style>
