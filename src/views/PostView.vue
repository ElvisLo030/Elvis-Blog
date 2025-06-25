<template>
  <div class="post-container" v-if="post">
    <div class="post-header">
      <div class="post-meta">
        <div class="post-meta-left">
          <span class="post-date">{{ formatDate(post.date) }}</span>
          <span class="post-views">
            <font-awesome-icon :icon="['fas', 'eye']" class="view-icon" />
            <span v-if="viewCount > 0">{{ viewCount }} 次觀看</span>
            <span v-else class="loading-text">載入中...</span>
          </span>
        </div>
        <div class="post-tags">
          <span 
            v-for="tag in post.tags" 
            :key="tag"
            class="post-tag"
            @click="navigateToTag(tag)"
          >
            {{ tag }}
          </span>
        </div>
      </div>
      <h1 class="post-title">{{ post.title }}</h1>
    </div>
    
    <div class="post-content" v-html="renderedContent"></div>
    
    <div class="post-navigation">
      <div class="prev-post">
        <router-link v-if="prevPost" :to="`/post/${prevPost.slug}`">
          ← {{ prevPost.title }}
        </router-link>
        <span v-else class="nav-placeholder"></span>
      </div>
      <div class="back-to-posts">
        <router-link to="/post">
          所有文章
        </router-link>
      </div>
      <div class="next-post">
        <router-link v-if="nextPost" :to="`/post/${nextPost.slug}`">
          {{ nextPost.title }} →
        </router-link>
        <span v-else class="nav-placeholder"></span>
      </div>
    </div>
  </div>
  
  <div v-else class="post-not-found">
    <h2>找不到文章</h2>
    <p>抱歉，找不到您要的文章。</p>
    <router-link to="/post" class="back-button">返回文章列表</router-link>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import postService from '../services/PostService';
import markdownService from '../services/MarkdownService';
import viewCountService from '../services/ViewCountService';
import 'highlight.js/styles/atom-one-dark.css'; // 程式碼高亮樣式

// 取得路由參數
const route = useRoute();
const router = useRouter();
const { slug } = route.params;

// 文章資料
const post = ref(null);
const allPosts = ref([]);
const viewCount = ref(0);

// 載入文章
onMounted(async () => {
  allPosts.value = postService.getAllPosts();
  loadPost(slug);
});

// 監聽路由變化，重新載入文章
watch(() => route.params.slug, (newSlug) => {
  loadPost(newSlug);
});

// 載入文章函數
const loadPost = async (slug) => {
  post.value = postService.getPostBySlug(slug);
  if (post.value) {
    // 異步增加觀看次數
    try {
      viewCount.value = await viewCountService.incrementViewCount(slug);
    } catch (error) {
      console.error('Error updating view count:', error);
      viewCount.value = 0;
    }
  }
  // 滾動到頁面頂部
  window.scrollTo(0, 0);
};

// 轉換Markdown為HTML
const renderedContent = computed(() => {
  if (!post.value) return '';
  return markdownService.convertToHtml(post.value.content);
});

// 獲取前一篇和後一篇文章
const prevPost = computed(() => {
  if (!post.value || allPosts.value.length === 0) return null;
  
  const currentIndex = allPosts.value.findIndex(p => p.slug === post.value.slug);
  if (currentIndex > 0) {
    return allPosts.value[currentIndex - 1];
  }
  return null;
});

const nextPost = computed(() => {
  if (!post.value || allPosts.value.length === 0) return null;
  
  const currentIndex = allPosts.value.findIndex(p => p.slug === post.value.slug);
  if (currentIndex < allPosts.value.length - 1) {
    return allPosts.value[currentIndex + 1];
  }
  return null;
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

// 點擊標籤導航到文章列表
const navigateToTag = (tag) => {
  router.push({ 
    path: '/post',
    query: { tag }
  });
};
</script>

<style>
/* 這些樣式沒有設置scoped，因為需要影響Markdown渲染的內容 */
.post-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.post-header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.post-meta-left {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
}

.post-date {
  font-size: 0.9rem;
  color: var(--text-color-secondary);
}

.post-views {
  font-size: 0.9rem;
  color: var(--text-color-secondary);
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.view-icon {
  font-size: 0.8rem;
}

.loading-text {
  opacity: 0.7;
  font-style: italic;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.post-tag {
  background-color: rgba(var(--primary-rgb), 0.1);
  color: var(--primary-color);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.post-tag:hover {
  background-color: rgba(var(--primary-rgb), 0.2);
}

.post-title {
  font-size: 2.5rem;
  margin: 1rem 0;
  line-height: 1.3;
}

.post-content {
  line-height: 1.8;
  font-size: 1.05rem;
}

/* Markdown 渲染的樣式 */
.post-content h1,
.post-content h2,
.post-content h3,
.post-content h4,
.post-content h5,
.post-content h6 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  position: relative;
}

.post-content h2::before {
  content: '';
  position: absolute;
  left: -1rem;
  top: 0.5rem;
  width: 4px;
  height: 1.2rem;
  background-color: var(--primary-color);
  border-radius: 2px;
}

.post-content p {
  margin: 1rem 0;
}

.post-content a {
  color: var(--primary-color);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}

.post-content a:hover {
  border-color: var(--primary-color);
}

.post-content img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1.5rem 0;
  box-shadow: 0 4px 12px var(--shadow-color);
}

.post-content blockquote {
  border-left: 4px solid var(--primary-color);
  padding-left: 1rem;
  margin-left: 0;
  color: var(--text-color-secondary);
  font-style: italic;
}

.post-content pre {
  background-color: #282c34;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.post-content code {
  font-family: 'Fira Code', 'Roboto Mono', monospace;
  font-size: 0.9rem;
}

.post-content ul, .post-content ol {
  padding-left: 1.5rem;
  margin: 1rem 0;
}

.post-content li {
  margin-bottom: 0.5rem;
}

.post-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

.post-content th, .post-content td {
  padding: 0.75rem;
  border: 1px solid var(--border-color);
}

.post-content th {
  background-color: rgba(var(--primary-rgb), 0.05);
}

.post-content tr:nth-child(even) {
  background-color: rgba(var(--primary-rgb), 0.02);
}

/* 文章導航 */
.post-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.prev-post, .next-post, .back-to-posts {
  flex: 1;
}

.prev-post {
  text-align: left;
}

.back-to-posts {
  text-align: center;
}

.next-post {
  text-align: right;
}

.post-navigation a {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.2s;
  font-weight: 500;
}

.post-navigation a:hover {
  color: var(--primary-color-dark);
}

.nav-placeholder {
  visibility: hidden;
}

/* 文章未找到樣式 */
.post-not-found {
  text-align: center;
  padding: 4rem 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.back-button {
  display: inline-block;
  background-color: var(--primary-color);
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  text-decoration: none;
  margin-top: 1.5rem;
  transition: background-color 0.2s;
}

.back-button:hover {
  background-color: var(--primary-color-dark);
}

@media (max-width: 768px) {
  .post-title {
    font-size: 2rem;
  }
  
  .post-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }
  
  .post-meta-left {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}

:root {
  --primary-rgb: 74, 158, 255;
  --primary-color-dark: #3a7fd6;
  --text-color-secondary: #666;
}

.dark-mode {
  --primary-rgb: 94, 175, 255;
  --primary-color-dark: #4a9eff;
  --text-color-secondary: #aaa;
}
</style>
