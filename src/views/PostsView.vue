<template>
  <div class="posts-container">
    <h1 class="page-title">Blog</h1>
    
    <div class="filter-section">
      <div class="search-box">
        <font-awesome-icon :icon="['fas', 'search']" class="search-icon" />
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="搜尋文章..." 
          class="search-input"
        />
      </div>
      
      <div class="tags-filter">
        <button 
          v-for="tag in allTags" 
          :key="tag"
          @click="toggleTagFilter(tag)"
          class="filter-tag"
          :class="{ active: currentTag === tag }"
        >
          {{ tag }}
        </button>
      </div>
    </div>
    
    <div class="posts-list" v-if="filteredPosts.length > 0">
      <div 
        v-for="post in filteredPosts" 
        :key="post.slug"
        class="post-item"
      >
        <div class="post-date">{{ formatDate(post.date) }}</div>
        <h2 class="post-title">
          <router-link :to="`/post/${post.slug}`">{{ post.title }}</router-link>
        </h2>
        <p class="post-summary">{{ post.summary || truncateContent(post.content) }}</p>
        <div class="post-tags">
          <span 
            v-for="tag in post.tags" 
            :key="tag"
            class="post-tag"
            @click.prevent="toggleTagFilter(tag)"
          >
            {{ tag }}
          </span>
        </div>
        <router-link :to="`/post/${post.slug}`" class="read-more">閱讀更多 →</router-link>
      </div>
    </div>
    
    <div v-else class="no-posts">
      <p v-if="posts.length === 0">還沒有文章發布，敬請期待！</p>
      <p v-else>沒有找到符合條件的文章</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import postService from '../services/PostService';

// 文章列表
const posts = ref([]);
const searchQuery = ref('');
const currentTag = ref('全部'); // 改為單選模式

// 獲取所有文章
onMounted(async () => {
  posts.value = postService.getAllPosts();
});

// 獲取所有標籤
const allTags = computed(() => {
  const tags = new Set(['全部']); // 添加"全部"選項
  posts.value.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
});

// 過濾文章
const filteredPosts = computed(() => {
  return posts.value.filter(post => {
    // 先檢查搜尋關鍵字
    const matchesSearch = 
      searchQuery.value === '' || 
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    // 再檢查標籤 - 改為單選邏輯
    const matchesTags = 
      currentTag.value === '全部' || 
      post.tags.includes(currentTag.value);
    
    return matchesSearch && matchesTags;
  });
});

// 切換標籤過濾 - 改為單選模式
const toggleTagFilter = (tag) => {
  currentTag.value = tag;
};

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
.posts-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
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

.filter-section {
  margin-bottom: 2rem;
}

.search-box {
  position: relative;
  max-width: 500px;
  margin: 0 auto 1.5rem;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-color-secondary);
}

.search-input {
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 2.5rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  background-color: var(--card-bg);
  color: var(--text-color);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.tags-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  padding: 0.5rem 1rem;
}

.filter-tag {
  background: none;
  border: 1px solid var(--border-color);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  color: var(--text-color);
}

.filter-tag:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.filter-tag.active {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.post-item {
  background-color: var(--card-bg);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px var(--shadow-color);
  transition: transform 0.3s, box-shadow 0.3s;
  animation: slideIn 0.5s ease-out forwards;
}

.post-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px var(--shadow-color);
}

.post-date {
  font-size: 0.9rem;
  color: var(--text-color-secondary);
  margin-bottom: 0.5rem;
}

.post-title {
  font-size: 1.6rem;
  margin: 0.5rem 0;
}

.post-title a {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.2s;
}

.post-title a:hover {
  color: var(--primary-color-dark);
}

.post-summary {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
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

.read-more {
  display: inline-block;
  color: var(--primary-color);
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;
}

.read-more:hover {
  color: var(--primary-color-dark);
}

.no-posts {
  text-align: center;
  padding: 3rem 1rem;
  background-color: var(--card-bg);
  border-radius: 8px;
  box-shadow: 0 4px 6px var(--shadow-color);
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .tags-filter {
    justify-content: flex-start;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding: 0.5rem 0;
    gap: 0.8rem;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  .tags-filter::-webkit-scrollbar {
    display: none;
  }
  
  .filter-tag {
    flex-shrink: 0;
    white-space: nowrap;
    min-width: auto;
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
}

/* 使用全局定義的 CSS 變量，移除重複定義 */
</style>
