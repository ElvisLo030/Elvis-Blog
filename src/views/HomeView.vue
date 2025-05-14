<template>
  <div class="home-container">
    <section class="hero">
      <h1 class="hero-title">歡迎來到 <span class="highlight">小羅の窩</span></h1>
      <p class="hero-subtitle">分享技術、生活和創意的個人空間</p>
    </section>

    <section class="featured-posts">
      <h2 class="section-title">最新文章</h2>
      <div class="posts-grid" v-if="recentPosts.length > 0">
        <router-link
          v-for="post in recentPosts"
          :key="post.slug"
          :to="`/post/${post.slug}`"
          class="post-card"
        >
          <div class="post-date">{{ formatDate(post.date) }}</div>
          <h3 class="post-title">{{ post.title }}</h3>
          <p class="post-summary">{{ post.summary || truncateContent(post.content) }}</p>
          <div class="post-tags">
            <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </router-link>
      </div>
      <div v-else class="no-posts">
        <p>還沒有文章發布，敬請期待！</p>
      </div>
      <div class="view-all" v-if="recentPosts.length > 0">
        <router-link to="/posts" class="view-all-button">檢視所有文章</router-link>
      </div>
    </section>

    <section class="featured-projects">
      <h2 class="section-title">精選專案</h2>
      <div class="projects-grid">
        <div class="project-card">
          <h3 class="project-title">個人部落格</h3>
          <p class="project-description">基於 Vue.js 的個人部落格網站，採用 SOLID 原則開發，支持 Markdown 文章。</p>
          <div class="project-tech">
            <span class="tech-tag">Vue.js</span>
            <span class="tech-tag">Markdown</span>
            <span class="tech-tag">SOLID</span>
          </div>
        </div>
        <!-- 你可以在這裡添加更多專案卡片 -->
      </div>
      <div class="view-all">
        <router-link to="/projects" class="view-all-button">檢視所有專案</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import postService from '../services/PostService';

// 獲取最新文章
const recentPosts = ref([]);

onMounted(async () => {
  const allPosts = postService.getAllPosts();
  recentPosts.value = allPosts.slice(0, 3); // 只顯示最新的3篇文章
});

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// 截斷內容
const truncateContent = (content) => {
  const plainText = content.replace(/<[^>]*>?/gm, '');
  return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
};
</script>

<style scoped>
.home-container {
  max-width: 1100px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  padding: 4rem 1rem;
  margin-bottom: 2rem;
  background: linear-gradient(rgba(var(--primary-rgb), 0.05), rgba(var(--primary-rgb), 0.02));
  border-radius: 12px;
}

.hero-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 800;
}

.highlight {
  color: var(--primary-color);
}

.hero-subtitle {
  font-size: 1.2rem;
  color: var(--text-color-secondary);
  max-width: 600px;
  margin: 0 auto;
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

.featured-posts, .featured-projects {
  margin-bottom: 4rem;
}

.posts-grid, .projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.post-card, .project-card {
  background-color: var(--card-bg);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px var(--shadow-color);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: var(--text-color);
}

.post-card:hover, .project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px var(--shadow-color);
}

.post-date {
  font-size: 0.85rem;
  color: var(--text-color-secondary);
  margin-bottom: 0.5rem;
}

.post-title, .project-title {
  font-size: 1.4rem;
  margin: 0.5rem 0;
  color: var(--primary-color);
}

.post-summary, .project-description {
  flex-grow: 1;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.post-tags, .project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag, .tech-tag {
  background-color: rgba(var(--primary-rgb), 0.1);
  color: var(--primary-color);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.view-all {
  text-align: center;
  margin-top: 1rem;
}

.view-all-button {
  display: inline-block;
  background-color: var(--primary-color);
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
}

.view-all-button:hover {
  background-color: var(--primary-color-dark);
}

.no-posts {
  text-align: center;
  padding: 2rem;
  background-color: var(--card-bg);
  border-radius: 8px;
  box-shadow: 0 4px 6px var(--shadow-color);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .posts-grid, .projects-grid {
    grid-template-columns: 1fr;
  }
}

/* 添加一些動畫效果 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.home-container > * {
  animation: fadeIn 0.5s ease-out forwards;
}

.featured-posts {
  animation-delay: 0.2s;
}

.featured-projects {
  animation-delay: 0.4s;
}

/* 使用全局定義的 CSS 變量，移除重複定義 */
</style>
